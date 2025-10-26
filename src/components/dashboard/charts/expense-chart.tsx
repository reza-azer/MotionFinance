"use client"

import * as React from "react"
import { Label, Pie, PieChart, Sector, Cell } from "recharts"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { useTransactions } from '@/context/transactions-context'

const chartConfig = {
  amount: {
    label: "Jumlah",
  },
} satisfies React.ComponentProps<typeof ChartContainer>["config"]


export default function ExpenseChart() {
  const { transactions } = useTransactions()
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null);

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
    
    return Object.entries(categoryTotals)
        .map(([category, amount], index) => {
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

  const onPieLeave = React. useCallback(() => {
    setActiveIndex(null);
  }, [setActiveIndex]);


  if (processedData.length === 0) return null;

  return (
      <ChartContainer
        config={chartConfig}
        className="mx-auto aspect-square h-full"
      >
        <PieChart onMouseLeave={onPieLeave}>
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
            activeIndex={activeIndex ?? -1}
            activeShape={(props) => {
                const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill, payload } = props;
                if (!payload) return null;
                const percentage = payload.percentage.toFixed(1);
                return (
                  <g>
                    <defs>
                      <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="8" result="coloredBlur" />
                        <feMerge>
                          <feMergeNode in="coloredBlur" />
                          <feMergeNode in="SourceGraphic" />
                        </feMerge>
                      </filter>
                    </defs>
                    <g style={{ transition: 'opacity 0.3s ease-in-out', opacity: 1 }}>
                        <text x={cx} y={cy - 8} textAnchor="middle" dominantBaseline="central" fill={fill} className="text-xs sm:text-sm font-bold" style={{transition: 'opacity 0.3s ease-in-out', opacity: 1}}>
                          {payload.category}
                        </text>
                         <text x={cx} y={cy + 10} textAnchor="middle" dominantBaseline="central" fill={fill} className="text-lg sm:text-2xl font-numerical font-bold" style={{transition: 'opacity 0.3s ease-in-out', opacity: 1}}>
                            {`${percentage}%`}
                        </text>
                    </g>
                    <Sector
                      cx={cx}
                      cy={cy}
                      innerRadius={innerRadius}
                      outerRadius={outerRadius! + 5}
                      startAngle={startAngle}
                      endAngle={endAngle}
                      fill={fill}
                      stroke={fill}
                      style={{ filter: 'url(#glow)', transition: 'all 0.3s ease-in-out' }}
                    />
                  </g>
                );
            }}
            inactiveShape={(props) => {
                const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } = props;
                return (
                    <Sector
                        cx={cx}
                        cy={cy}
                        innerRadius={innerRadius}
                        outerRadius={outerRadius}
                        startAngle={startAngle}
                        endAngle={endAngle}
                        fill={fill}
                        stroke={fill}
                        strokeWidth={0.5}
                        style={{ opacity: 0.5, transition: 'opacity 0.3s ease-in-out' }}
                    />
                );
            }}
            data={processedData}
            dataKey="amount"
            nameKey="category"
            innerRadius="60%"
            strokeWidth={0}
            onMouseEnter={onPieEnter}
          >
             {processedData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
             ))}
            <Label
              content={({ viewBox }) => {
                if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                  return (
                    <g style={{ transition: 'opacity 0.3s ease-in-out', opacity: activeIndex !== null ? 0 : 1 }}>
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy! - 10}
                          className="fill-muted-foreground text-xs sm:text-sm"
                        >
                          Total Pengeluaran
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy! + 10}
                          className="fill-foreground text-lg sm:text-2xl font-bold font-numerical"
                        >
                          {formatCurrency(totalAmount)}
                        </tspan>
                      </text>
                    </g>
                  )
                }
              }}
            />
          </Pie>
        </PieChart>
      </ChartContainer>
  )
}
