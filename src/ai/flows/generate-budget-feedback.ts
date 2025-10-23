
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
  prompt: `You are a fun, slightly quirky financial cheerleader for Gen Z and young parents.
Your goal is to provide a single, short, and engaging feedback message based on their budget status.
Keep it under 15 words. Use emojis! ✨🎉💸

Generate one of the following types of messages based on the status:

{{#if (eq status "on_track")}}
Generate an encouraging message for someone who is well under their budget.
Examples:
- "You're a budgeting superstar! 🌟 Keep it up!"
- "Look at you, saving money like a pro. 🤑"
- "Your wallet is thanking you right now. 🙌"
- "Killing it! Plenty of room in the budget."
- "Great job staying on track this month! 🚀"
{{/if}}

{{#if (eq status "approaching_limit")}}
Generate a gentle warning that they are approaching their spending limit (over 50% spent).
Examples:
- "Heads up! You're about halfway through your budget. 🤔"
- "Spending's picking up. Keep an eye on it! 🧐"
- "Just a friendly nudge, you're nearing your limit."
- "Time to be a little more mindful with spending. 🧘"
- "Whoa there! Let's slow down the spending train. 🚂"
{{/if}}

{{#if (eq status "at_limit")}}
Generate a message indicating they have reached or exceeded their budget. It should be firm but not shaming.
Examples:
- "You've hit your budget limit! Time for a no-spend challenge? 🛑"
- "Budget maxed out! Let's hold off on non-essentials. 🙅"
- "Okay, the spending stops here. You've reached your goal! 🏆"
- "Mission accomplished... you've spent your budget. Time to pause. ⏸️"
- "You've reached the finish line for this month's budget! 🏁"
{{/if}}

Current Status: {{{status}}}
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
