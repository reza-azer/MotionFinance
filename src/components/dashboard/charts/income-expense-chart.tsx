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
    label: "Pemasukan",
    color: "hsl(var(--chart-2))",
  },
  expense: {
    label: "Pengeluaran",
    color: "hsl(var(--chart-3))",
  },
}

export default function IncomeExpenseChart() {
  const { transactions } = useTransactions()
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);
  };

  const monthlyData = React.useMemo(() => {
    const data: { [key: string]: { month: string, income: number, expense: number } } = {};
    
    transactions.forEach(t => {
      const month = new Date(t.date).toLocaleString('id-ID', { month: 'short' });
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
          <p>Tidak ada data untuk ditampilkan untuk tren pemasukan vs. pengeluaran.</p>
        </div>
    );
  }

  return (
    <ChartContainer config={chartConfig} className="w-full h-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={monthlyData} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis tickFormatter={(value) => `Rp${Number(value) / 1000000}jt`} />
          <Tooltip 
            content={<ChartTooltipContent />} 
            formatter={(value) => formatCurrency(value as number)} 
          />
          <Legend />
          <Bar dataKey="income" fill={chartConfig.income.color} radius={[4, 4, 0, 0]} />
          <Bar dataKey="expense" fill={chartConfig.expense.color} radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
