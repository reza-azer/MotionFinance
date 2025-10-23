
"use client";

import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import useLocalStorage from '@/hooks/use-local-storage';
import { generateBudgetFeedback } from '@/ai/flows/generate-budget-feedback';
import { toast } from '@/hooks/use-toast';

interface Budget {
    monthlyIncome: number;
    spendingTargetPercentage: number; // e.g., 80 for 80%
}

interface BudgetContextType {
  budget: Budget;
  setBudget: (budget: Budget) => void;
  budgetFeedback: string;
  isFeedbackLoading: boolean;
  refreshBudgetFeedback: (currentSpending: number) => void;
}

const BudgetContext = createContext<BudgetContextType | undefined>(undefined);

export function BudgetProvider({ children }: { children: ReactNode }) {
  const [budget, setBudget] = useLocalStorage<Budget>('budget', { monthlyIncome: 0, spendingTargetPercentage: 80 });
  const [budgetFeedback, setBudgetFeedback] = useState('');
  const [isFeedbackLoading, setIsFeedbackLoading] = useState(false);

  const handleSetBudget = (newBudget: Budget) => {
    setBudget(newBudget);
    toast({
        title: 'Budget Saved!',
        description: 'Your new income and spending target have been saved.',
    })
  }

  const refreshBudgetFeedback = async (currentSpending: number) => {
    if (budget.monthlyIncome <= 0) return;
    
    setIsFeedbackLoading(true);
    try {
        const budgetLimit = budget.monthlyIncome * (budget.spendingTargetPercentage / 100);
        const spendingPercentageOfBudget = (currentSpending / budgetLimit) * 100;

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
  };

  return (
    <BudgetContext.Provider value={{ budget, setBudget: handleSetBudget, budgetFeedback, isFeedbackLoading, refreshBudgetFeedback }}>
      {children}
    </BudgetContext.Provider>
  );
}

export function useBudget() {
  const context = useContext(BudgetContext);
  if (context === undefined) {
    throw new Error('useBudget must be used within a BudgetProvider');
  }
  return context;
}
