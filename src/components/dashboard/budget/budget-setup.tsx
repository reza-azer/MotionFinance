
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
import { Input } from '@/components/ui/input';
import { useTransactions } from '@/context/transactions-context';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';

const formSchema = z.object({
  monthlyIncome: z.coerce.number().positive({ message: 'Penghasilan bulanan harus positif.' }).max(10000000000, { message: 'Pendapatan bulanan tidak boleh melebihi Rp 10.000.000.000.' }),
  spendingTargetPercentage: z.coerce.number().min(1).max(100),
});

const BudgetSetup = () => {
  const { setBudget } = useTransactions();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      monthlyIncome: 0,
      spendingTargetPercentage: 80,
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setBudget(values);
  };
  
  const spendingTarget = form.watch('spendingTargetPercentage');

  return (
    <Card className="bg-card/50 backdrop-blur-sm border-white/10">
        <CardHeader>
            <CardTitle className='font-headline'>Atur Anggaran Bulanan Anda</CardTitle>
            <CardDescription>Beri tahu kami pendapatan dan target pengeluaran Anda untuk memulai.</CardDescription>
        </CardHeader>
        <CardContent>
            <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                control={form.control}
                name="monthlyIncome"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Penghasilan Bulanan</FormLabel>
                    <FormControl>
                        <Input type="number" step="100000" placeholder="cth., 5000000" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />

                <FormField
                control={form.control}
                name="spendingTargetPercentage"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Target Pengeluaran: {spendingTarget}% dari pendapatan</FormLabel>
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

                <Button type="submit" className="w-full bg-accent text-accent-foreground hover:bg-accent/90">Simpan Anggaran</Button>
            </form>
            </Form>
        </CardContent>
    </Card>
  );
};

export default BudgetSetup;
