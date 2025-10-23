
"use client";

import React from 'react';
import { useTransactions } from '@/context/transactions-context';
import { Progress } from '@/components/ui/progress';
import { Lightbulb, TrendingUp, TrendingDown, LoaderCircle } from 'lucide-react';

const FinancialHealth = () => {
  const { transactions, insights, cashflowMessage, isInsightsLoading } = useTransactions();

  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((acc, t) => acc + t.amount, 0);

  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => acc + t.amount, 0);

  const netCashFlow = totalIncome - totalExpenses;
  const spendingPercentage = totalIncome > 0 ? (totalExpenses / totalIncome) * 100 : 0;

  return (
    <div className="space-y-6">
      <div>
        <h4 className="text-lg font-semibold font-headline mb-2">Cash Flow</h4>
        <div className="flex justify-between items-center mb-1 text-sm">
            <span className={netCashFlow >= 0 ? 'text-green-400' : 'text-red-400'}>Net: ${netCashFlow.toFixed(2)}</span>
            <span className="text-muted-foreground">${totalIncome.toFixed(2)} Income</span>
        </div>
        <Progress value={spendingPercentage} className="h-2" />
        <p className="text-sm text-muted-foreground mt-2 flex items-center gap-2">
            {netCashFlow >= 0 ? <TrendingUp className="h-4 w-4 text-green-400" /> : <TrendingDown className="h-4 w-4 text-red-400" />}
            {cashflowMessage}
        </p>
      </div>
      
      <div>
        <h4 className="text-lg font-semibold font-headline mb-3">Spending Insights</h4>
        {isInsightsLoading ? (
          <div className="flex items-center justify-center h-24">
            <LoaderCircle className="animate-spin text-accent" />
          </div>
        ) : (
          <ul className="space-y-3">
            {insights.map((insight, index) => (
              <li key={index} className="flex items-start gap-3">
                <Lightbulb className="h-5 w-5 mt-0.5 text-accent flex-shrink-0" />
                <span className="text-sm text-muted-foreground">{insight}</span>
              </li>
            ))}
             {insights.length === 0 && !isInsightsLoading && (
                 <p className="text-sm text-muted-foreground">No insights available yet. Add more transactions!</p>
            )}
          </ul>
        )}
      </div>
    </div>
  );
};

export default FinancialHealth;
