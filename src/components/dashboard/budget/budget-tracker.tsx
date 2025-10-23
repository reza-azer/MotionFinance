
'use client';

import React from 'react';
import { useTransactions } from '@/context/transactions-context';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { AlertCircle, CheckCircle, LoaderCircle, Info, Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';

const BudgetTracker = () => {
  const { transactions, budget, setBudget, budgetFeedback, isFeedbackLoading } = useTransactions();

  const totalExpenses = transactions
    .filter(t => t.type === 'expense' && new Date(t.date).getMonth() === new Date().getMonth())
    .reduce((acc, t) => acc + t.amount, 0);

  const budgetLimit = budget.monthlyIncome * (budget.spendingTargetPercentage / 100);
  const spendingPercentageOfBudget = budgetLimit > 0 ? (totalExpenses / budgetLimit) * 100 : 0;
  
  const remainingBudget = budgetLimit - totalExpenses;

  const handleEditBudget = () => {
    setBudget({ monthlyIncome: 0, spendingTargetPercentage: 80 });
  };
  
  const getIcon = () => {
    if (spendingPercentageOfBudget < 50) {
      return <CheckCircle className="h-5 w-5 text-green-400" />;
    } else if (spendingPercentageOfBudget < 100) {
      return <AlertCircle className="h-5 w-5 text-yellow-400" />;
    } else {
      return <Info className="h-5 w-5 text-red-400" />;
    }
  }

  return (
    <Card className="bg-card/50 backdrop-blur-sm border-white/10">
      <CardHeader className='flex-row items-center justify-between'>
        <div>
            <CardTitle className="font-headline">Monthly Budget</CardTitle>
            <CardDescription>Your spending vs. your goal.</CardDescription>
        </div>
        <Button variant="ghost" size="icon" onClick={handleEditBudget}>
            <Edit className="h-4 w-4" />
            <span className='sr-only'>Edit Budget</span>
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="flex justify-between items-center mb-1 text-sm font-numerical">
            <span className="font-medium">${totalExpenses.toFixed(2)} spent</span>
            <span className="text-muted-foreground">/ ${budgetLimit.toFixed(2)}</span>
          </div>
          <Progress value={spendingPercentageOfBudget} className="h-3" />
          <div className="flex justify-between items-center mt-1 text-xs text-muted-foreground">
             <span>{remainingBudget >= 0 ? `$${remainingBudget.toFixed(2)} left` : `$${Math.abs(remainingBudget).toFixed(2)} over`}</span>
             <span>{budget.spendingTargetPercentage}% of ${budget.monthlyIncome}</span>
          </div>
        </div>
        <div className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg">
            {isFeedbackLoading ? 
                <LoaderCircle className="h-5 w-5 mt-0.5 text-accent animate-spin flex-shrink-0" /> :
                (getIcon())
            }
            <p className="text-sm text-muted-foreground">
                {isFeedbackLoading ? 'Analyzing your spending...' : budgetFeedback}
            </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default BudgetTracker;
