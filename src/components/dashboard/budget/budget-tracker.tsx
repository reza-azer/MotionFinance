
'use client';

import React from 'react';
import { useTransactions } from '@/context/transactions-context';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import BudgetSetup from './budget-setup';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

const BudgetTracker = () => {
  const { transactions, monthlyIncome, spendingTargetPercentage } = useTransactions();

  const totalExpenses = transactions
    .filter(t => t.type === 'expense' && new Date(t.date).getMonth() === new Date().getMonth())
    .reduce((acc, t) => acc + t.amount, 0);

  const budgetLimit = monthlyIncome * (spendingTargetPercentage / 100);
  const spendingPercentageOfBudget = budgetLimit > 0 ? (totalExpenses / budgetLimit) * 100 : 0;
  
  const remainingBudget = budgetLimit - totalExpenses;
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);
  };
  
  return (
    <Card className="bg-card/50 backdrop-blur-sm border-white/10">
      <CardHeader className='flex-row items-center justify-between'>
        <div>
            <CardTitle className="font-headline">Anggaran Bulanan</CardTitle>
            <CardDescription>Pengeluaran vs. target Anda.</CardDescription>
        </div>
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="ghost" size="icon">
                    <Edit className="h-4 w-4" />
                    <span className='sr-only'>Ubah Anggaran</span>
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Ubah Target Pengeluaran</DialogTitle>
                </DialogHeader>
                <BudgetSetup />
            </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="flex justify-between items-center mb-1 text-sm font-numerical">
            <span className="font-medium">{formatCurrency(totalExpenses)} terpakai</span>
            <span className="text-muted-foreground">/ {formatCurrency(budgetLimit)}</span>
          </div>
          <Progress value={spendingPercentageOfBudget} className="h-3" />
          <div className="flex justify-between items-center mt-1 text-xs text-muted-foreground">
             <span>{remainingBudget >= 0 ? `${formatCurrency(remainingBudget)} tersisa` : `${formatCurrency(Math.abs(remainingBudget))} lebih`}</span>
             <span>{spendingTargetPercentage}% dari {formatCurrency(monthlyIncome)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BudgetTracker;
