'use client';

import React from 'react';
import SummaryCards from './summary-cards';
import ExpenseChart from './charts/expense-chart';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useTransactions } from '@/context/transactions-context';
import { ResponsiveContainer } from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import FinancialHealth from './financial-health';
import IncomeExpenseChart from './charts/income-expense-chart';
import { ScrollArea } from '../ui/scroll-area';

const Dashboard = () => {
  const { transactions } = useTransactions();
  const expenseTransactions = transactions.filter(t => t.type === 'expense');

  return (
    <section id="dashboard" className="space-y-8">
      <SummaryCards />
       <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        <div className='lg:col-span-3'>
          <Card className="bg-card/50 backdrop-blur-sm border-white/10">
            <CardHeader>
              <CardTitle className="font-headline">Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              {transactions.length > 0 ? (
                <Tabs defaultValue="breakdown">
                    <TabsList>
                        <TabsTrigger value="breakdown">Expense Breakdown</TabsTrigger>
                        <TabsTrigger value="trends">Income vs. Expense</TabsTrigger>
                    </TabsList>
                    <TabsContent value="breakdown">
                        <div className="h-[350px]">
                          {expenseTransactions.length > 0 ? <ExpenseChart /> : <div className="flex items-center justify-center h-full text-muted-foreground"><p>No expense data for pie chart.</p></div>}
                        </div>
                    </TabsContent>
                    <TabsContent value="trends">
                      <div className="h-[350px]">
                        <IncomeExpenseChart />
                      </div>
                    </TabsContent>
                </Tabs>
              ) : (
                <div className="flex items-center justify-center h-[350px] text-muted-foreground">
                  <p>No data to display.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        <div className='lg:col-span-2'>
            <Card className="bg-card/50 backdrop-blur-sm border-white/10 h-[487px]">
                <CardHeader>
                    <CardTitle className="font-headline">Financial Health</CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[400px]">
                    <FinancialHealth />
                  </ScrollArea>
                </CardContent>
            </Card>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
