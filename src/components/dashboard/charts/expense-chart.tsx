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
    label: "Amount",
  },
} satisfies React.ComponentProps<typeof ChartContainer>["config"]


export default function ExpenseChart() {
  const { transactions } = useTransactions()
  const [activeIndex, setActiveIndex] = React.useState(0);
  const processedData = React.useMemo(() => {
    const categoryTotals = transactions.reduce((acc, transaction) => {
        if (transaction.type === 'expense') {
            acc[transaction.category] = (acc[transaction.category] || 0) + transaction.amount;
        }
        return acc;
    }, {} as Record<string, number>);

    return Object.entries(categoryTotals)
        .map(([category, amount], index) => ({
            category,
            amount,
            fill: `var(--chart-${(index % 5) + 1})`,
        }))
        .sort((a, b) => b.amount - a.amount);
  }, [transactions]);


  const totalAmount = React.useMemo(() => {
    return processedData.reduce((acc, curr) => acc + curr.amount, 0)
  }, [processedData])
  
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
            content={<ChartTooltipContent hideLabel />}
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
                return (
                  <g>
                    <text x={cx} y={cy-10} dy={8} textAnchor="middle" fill={fill} className="text-xl font-numerical font-bold">
                        ${Number(payload.amount).toFixed(2)}
                    </text>
                     <text x={cx} y={cy+10} dy={8} textAnchor="middle" fill="hsl(var(--muted-foreground))" className="text-sm">
                        {payload.category}
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
                        Total Expenses
                      </tspan>
                      <tspan
                        x={viewBox.cx}
                        y={viewBox.cy! + 12}
                        className="fill-foreground text-2xl font-bold font-numerical"
                      >
                        ${totalAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
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
