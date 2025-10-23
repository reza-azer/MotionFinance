'use client';

import React from 'react';
import SummaryCards from './summary-cards';
import ExpenseChart from './charts/expense-chart';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useTransactions } from '@/context/transactions-context';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import FinancialHealth from './financial-health';
import IncomeExpenseChart from './charts/income-expense-chart';
import { ScrollArea } from '../ui/scroll-area';
import BudgetTracker from './budget/budget-tracker';
import BudgetSetup from './budget/budget-setup';
import ExpenseTrendChart from './charts/expense-trend-chart';

const Dashboard = () => {
  const { transactions, monthlyIncome } = useTransactions();
  const expenseTransactions = transactions.filter(t => t.type === 'expense');

  return (
    <section id="dashboard" className="space-y-8">
      <SummaryCards />
      {monthlyIncome > 0 ? <BudgetTracker /> : <BudgetSetup />}
       <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        <div className='lg:col-span-3'>
          <Card className="bg-card/50 backdrop-blur-sm border-white/10">
            <CardHeader>
              <CardTitle className="font-headline">Analitik</CardTitle>
            </CardHeader>
            <CardContent>
              {transactions.length > 0 ? (
                <Tabs defaultValue="breakdown">
                    <TabsList>
                        <TabsTrigger value="breakdown">Rincian Pengeluaran</TabsTrigger>
                        <TabsTrigger value="trends">Pemasukan vs. Pengeluaran</TabsTrigger>
                        <TabsTrigger value="daily">Pengeluaran Harian</TabsTrigger>
                    </TabsList>
                    <TabsContent value="breakdown">
                        <div className="h-[350px]">
                          {expenseTransactions.length > 0 ? <ExpenseChart /> : <div className="flex items-center justify-center h-full text-muted-foreground"><p>Tidak ada data pengeluaran untuk diagram pai.</p></div>}
                        </div>
                    </TabsContent>
                    <TabsContent value="trends">
                      <div className="h-[350px]">
                        <IncomeExpenseChart />
                      </div>
                    </TabsContent>
                    <TabsContent value="daily">
                      <div className="h-[350px]">
                        <ExpenseTrendChart />
                      </div>
                    </TabsContent>
                </Tabs>
              ) : (
                <div className="flex items-center justify-center h-[350px] text-muted-foreground">
                  <p>Tidak ada data untuk ditampilkan.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        <div className='lg:col-span-2'>
            <Card className="bg-card/50 backdrop-blur-sm border-white/10 h-[563px]">
                <CardHeader>
                    <CardTitle className="font-headline">Kesehatan Finansial</CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[470px]">
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
