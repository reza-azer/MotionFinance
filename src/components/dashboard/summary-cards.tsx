'use client';

import React from 'react';
import { useTransactions } from '@/context/transactions-context';
import SummaryCard from './summary-card';
import { ArrowDownLeft, ArrowUpRight, Scale } from 'lucide-react';

const SummaryCards = () => {
  const { transactions } = useTransactions();

  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((acc, t) => acc + t.amount, 0);

  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => acc + t.amount, 0);

  const balance = totalIncome - totalExpenses;

  const summaryData = [
    { title: 'Total Income', value: totalIncome, icon: ArrowUpRight, colorClass: 'text-green-400' },
    { title: 'Total Expenses', value: totalExpenses, icon: ArrowDownLeft, colorClass: 'text-red-400' },
    { title: 'Balance', value: balance, icon: Scale, colorClass: 'text-accent' },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-3">
      {summaryData.map((item, index) => (
        <SummaryCard key={item.title} {...item} index={index} />
      ))}
    </div>
  );
};

export default SummaryCards;
