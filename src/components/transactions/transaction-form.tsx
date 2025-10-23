'use client';

import React, { useState } from 'react';
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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useTransactions } from '@/context/transactions-context';
import { categorizeTransaction } from '@/ai/flows/categorize-transaction';
import { Sparkles, LoaderCircle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

const formSchema = z.object({
  description: z.string().min(2, { message: 'Description must be at least 2 characters.' }),
  amount: z.coerce.number().positive({ message: 'Amount must be positive.' }),
  type: z.enum(['income', 'expense']),
  date: z.date({ required_error: 'A date is required.' }),
  category: z.string().min(1, { message: 'Category is required.' }),
});

const TransactionForm = () => {
  const { addTransaction } = useTransactions();
  const [isCategorizing, setIsCategorizing] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: '',
      amount: 0,
      type: 'expense',
      date: new Date(),
      category: '',
    },
  });

  const handleCategorize = async () => {
    const description = form.getValues('description');
    if (!description) {
      toast({
        title: 'Error',
        description: 'Please enter a description to categorize.',
        variant: 'destructive',
      });
      return;
    }
    setIsCategorizing(true);
    try {
      const result = await categorizeTransaction({ description });
      form.setValue('category', result.category, { shouldValidate: true });
      toast({
        title: 'Categorization Complete',
        description: `Category set to "${result.category}".`,
      });
    } catch (error) {
      console.error('Categorization failed', error);
      toast({
        title: 'Categorization Failed',
        description: 'Could not automatically categorize the transaction.',
        variant: 'destructive',
      });
    } finally {
      setIsCategorizing(false);
    }
  };

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    addTransaction({ ...values, date: format(values.date, 'yyyy-MM-dd')});
    form.reset();
    form.setValue('date', new Date());
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Coffee with Jane" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
            <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Amount</FormLabel>
                <FormControl>
                    <Input type="number" step="0.01" placeholder="0.00" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                    <FormItem className="flex flex-col pt-2">
                        <FormLabel className='mb-2'>Date</FormLabel>
                        <Popover>
                            <PopoverTrigger asChild>
                                <FormControl>
                                <Button
                                    variant={"outline"}
                                    className={cn(
                                    "pl-3 text-left font-normal",
                                    !field.value && "text-muted-foreground"
                                    )}
                                >
                                    {field.value ? (
                                    format(field.value, "PPP")
                                    ) : (
                                    <span>Pick a date</span>
                                    )}
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                                </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                disabled={(date) =>
                                    date > new Date() || date < new Date("1900-01-01")
                                }
                                initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </div>

        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Type</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex space-x-4"
                >
                  <FormItem className="flex items-center space-x-2 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="expense" />
                    </FormControl>
                    <FormLabel className="font-normal">Expense</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-2 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="income" />
                    </FormControl>
                    <FormLabel className="font-normal">Income</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Category</FormLabel>
                    <div className="flex gap-2">
                        <FormControl>
                            <Input placeholder="e.g., Food, Salary" {...field} />
                        </FormControl>
                        <Button type="button" size="icon" variant="outline" onClick={handleCategorize} disabled={isCategorizing}>
                            {isCategorizing ? (
                                <LoaderCircle className="animate-spin" />
                            ) : (
                                <Sparkles className="text-accent" />
                            )}
                            <span className="sr-only">Categorize with AI</span>
                        </Button>
                    </div>
                <FormMessage />
                </FormItem>
            )}
        />

        <Button type="submit" className="w-full bg-accent text-accent-foreground hover:bg-accent/90">Add Transaction</Button>
      </form>
    </Form>
  );
};

export default TransactionForm;
