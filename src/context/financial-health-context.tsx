"use client";

import React, { createContext, useContext, ReactNode, useState, useEffect, useCallback } from 'react';
import { useTransactions } from './transactions-context';
import { analyzeSpending } from '@/ai/flows/analyze-spending';
import type { AnalyzeSpendingOutput } from '@/ai/flows/analyze-spending';

interface FinancialHealthContextType {
  insights: string[];
  cashflowMessage: string;
  isLoading: boolean;
  refreshInsights: () => void;
}

const FinancialHealthContext = createContext<FinancialHealthContextType | undefined>(undefined);

export function FinancialHealthProvider({ children }: { children: ReactNode }) {
  const { transactions } = useTransactions();
  const [insights, setInsights] = useState<string[]>([]);
  const [cashflowMessage, setCashflowMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const refreshInsights = useCallback(async () => {
    setIsLoading(true);
    try {
      const totalIncome = transactions
        .filter(t => t.type === 'income')
        .reduce((acc, t) => acc + t.amount, 0);
      const totalExpenses = transactions
        .filter(t => t.type === 'expense')
        .reduce((acc, t) => acc + t.amount, 0);
        
      const recentTransactions = transactions.slice(0, 20);

      const result: AnalyzeSpendingOutput = await analyzeSpending({ 
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
      setIsLoading(false);
    }
  }, [transactions]);

  useEffect(() => {
    if(transactions.length > 0) {
      refreshInsights();
    }
  }, [transactions, refreshInsights]);

  return (
    <FinancialHealthContext.Provider value={{ insights, cashflowMessage, isLoading, refreshInsights }}>
      {children}
    </FinancialHealthContext.Provider>
  );
}

export function useFinancialHealth() {
  const context = useContext(FinancialHealthContext);
  if (context === undefined) {
    throw new Error('useFinancialHealth must be used within a FinancialHealthProvider');
  }
  return context;
}
