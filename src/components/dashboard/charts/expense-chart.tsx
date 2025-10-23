"use client"

import * as React from "react"
import { Label, Pie, PieChart, Sector } from "recharts"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import type { Transaction } from "@/lib/types"
import { useTransactions } from '@/context/transactions-context'

const chartConfig = {
  amount: {
    label: "Jumlah",
  },
} satisfies React.ComponentProps<typeof ChartContainer>["config"]


export default function ExpenseChart() {
  const { transactions } = useTransactions()
  const [activeIndex, setActiveIndex] = React.useState(0);

  const totalAmount = React.useMemo(() => {
    return transactions
        .filter(t => t.type === 'expense')
        .reduce((acc, curr) => acc + curr.amount, 0);
  }, [transactions]);
  
  const processedData = React.useMemo(() => {
    const categoryTotals = transactions.reduce((acc, transaction) => {
        if (transaction.type === 'expense') {
            acc[transaction.category] = (acc[transaction.category] || 0) + transaction.amount;
        }
        return acc;
    }, {} as Record<string, number>);
    
    const sortedCategories = Object.entries(categoryTotals)
      .sort(([, a], [, b]) => b - a)
      .map(([category]) => category);

    return Object.entries(categoryTotals)
        .map(([category, amount]) => {
            const index = sortedCategories.indexOf(category);
            const hue = (index * 45) % 360;
            return {
                category,
                amount,
                fill: `hsl(${hue}, 80%, 60%)`,
                percentage: totalAmount > 0 ? (amount / totalAmount) * 100 : 0,
            }
        })
        .sort((a, b) => b.amount - a.amount);
  }, [transactions, totalAmount]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);
  };
  
  const onPieEnter = React.useCallback((_: any, index: number) => {
    setActiveIndex(index);
  }, [setActiveIndex]);


  if (processedData.length === 0) return null;

  return (
      <ChartContainer
        config={chartConfig}
        className="mx-auto aspect-square h-full"
      >
        <PieChart>
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel formatter={(value, name, props) => {
              return (
                <div className="flex flex-col">
                  <div>{props.payload.category}</div>
                  <div className="font-bold">{formatCurrency(value as number)}</div>
                </div>
              )
            }} />}
          />
          <Pie
            data={processedData}
            dataKey="amount"
            nameKey="category"
            innerRadius="60%"
            strokeWidth={5}
            activeIndex={activeIndex}
            activeShape={(props) => {
                const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill, payload } = props;
                if (!payload) return null;
                const percentage = payload.percentage.toFixed(1);
                return (
                  <g>
                    <defs>
                      <filter id="glow" x="-30%" y="-30%" width="160%" height="160%">
                        <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                        <feMerge>
                          <feMergeNode in="coloredBlur" />
                          <feMergeNode in="SourceGraphic" />
                        </feMerge>
                      </filter>
                    </defs>
                    <text x={cx} y={cy - 10} textAnchor="middle" dominantBaseline="central" fill={fill} className="text-sm font-bold">
                      {payload.category}
                    </text>
                     <text x={cx} y={cy + 10} textAnchor="middle" dominantBaseline="central" fill={fill} className="text-2xl font-numerical font-bold">
                        {`${percentage}%`}
                    </text>
                    <Sector
                      cx={cx}
                      cy={cy}
                      innerRadius={innerRadius}
                      outerRadius={outerRadius! + 5}
                      startAngle={startAngle}
                      endAngle={endAngle}
                      fill={fill}
                      stroke={fill}
                      style={{ filter: 'url(#glow)' }}
                    />
                  </g>
                );
            }}
            onMouseEnter={onPieEnter}
          >
            <Label
              content={({ viewBox }) => {
                if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                  return (
                    <>
                    <text
                      x={viewBox.cx}
                      y={viewBox.cy}
                      textAnchor="middle"
                      dominantBaseline="middle"
                    >
                      <tspan
                        x={viewBox.cx}
                        y={viewBox.cy! - 12}
                        className="fill-muted-foreground text-sm"
                      >
                        Total Pengeluaran
                      </tspan>
                      <tspan
                        x={viewBox.cx}
                        y={viewBox.cy! + 12}
                        className="fill-foreground text-2xl font-bold font-numerical"
                      >
                        {formatCurrency(totalAmount)}
                      </tspan>
                    </text>
                    </>
                  )
                }
              }}
            />
          </Pie>
        </PieChart>
      </ChartContainer>
  )
}
