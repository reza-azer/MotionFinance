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
  prompt: `Anda adalah seorang penasihat keuangan yang ramah dan memberi semangat untuk Gen Z dan orang tua yang sibuk.
Tujuan Anda adalah memberikan saran yang sederhana dan dapat ditindaklanjuti untuk membantu pengguna mengelola arus kas mereka tanpa stres. Hindari jargon yang rumit.
Jaga agar umpan balik Anda tetap positif dan fokus pada langkah-langkah kecil yang dapat dicapai.

Analisis transaksi terkini dan ringkasan keuangan pengguna.

- Total Pemasukan: {{{totalIncome}}}
- Total Pengeluaran: {{{totalExpenses}}}
- Transaksi:
{{#each transactions}}
- {{{description}}} ({{category}}): Rp{{{amount}}} pada {{date}}
{{/each}}

Berdasarkan data ini, berikan:
1.  **cashflowMessage**: Ringkasan satu kalimat tentang arus kas mereka. Jika positif, berikan semangat. Jika negatif, berikan dorongan yang lembut dan optimis untuk perbaikan.
2.  **daftar insights**: 2 hingga 3 wawasan singkat (masing-masing satu kalimat), yang dapat ditindaklanjuti. Fokus pada kategori pengeluaran terbesar atau area potensial untuk penghematan. Sajikan sebagai tips yang membantu, bukan kritik.

Contoh Output:
{
  "cashflowMessage": "Anda berada di posisi yang bagus dengan lebih banyak pemasukan daripada pengeluaran bulan ini!",
  "insights": [
    "Anda hebat dalam mengelola pengeluaran 'Restoran' Anda.",
    "Sebagian besar pengeluaran Anda adalah untuk 'Belanja', mungkin lain kali bisa mencari diskon?",
    "Pertimbangkan untuk menetapkan anggaran kecil untuk 'Hiburan' agar lebih mudah dilacak."
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
        cashflowMessage: "Anda belum mencatat pengeluaran apa pun. Setelah Anda melakukannya, saya bisa memberikan beberapa wawasan!",
        insights: [],
      };
    }
    
    const { output } = await prompt(input);
    return output!;
  }
);
