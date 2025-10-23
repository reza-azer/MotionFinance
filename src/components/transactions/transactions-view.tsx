'use client';
import React from 'react';
import TransactionForm from './transaction-form';
import TransactionList from './transaction-list';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const TransactionsView = () => {
  return (
    <section id="transactions" className="grid grid-cols-1 lg:grid-cols-5 gap-8">
      <div className="lg:col-span-2">
        <Card className="bg-card/50 backdrop-blur-sm border-white/10">
          <CardHeader>
            <CardTitle className="font-headline">Add Transaction</CardTitle>
          </CardHeader>
          <CardContent>
            <TransactionForm />
          </CardContent>
        </Card>
      </div>
      <div className="lg:col-span-3">
        <Card className="bg-card/50 backdrop-blur-sm border-white/10 h-full">
            <CardHeader>
                <CardTitle className="font-headline">Recent Transactions</CardTitle>
            </CardHeader>
            <CardContent>
                <TransactionList />
            </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default TransactionsView;
