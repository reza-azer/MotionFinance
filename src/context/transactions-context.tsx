"use client";

import React, { createContext, useContext, ReactNode } from 'react';
import useLocalStorage from '@/hooks/use-local-storage';
import type { Transaction } from '@/lib/types';
import { toast } from "@/hooks/use-toast";

interface TransactionsContextType {
  transactions: Transaction[];
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
  deleteTransaction: (id: string) => void;
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

  const addTransaction = (transaction: Omit<Transaction, 'id'>) => {
    const newTransaction = { ...transaction, id: new Date().toISOString() };
    setTransactions(prev => [newTransaction, ...prev]);
    toast({
      title: "Transaction Added",
      description: `Added ${transaction.description} for $${transaction.amount}.`,
    });
  };

  const deleteTransaction = (id: string) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
    toast({
        title: "Transaction Deleted",
        variant: "destructive",
    });
  };

  return (
    <TransactionsContext.Provider value={{ transactions, addTransaction, deleteTransaction }}>
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
