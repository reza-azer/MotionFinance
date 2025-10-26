
'use client';

import React from 'react';
import SummaryCards from '@/components/dashboard/summary-cards';
import ExpenseChart from '@/components/dashboard/charts/expense-chart';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useTransactions } from '@/context/transactions-context';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import FinancialHealth from '@/components/dashboard/financial-health';
import IncomeExpenseChart from '@/components/dashboard/charts/income-expense-chart';
import { ScrollArea } from '@/components/ui/scroll-area';
import BudgetTracker from '@/components/dashboard/budget/budget-tracker';
import ExpenseTrendChart from '@/components/dashboard/charts/expense-trend-chart';
import TransactionList from '@/components/transactions/transaction-list';

const DashboardPage = () => {
  const { transactions, monthlyIncome } = useTransactions();
  const expenseTransactions = transactions.filter(t => t.type === 'expense');

  return (
      <main className="container mx-auto px-4 py-8 flex-grow">
          <div className="flex flex-col gap-12">
            <section id="dashboard" className="space-y-8">
              <SummaryCards />
              {monthlyIncome > 0 ? <BudgetTracker /> : null}
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                <div className='lg:col-span-3'>
                  <Card className="bg-card/50 backdrop-blur-sm border-white/10">
                    <CardHeader>
                      <CardTitle className="font-headline">Analitik</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {transactions.length > 0 ? (
                        <Tabs defaultValue="breakdown" className='w-full'>
                            <TabsList className="grid w-full grid-cols-1 sm:grid-cols-3 h-auto sm:h-10">
                                <TabsTrigger value="breakdown">Rincian</TabsTrigger>
                                <TabsTrigger value="trends">Pemasukan vs Pengeluaran</TabsTrigger>
                                <TabsTrigger value="daily">Tren Harian</TabsTrigger>
                            </TabsList>
                            <TabsContent value="breakdown">
                                <div className="h-[350px]">
                                  {expenseTransactions.length > 0 ? <ExpenseChart /> : <div className="flex items-center justify-center h-full text-muted-foreground"><p>Tidak ada data pengeluaran.</p></div>}
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
                    <Card className="bg-card/50 backdrop-blur-sm border-white/10 h-full min-h-[563px]">
                        <CardHeader>
                            <CardTitle className="font-headline">Kesehatan Finansial</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ScrollArea className="h-[470px] px-2">
                            <FinancialHealth />
                          </ScrollArea>
                        </CardContent>
                    </Card>
                </div>
              </div>
            </section>
            <section id="transactions">
                <Card className="bg-card/50 backdrop-blur-sm border-white/10 h-full">
                    <CardHeader>
                        <CardTitle className="font-headline">Transaksi Terkini</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <TransactionList />
                    </CardContent>
                </Card>
            </section>
          </div>
        </main>
  );
};

export default DashboardPage;
