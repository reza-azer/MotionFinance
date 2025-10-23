
'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useTransactions } from '@/context/transactions-context';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';

const formSchema = z.object({
  spendingTargetPercentage: z.coerce.number().min(1).max(100),
});

const BudgetSetup = () => {
  const { setSpendingTargetPercentage, spendingTargetPercentage } = useTransactions();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      spendingTargetPercentage: spendingTargetPercentage,
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setSpendingTargetPercentage(values.spendingTargetPercentage);
  };
  
  const currentSpendingTarget = form.watch('spendingTargetPercentage');

  return (
    <Card className="bg-card/50 backdrop-blur-sm border-white/10">
        <CardHeader>
            <CardTitle className='font-headline'>Atur Target Pengeluaran</CardTitle>
            <CardDescription>
                Tentukan berapa persen dari pemasukan bulanan yang ingin Anda alokasikan untuk pengeluaran.
                Pemasukan bulanan akan dihitung otomatis dari transaksi Anda.
            </CardDescription>
        </CardHeader>
        <CardContent>
            <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                control={form.control}
                name="spendingTargetPercentage"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Target Pengeluaran: {currentSpendingTarget}% dari pemasukan</FormLabel>
                    <FormControl>
                        <Slider
                            min={0}
                            max={100}
                            step={1}
                            defaultValue={[field.value]}
                            onValueChange={(value) => field.onChange(value[0])}
                        />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />

                <Button type="submit" className="w-full bg-accent text-accent-foreground hover:bg-accent/90">Simpan Target</Button>
            </form>
            </Form>
        </CardContent>
    </Card>
  );
};

export default BudgetSetup;
