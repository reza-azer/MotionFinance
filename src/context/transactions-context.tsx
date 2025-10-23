
"use client";

import React, { createContext, useContext, ReactNode, useState, useCallback, useEffect } from 'react';
import useLocalStorage from '@/hooks/use-local-storage';
import type { Transaction } from '@/lib/types';
import { toast } from "@/hooks/use-toast";
import { analyzeSpending } from '@/ai/flows/analyze-spending';
import { generateBudgetFeedback } from '@/ai/flows/generate-budget-feedback';

interface Budget {
    spendingTargetPercentage: number;
}

interface TransactionsContextType {
  transactions: Transaction[];
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
  deleteTransaction: (id: string) => void;
  spendingTargetPercentage: number;
  setSpendingTargetPercentage: (percentage: number) => void;
  monthlyIncome: number;
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
  const [spendingTargetPercentage, setSpendingTargetPercentageState] = useLocalStorage<number>('spendingTargetPercentage', 80);
  
  const [budgetFeedback, setBudgetFeedback] = useState('');
  const [isFeedbackLoading, setIsFeedbackLoading] = useState(false);

  const [insights, setInsights] = useState<string[]>([]);
  const [cashflowMessage, setCashflowMessage] = useState("");
  const [isInsightsLoading, setIsInsightsLoading] = useState(false);

  const monthlyIncome = transactions
    .filter(t => t.type === 'income' && new Date(t.date).getMonth() === new Date().getMonth())
    .reduce((acc, t) => acc + t.amount, 0);

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

  const refreshBudgetFeedback = useCallback(async (currentTransactions: Transaction[], currentMonthlyIncome: number, currentSpendingTarget: number) => {
    if (currentMonthlyIncome <= 0) {
        setBudgetFeedback("Tambahkan transaksi pemasukan untuk memulai pelacakan anggaran.");
        return
    };
    
    setIsFeedbackLoading(true);
    try {
        const totalExpenses = currentTransactions
          .filter(t => t.type === 'expense' && new Date(t.date).getMonth() === new Date().getMonth())
          .reduce((acc, t) => acc + t.amount, 0);

        const budgetLimit = currentMonthlyIncome * (currentSpendingTarget / 100);
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
    refreshBudgetFeedback(transactions, monthlyIncome, spendingTargetPercentage);
  }, [transactions, monthlyIncome, spendingTargetPercentage, refreshInsights, refreshBudgetFeedback]);

  const addTransaction = (transaction: Omit<Transaction, 'id'>) => {
    const newTransaction = { ...transaction, id: new Date().toISOString() };
    const updatedTransactions = [newTransaction, ...transactions];
    setTransactions(updatedTransactions);
    toast({
      title: "Transaksi Ditambahkan",
      description: `Menambahkan ${transaction.description} sebesar ${new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(transaction.amount)}.`,
    });
  };

  const deleteTransaction = (id: string) => {
    const updatedTransactions = transactions.filter(t => t.id !== id);
    setTransactions(updatedTransactions);
    toast({
        title: "Transaksi Dihapus",
        variant: "destructive",
    });
  };

  const setSpendingTargetPercentage = (percentage: number) => {
    setSpendingTargetPercentageState(percentage);
    toast({
        title: 'Target Anggaran Disimpan!',
        description: `Target pengeluaran baru Anda adalah ${percentage}% dari pendapatan.`,
    });
  };

  return (
    <TransactionsContext.Provider value={{ 
        transactions, 
        addTransaction, 
        deleteTransaction,
        spendingTargetPercentage,
        setSpendingTargetPercentage,
        monthlyIncome,
        budgetFeedback,
        isFeedbackLoading,
        insights,
        cashflowMessage,
        isInsightsLoading
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
