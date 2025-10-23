
"use client";

import React, { createContext, useContext, ReactNode, useState, useCallback } from 'react';
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
    { id: '1', date: '2024-07-20', description: 'Monthly Salary', amount: 5000, type: 'income', category: 'Salary' },
    { id: '2', date: '2024-07-21', description: 'Grocery Shopping', amount: 150.75, type: 'expense', category: 'Groceries' },
    { id: '3', date: '2024-07-21', description: 'Dinner with friends', amount: 80, type: 'expense', category: 'Restaurants' },
    { id: '4', date: '2024-07-22', description: 'Freelance Project', amount: 750, type: 'income', category: 'Freelance' },
    { id: '5', date: '2024-07-23', description: 'Netflix Subscription', amount: 15.99, type: 'expense', category: 'Entertainment' },
    { id: '6', date: '2024-07-24', description: 'Gasoline', amount: 50, type: 'expense', category: 'Transportation' },
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
      setCashflowMessage("Add some transactions to get started.");
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
      setCashflowMessage("Could not load financial insights right now.");
      setInsights([]);
    } finally {
      setIsInsightsLoading(false);
    }
  }, []);


  const refreshBudgetFeedback = useCallback(async (currentTransactions: Transaction[], currentBudget: Budget) => {
    if (currentBudget.monthlyIncome <= 0) {
        setBudgetFeedback("Set a monthly income to get budget feedback.");
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
        setBudgetFeedback("Could not load feedback right now.");
    } finally {
        setIsFeedbackLoading(false);
    }
  }, []);

  const addTransaction = (transaction: Omit<Transaction, 'id'>) => {
    const newTransaction = { ...transaction, id: new Date().toISOString() };
    const updatedTransactions = [newTransaction, ...transactions];
    setTransactions(updatedTransactions);
    refreshInsights(updatedTransactions);
    refreshBudgetFeedback(updatedTransactions, budget);
    toast({
      title: "Transaction Added",
      description: `Added ${transaction.description} for $${transaction.amount}.`,
    });
  };

  const deleteTransaction = (id: string) => {
    const updatedTransactions = transactions.filter(t => t.id !== id);
    setTransactions(updatedTransactions);
    refreshInsights(updatedTransactions);
    refreshBudgetFeedback(updatedTransactions, budget);
    toast({
        title: "Transaction Deleted",
        variant: "destructive",
    });
  };

  const handleSetBudget = (newBudget: Budget) => {
    setBudget(newBudget);
    refreshBudgetFeedback(transactions, newBudget);
    toast({
        title: 'Budget Saved!',
        description: 'Your new income and spending target have been saved.',
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
