'use client';

import React from 'react';
import SummaryCards from './summary-cards';
import ExpenseChart from './charts/expense-chart';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useTransactions } from '@/context/transactions-context';
import { BarChart, LineChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Line, PieChart, Pie, Cell } from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const Dashboard = () => {
  const { transactions } = useTransactions();
  const expenseTransactions = transactions.filter(t => t.type === 'expense');

  const COLORS = ['#9466FF', '#30D5C8', '#FF6B6B', '#FFC658', '#6A89CC'];

  return (
    <section id="dashboard" className="space-y-8">
      <SummaryCards />
      <Card className="bg-card/50 backdrop-blur-sm border-white/10">
        <CardHeader>
          <CardTitle className="font-headline">Expense Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          {expenseTransactions.length > 0 ? (
            <Tabs defaultValue="pie">
                <TabsList>
                    <TabsTrigger value="pie">Pie Chart</TabsTrigger>
                    <TabsTrigger value="bar">Bar Chart</TabsTrigger>
                    <TabsTrigger value="line">Line Chart</TabsTrigger>
                </TabsList>
                <TabsContent value="pie">
                    <div className="h-[350px]">
                      <ExpenseChart />
                    </div>
                </TabsContent>
                <TabsContent value="bar">
                    <ResponsiveContainer width="100%" height={350}>
                        <BarChart data={expenseTransactions}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="category" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="amount" fill="#8884d8" />
                        </BarChart>
                    </ResponsiveContainer>
                </TabsContent>
                <TabsContent value="line">
                    <ResponsiveContainer width="100%" height={350}>
                        <LineChart data={expenseTransactions}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="amount" stroke="#8884d8" />
                        </LineChart>
                    </ResponsiveContainer>
                </TabsContent>
            </Tabs>
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
