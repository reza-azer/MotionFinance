'use client';

import React from 'react';
import SummaryCards from './summary-cards';
import ExpenseChart from './charts/expense-chart';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useTransactions } from '@/context/transactions-context';

const Dashboard = () => {
  const { transactions } = useTransactions();
  const expenseTransactions = transactions.filter(t => t.type === 'expense');

  return (
    <section id="dashboard" className="space-y-8">
      <SummaryCards />
      <Card className="bg-card/50 backdrop-blur-sm border-white/10">
        <CardHeader>
          <CardTitle className="font-headline">Expense Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          {expenseTransactions.length > 0 ? (
            <div className="h-[350px]">
              <ExpenseChart data={expenseTransactions} />
            </div>
          ) : (
            <div className="flex items-center justify-center h-[350px] text-muted-foreground">
              <p>No expense data to display.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </section>
  );
};

export default Dashboard;
