
'use server';

/**
 * @fileOverview Generates feedback messages for the user's budget status.
 *
 * - generateBudgetFeedback - A function that returns a feedback message.
 * - GenerateBudgetFeedbackInput - The input type for the function.
 * - GenerateBudgetFeedbackOutput - The return type for the function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GenerateBudgetFeedbackInputSchema = z.object({
  status: z.enum(['on_track', 'approaching_limit', 'at_limit']).describe("The user's current budget status."),
});
export type GenerateBudgetFeedbackInput = z.infer<typeof GenerateBudgetFeedbackInputSchema>;

const GenerateBudgetFeedbackOutputSchema = z.object({
  feedback: z.string().describe('A single, friendly feedback message.'),
});
export type GenerateBudgetFeedbackOutput = z.infer<typeof GenerateBudgetFeedbackOutputSchema>;

export async function generateBudgetFeedback(
  input: GenerateBudgetFeedbackInput
): Promise<GenerateBudgetFeedbackOutput> {
  return generateBudgetFeedbackFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateBudgetFeedbackPrompt',
  input: { schema: GenerateBudgetFeedbackInputSchema },
  output: { schema: GenerateBudgetFeedbackOutputSchema },
  prompt: `Anda adalah seorang pemandu sorak keuangan yang menyenangkan dan sedikit unik untuk Gen Z dan orang tua muda.
Tujuan Anda adalah memberikan satu pesan umpan balik yang singkat dan menarik berdasarkan status anggaran mereka.
Buat pesan kurang dari 15 kata. Gunakan emoji! ✨🎉💸

Hasilkan salah satu dari jenis pesan berikut berdasarkan statusnya:

{{#if (eq status "on_track")}}
Hasilkan pesan yang memberi semangat untuk seseorang yang pengeluarannya masih jauh di bawah anggaran.
Contoh:
- "Anda seorang superstar anggaran! 🌟 Teruslah begitu!"
- "Lihat dirimu, menabung seperti seorang pro. 🤑"
- "Dompetmu berterima kasih padamu sekarang. 🙌"
- "Hebat! Masih banyak ruang di anggaran."
- "Kerja bagus tetap sesuai jalur bulan ini! 🚀"
{{/if}}

{{#if (eq status "approaching_limit")}}
Hasilkan peringatan lembut bahwa mereka mendekati batas pengeluaran mereka (lebih dari 50% terpakai).
Contoh:
- "Awas! Anda sudah menghabiskan setengah dari anggaran Anda. 🤔"
- "Pengeluaran mulai meningkat. Tetap waspada! 🧐"
- "Hanya pengingat ramah, Anda mendekati batas Anda."
- "Waktunya untuk sedikit lebih berhati-hati dengan pengeluaran. 🧘"
- "Wah! Mari kita perlambat laju pengeluaran. 🚂"
{{/if}}

{{#if (eq status "at_limit")}}
Hasilkan pesan yang menunjukkan bahwa mereka telah mencapai atau melebihi anggaran mereka. Pesan harus tegas tetapi tidak menghakimi.
Contoh:
- "Anda telah mencapai batas anggaran! Waktunya untuk tantangan tanpa belanja? 🛑"
- "Anggaran habis! Mari kita tunda pengeluaran yang tidak penting. 🙅"
- "Oke, pengeluaran berhenti di sini. Anda telah mencapai target Anda! 🏆"
- "Misi selesai... Anda telah menghabiskan anggaran Anda. Waktunya berhenti sejenak. ⏸️"
- "Anda telah mencapai garis finis untuk anggaran bulan ini! 🏁"
{{/if}}

Status Saat Ini: {{{status}}}
`,
});

const generateBudgetFeedbackFlow = ai.defineFlow(
  {
    name: 'generateBudgetFeedbackFlow',
    inputSchema: GenerateBudgetFeedbackInputSchema,
    outputSchema: GenerateBudgetFeedbackOutputSchema,
  },
  async input => {
    const { output } = await prompt(input);
    return output!;
  }
);
