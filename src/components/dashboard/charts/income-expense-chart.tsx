"use client"

import * as React from "react"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts"
import {
  ChartContainer,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { useTransactions } from '@/context/transactions-context'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const chartConfig = {
  income: {
    label: "Income",
    color: "hsl(var(--chart-2))",
  },
  expense: {
    label: "Expenses",
    color: "hsl(var(--chart-3))",
  },
}

export default function IncomeExpenseChart() {
  const { transactions } = useTransactions()

  const monthlyData = React.useMemo(() => {
    const data: { [key: string]: { month: string, income: number, expense: number } } = {};
    
    transactions.forEach(t => {
      const month = new Date(t.date).toLocaleString('default', { month: 'short' });
      if (!data[month]) {
        data[month] = { month, income: 0, expense: 0 };
      }
      if (t.type === 'income') {
        data[month].income += t.amount;
      } else {
        data[month].expense += t.amount;
      }
    });

    return Object.values(data);
  }, [transactions]);


  if (monthlyData.length === 0) {
    return (
        <div className="flex items-center justify-center h-full text-muted-foreground">
          <p>No data to display for income vs. expense trends.</p>
        </div>
    );
  }

  return (
    <ChartContainer config={chartConfig} className="w-full h-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={monthlyData} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip content={<ChartTooltipContent />} />
          <Legend />
          <Bar dataKey="income" fill={chartConfig.income.color} radius={[4, 4, 0, 0]} />
          <Bar dataKey="expense" fill={chartConfig.expense.color} radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
