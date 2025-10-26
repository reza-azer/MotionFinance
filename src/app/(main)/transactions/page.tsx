
'use client';
import React from 'react';
import TransactionForm from '@/components/transactions/transaction-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import BudgetSetup from '@/components/dashboard/budget/budget-setup';
import TransactionList from '@/components/transactions/transaction-list';

const TransactionsPage = () => {
  return (
    <main className="container mx-auto px-4 py-8 flex-grow">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
            <div className="lg:col-span-2 space-y-8">
                <Card className="bg-card/50 backdrop-blur-sm border-white/10">
                    <CardHeader>
                        <CardTitle className="font-headline">Tambah Transaksi</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <TransactionForm />
                    </CardContent>
                </Card>
                <BudgetSetup />
            </div>
            <div className="lg:col-span-3">
                 <Card className="bg-card/50 backdrop-blur-sm border-white/10 h-full">
                    <CardHeader>
                        <CardTitle className="font-headline">Semua Transaksi</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <TransactionList />
                    </CardContent>
                </Card>
            </div>
        </div>
    </main>
  );
};

export default TransactionsPage;
