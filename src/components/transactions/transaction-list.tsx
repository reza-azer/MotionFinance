
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
import { Trash2, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '../ui/sheet';
import { Separator } from '../ui/separator';

const TransactionList = () => {
  const { transactions, deleteTransaction } = useTransactions();
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);
  };
  const [selectedTransaction, setSelectedTransaction] = React.useState<typeof transactions[0] | null>(null);

  return (
    <>
    {/* Desktop View */}
    <ScrollArea className="h-[450px] hidden sm:block">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead>Deskripsi</TableHead>
            <TableHead>Kategori</TableHead>
            <TableHead className="text-right">Jumlah</TableHead>
            <TableHead className="text-right">Aksi</TableHead>
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
                            <div className="text-sm text-muted-foreground">{format(new Date(t.date), "d MMMM yyyy", { locale: id })}</div>
                        </TableCell>
                        <TableCell>
                            <Badge variant="outline" className="border-accent text-accent">{t.category}</Badge>
                        </TableCell>
                        <TableCell className={`text-right font-numerical font-medium ${t.type === 'income' ? 'text-green-400' : 'text-red-400'}`}>
                            {t.type === 'income' ? '+' : '-'}{formatCurrency(t.amount)}
                        </TableCell>
                        <TableCell className="text-right">
                           <Button variant="ghost" size="icon" onClick={() => deleteTransaction(t.id)}>
                                <Trash2 className="h-4 w-4 text-muted-foreground hover:text-destructive" />
                                <span className="sr-only">Hapus transaksi</span>
                           </Button>
                        </TableCell>
                    </motion.tr>
                    ))
                ) : (
                    <TableRow>
                    <TableCell colSpan={4} className="h-24 text-center">
                        Belum ada transaksi.
                    </TableCell>
                    </TableRow>
                )}
            </AnimatePresence>
        </TableBody>
      </Table>
    </ScrollArea>

    {/* Mobile View */}
    <div className="sm:hidden">
        <AnimatePresence>
        {transactions.length > 0 ? (
            transactions.map((t) => (
                <motion.div
                    key={t.id}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, x: -50 }}
                    className="flex items-center justify-between p-4 border-b"
                >
                    <div className="flex flex-col">
                        <span className="font-medium">{t.description}</span>
                        <span className="text-sm text-muted-foreground">{format(new Date(t.date), "d MMM yyyy", { locale: id })}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className={`font-numerical font-medium ${t.type === 'income' ? 'text-green-400' : 'text-red-400'}`}>
                            {t.type === 'income' ? '+' : '-'}{formatCurrency(t.amount)}
                        </span>
                        <SheetTrigger asChild onClick={() => setSelectedTransaction(t)}>
                            <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </SheetTrigger>
                    </div>
                </motion.div>
            ))
        ) : (
             <div className="h-24 text-center flex items-center justify-center">
                Belum ada transaksi.
            </div>
        )}
        </AnimatePresence>
        {selectedTransaction && (
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Detail Transaksi</SheetTitle>
                </SheetHeader>
                <div className="py-4 space-y-4">
                   <div className="flex flex-col space-y-1">
                        <p className="text-sm text-muted-foreground">Deskripsi</p>
                        <p className="font-medium">{selectedTransaction.description}</p>
                   </div>
                   <Separator/>
                   <div className="flex flex-col space-y-1">
                        <p className="text-sm text-muted-foreground">Jumlah</p>
                        <p className={`font-numerical font-medium text-lg ${selectedTransaction.type === 'income' ? 'text-green-400' : 'text-red-400'}`}>
                            {selectedTransaction.type === 'income' ? '+' : '-'}{formatCurrency(selectedTransaction.amount)}
                        </p>
                   </div>
                   <Separator/>
                   <div className="flex flex-col space-y-1">
                        <p className="text-sm text-muted-foreground">Kategori</p>
                        <p><Badge variant="outline" className="border-accent text-accent">{selectedTransaction.category}</Badge></p>
                   </div>
                   <Separator/>
                   <div className="flex flex-col space-y-1">
                        <p className="text-sm text-muted-foreground">Tanggal</p>
                        <p>{format(new Date(selectedTransaction.date), "d MMMM yyyy", { locale: id })}</p>
                   </div>
                   <Separator/>
                   <Button variant="destructive" className='w-full' onClick={() => {
                       deleteTransaction(selectedTransaction.id);
                       setSelectedTransaction(null);
                   }}>
                        <Trash2 className="mr-2 h-4 w-4" /> Hapus Transaksi
                   </Button>
                </div>
            </SheetContent>
        )}
     </div>
     </>
  );
};

export default TransactionList;
