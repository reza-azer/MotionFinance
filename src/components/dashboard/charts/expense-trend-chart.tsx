
"use client"

import * as React from "react"
import { Line, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"
import {
  ChartContainer,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { useTransactions } from '@/context/transactions-context'
import { eachDayOfInterval, endOfMonth, format, startOfMonth } from "date-fns"
import { id } from 'date-fns/locale';

const chartConfig = {
  expense: {
    label: "Pengeluaran",
    color: "hsl(var(--chart-3))",
  },
}

export default function ExpenseTrendChart() {
  const { transactions } = useTransactions()
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);
  };

  const dailyData = React.useMemo(() => {
    const today = new Date();
    const start = startOfMonth(today);
    const end = endOfMonth(today);
    const daysInMonth = eachDayOfInterval({ start, end });

    const expensesByDay: Record<string, number> = {};

    transactions.forEach(t => {
      const transactionDate = new Date(t.date);
      if (t.type === 'expense' && transactionDate >= start && transactionDate <= end) {
        const day = format(transactionDate, 'yyyy-MM-dd');
        expensesByDay[day] = (expensesByDay[day] || 0) + t.amount;
      }
    });

    let cumulativeExpense = 0;
    return daysInMonth.map(day => {
        const dayString = format(day, 'yyyy-MM-dd');
        cumulativeExpense += expensesByDay[dayString] || 0;
        return {
            date: format(day, 'd MMM', { locale: id }),
            expense: cumulativeExpense,
        };
    });
  }, [transactions]);

  if (dailyData.length === 0 || dailyData.every(d => d.expense === 0)) {
    return (
        <div className="flex items-center justify-center h-full text-muted-foreground">
          <p>Tidak ada data pengeluaran bulan ini untuk menampilkan tren.</p>
        </div>
    );
  }

  return (
    <ChartContainer config={chartConfig} className="w-full h-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={dailyData} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="date"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
           />
          <YAxis 
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={(value) => `Rp${Number(value) / 1000}k`}
          />
          <Tooltip 
            content={<ChartTooltipContent indicator="dot" />} 
            formatter={(value) => formatCurrency(value as number)}
          />
          <Line dataKey="expense" type="monotone" stroke={chartConfig.expense.color} strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
