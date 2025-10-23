
"use client";

import React, { createContext, useContext, ReactNode, useState, useCallback, useEffect } from 'react';
import useLocalStorage from '@/hooks/use-local-storage';
import type { Transaction } from '@/lib/types';
import { toast } from "@/hooks/use-toast";
import { analyzeSpending } from '@/ai/flows/analyze-spending';
import { generateBudgetFeedback } from '@/ai/flows/generate-budget-feedback';

interface Budget {
    monthlyIncome: number;
    spendingTargetPercentage: number;
}

interface TransactionsContextType {
  transactions: Transaction[];
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
  deleteTransaction: (id: string) => void;
  budget: Budget;
  setBudget: (budget: Budget) => void;
  budgetFeedback: string;
  isFeedbackLoading: boolean;
  insights: string[];
  cashflowMessage: string;
  isInsightsLoading: boolean;
}

const TransactionsContext = createContext<TransactionsContextType | undefined>(undefined);

const defaultTransactions: Transaction[] = [
    { id: '1', date: '2024-07-20', description: 'Gaji Bulanan', amount: 8000000, type: 'income', category: 'Gaji' },
    { id: '2', date: '2024-07-21', description: 'Belanja Bulanan', amount: 1250000, type: 'expense', category: 'Kebutuhan Pokok' },
    { id: '3', date: '2024-07-21', description: 'Makan malam bersama teman', amount: 350000, type: 'expense', category: 'Restoran' },
    { id: '4', date: '2024-07-22', description: 'Proyek lepas', amount: 1500000, type: 'income', category: 'Lainnya' },
    { id: '5', date: '2024-07-23', description: 'Langganan Netflix', amount: 186000, type: 'expense', category: 'Hiburan' },
    { id: '6', date: '2024-07-24', description: 'Bensin', amount: 200000, type: 'expense', category: 'Transportasi' },
];

export function TransactionsProvider({ children }: { children: ReactNode }) {
  const [transactions, setTransactions] = useLocalStorage<Transaction[]>('transactions', defaultTransactions);
  const [budget, setBudget] = useLocalStorage<Budget>('budget', { monthlyIncome: 0, spendingTargetPercentage: 80 });
  
  const [budgetFeedback, setBudgetFeedback] = useState('');
  const [isFeedbackLoading, setIsFeedbackLoading] = useState(false);

  const [insights, setInsights] = useState<string[]>([]);
  const [cashflowMessage, setCashflowMessage] = useState("");
  const [isInsightsLoading, setIsInsightsLoading] = useState(false);

  const refreshInsights = useCallback(async (currentTransactions: Transaction[]) => {
    if (currentTransactions.length === 0) {
      setCashflowMessage("Tambahkan beberapa transaksi untuk memulai.");
      setInsights([]);
      return;
    };
    setIsInsightsLoading(true);
    try {
      const totalIncome = currentTransactions
        .filter(t => t.type === 'income')
        .reduce((acc, t) => acc + t.amount, 0);
      const totalExpenses = currentTransactions
        .filter(t => t.type === 'expense')
        .reduce((acc, t) => acc + t.amount, 0);
        
      const recentTransactions = currentTransactions.slice(0, 20);

      const result = await analyzeSpending({ 
        transactions: recentTransactions,
        totalIncome,
        totalExpenses
      });

      setInsights(result.insights);
      setCashflowMessage(result.cashflowMessage);

    } catch (error) {
      console.error("Failed to analyze spending:", error);
      setCashflowMessage("Tidak dapat memuat wawasan keuangan saat ini.");
      setInsights([]);
    } finally {
      setIsInsightsLoading(false);
    }
  }, []);


  const refreshBudgetFeedback = useCallback(async (currentTransactions: Transaction[], currentBudget: Budget) => {
    if (currentBudget.monthlyIncome <= 0) {
        setBudgetFeedback("Atur pendapatan bulanan untuk mendapatkan umpan balik anggaran.");
        return
    };
    
    setIsFeedbackLoading(true);
    try {
        const totalExpenses = currentTransactions
          .filter(t => t.type === 'expense' && new Date(t.date).getMonth() === new Date().getMonth())
          .reduce((acc, t) => acc + t.amount, 0);

        const budgetLimit = currentBudget.monthlyIncome * (currentBudget.spendingTargetPercentage / 100);
        const spendingPercentageOfBudget = budgetLimit > 0 ? (totalExpenses / budgetLimit) * 100 : 0;

        let status: 'on_track' | 'approaching_limit' | 'at_limit';
        if (spendingPercentageOfBudget < 50) {
            status = 'on_track';
        } else if (spendingPercentageOfBudget < 100) {
            status = 'approaching_limit';
        } else {
            status = 'at_limit';
        }

        const result = await generateBudgetFeedback({ status });
        setBudgetFeedback(result.feedback);
    } catch (error) {
        console.error("Failed to generate budget feedback:", error);
        setBudgetFeedback("Tidak dapat memuat umpan balik saat ini.");
    } finally {
        setIsFeedbackLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshInsights(transactions);
    refreshBudgetFeedback(transactions, budget);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transactions, budget]);


  const addTransaction = (transaction: Omit<Transaction, 'id'>) => {
    const newTransaction = { ...transaction, id: new Date().toISOString() };
    setTransactions(prev => [newTransaction, ...prev]);
    toast({
      title: "Transaksi Ditambahkan",
      description: `Menambahkan ${transaction.description} sebesar Rp${transaction.amount}.`,
    });
  };

  const deleteTransaction = (id: string) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
    toast({
        title: "Transaksi Dihapus",
        variant: "destructive",
    });
  };

  const handleSetBudget = (newBudget: Budget) => {
    setBudget(newBudget);
    toast({
        title: 'Anggaran Disimpan!',
        description: 'Pendapatan dan target pengeluaran baru Anda telah disimpan.',
    });
  };

  return (
    <TransactionsContext.Provider value={{ 
        transactions, 
        addTransaction, 
        deleteTransaction,
        budget,
        setBudget: handleSetBudget,
        budgetFeedback,
        isFeedbackLoading,
        insights,
        cashflowMessage,
        isInsightsLoading: isInsightsLoading
    }}>
      {children}
    </TransactionsContext.Provider>
  );
}

export function useTransactions() {
  const context = useContext(TransactionsContext);
  if (context === undefined) {
    throw new Error('useTransactions must be used within a TransactionsProvider');
  }
  return context;
}
