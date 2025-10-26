import React from 'react';
import TransactionForm from './transaction-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import BudgetSetup from '../dashboard/budget/budget-setup';

const TransactionsView = () => {
  return (
    <main className="container mx-auto px-4 py-8 flex-grow">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
            <div className="lg:col-span-2">
                <Card className="bg-card/50 backdrop-blur-sm border-white/10">
                <CardHeader>
                    <CardTitle className="font-headline">Tambah Transaksi</CardTitle>
                </CardHeader>
                <CardContent>
                    <TransactionForm />
                </CardContent>
                </Card>
            </div>
            <div className="lg:col-span-3">
                <BudgetSetup />
            </div>
        </div>
    </main>
  );
};

export default TransactionsView;
