
"use client"

import * as React from "react"
import { Line, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"
import {
  ChartContainer,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { useTransactions } from '@/context/transactions-context'
import { eachDayOfInterval, endOfMonth, format, startOfMonth } from "date-fns"

const chartConfig = {
  expense: {
    label: "Expenses",
    color: "hsl(var(--chart-3))",
  },
}

export default function ExpenseTrendChart() {
  const { transactions } = useTransactions()

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
            date: format(day, 'MMM d'),
            expense: cumulativeExpense,
        };
    });
  }, [transactions]);

  if (dailyData.length === 0 || dailyData.every(d => d.expense === 0)) {
    return (
        <div className="flex items-center justify-center h-full text-muted-foreground">
          <p>No expense data for this month to show a trend.</p>
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
            tickFormatter={(value) => `$${value}`}
          />
          <Tooltip content={<ChartTooltipContent indicator="dot" />} />
          <Line dataKey="expense" type="monotone" stroke={chartConfig.expense.color} strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
