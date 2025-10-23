'use client';

import React from 'react';
import { useTransactions } from '@/context/transactions-context';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

const TransactionList = () => {
  const { transactions, deleteTransaction } = useTransactions();

  return (
    <ScrollArea className="h-[450px]">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead>Description</TableHead>
            <TableHead>Category</TableHead>
            <TableHead className="text-right">Amount</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
            <AnimatePresence>
                {transactions.length > 0 ? (
                    transactions.map((t) => (
                    <motion.tr
                        key={t.id}
                        layout
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, x: -50 }}
                        className="hover:bg-muted/20 border-border"
                        as={TableRow}
                    >
                        <TableCell>
                            <div className="font-medium">{t.description}</div>
                            <div className="text-sm text-muted-foreground">{t.date}</div>
                        </TableCell>
                        <TableCell>
                            <Badge variant="outline" className="border-accent text-accent">{t.category}</Badge>
                        </TableCell>
                        <TableCell className={`text-right font-numerical font-medium ${t.type === 'income' ? 'text-green-400' : 'text-red-400'}`}>
                            {t.type === 'income' ? '+' : '-'}${t.amount.toFixed(2)}
                        </TableCell>
                        <TableCell className="text-right">
                           <Button variant="ghost" size="icon" onClick={() => deleteTransaction(t.id)}>
                                <Trash2 className="h-4 w-4 text-muted-foreground hover:text-destructive" />
                                <span className="sr-only">Delete transaction</span>
                           </Button>
                        </TableCell>
                    </motion.tr>
                    ))
                ) : (
                    <TableRow>
                    <TableCell colSpan={4} className="h-24 text-center">
                        No transactions yet.
                    </TableCell>
                    </TableRow>
                )}
            </AnimatePresence>
        </TableBody>
      </Table>
    </ScrollArea>
  );
};

export default TransactionList;
