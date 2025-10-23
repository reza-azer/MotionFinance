'use server';

/**
 * @fileOverview Provides AI-powered analysis of spending habits.
 *
 * - analyzeSpending - A function that analyzes a list of transactions.
 * - AnalyzeSpendingInput - The input type for the analyzeSpending function.
 * - AnalyzeSpendingOutput - The return type for the analyzeSpending function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import type { Transaction } from '@/lib/types';

const TransactionSchema = z.object({
  id: z.string(),
  date: z.string(),
  description: z.string(),
  amount: z.number(),
  type: z.enum(['income', 'expense']),
  category: z.string(),
});

const AnalyzeSpendingInputSchema = z.object({
  transactions: z.array(TransactionSchema).describe('List of recent transactions.'),
  totalIncome: z.number().describe('Total income for the period.'),
  totalExpenses: z.number().describe('Total expenses for the period.'),
});
export type AnalyzeSpendingInput = z.infer<typeof AnalyzeSpendingInputSchema>;


const AnalyzeSpendingOutputSchema = z.object({
  insights: z.array(z.string()).describe('A list of 2-3 short, actionable insights based on the spending data.'),
  cashflowMessage: z.string().describe('A brief, encouraging message about the user\'s cash flow status.'),
});
export type AnalyzeSpendingOutput = z.infer<typeof AnalyzeSpendingOutputSchema>;

export async function analyzeSpending(
  input: AnalyzeSpendingInput
): Promise<AnalyzeSpendingOutput> {
  return analyzeSpendingFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeSpendingPrompt',
  input: { schema: AnalyzeSpendingInputSchema },
  output: { schema: AnalyzeSpendingOutputSchema },
  prompt: `You are a friendly and encouraging financial advisor for Gen Z and busy parents.
Your goal is to provide simple, actionable advice to help users manage their cash flow without stress. Avoid complex jargon.
Keep your feedback positive and focus on small, achievable steps.

Analyze the user's recent transactions and financial summary.

- Total Income: {{{totalIncome}}}
- Total Expenses: {{{totalExpenses}}}
- Transactions:
{{#each transactions}}
- {{{description}}} ({{category}}): \${{{amount}}} on {{date}}
{{/each}}

Based on this data, provide:
1.  **A cashflowMessage**: A one-sentence summary of their cash flow. If they are positive, be encouraging. If negative, be gentle and optimistic about improving.
2.  **A list of insights**: 2 to 3 short (one sentence each), actionable insights. Focus on the largest spending categories or potential areas for savings. Frame them as helpful tips, not criticisms.

Example Output:
{
  "cashflowMessage": "You're in a great spot with more coming in than going out this month!",
  "insights": [
    "You're doing great at managing your 'Restaurants' spending.",
    "A large portion of your spending is on 'Shopping', maybe look for deals next time?",
    "Consider setting a small budget for 'Entertainment' to keep track of it."
  ]
}
`,
});

const analyzeSpendingFlow = ai.defineFlow(
  {
    name: 'analyzeSpendingFlow',
    inputSchema: AnalyzeSpendingInputSchema,
    outputSchema: AnalyzeSpendingOutputSchema,
  },
  async input => {
    // Don't call the AI if there are no expenses
    if (input.totalExpenses === 0) {
      return {
        cashflowMessage: "You haven't logged any expenses yet. Once you do, I can provide some insights!",
        insights: [],
      };
    }
    
    const { output } = await prompt(input);
    return output!;
  }
);
