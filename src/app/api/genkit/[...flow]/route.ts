'use server';

import createNextJSHandler from '@genkit-ai/next';
import '@/ai/genkit';
import '@/ai/flows/analyze-spending';
import '@/ai/flows/categorize-transaction';
import '@/ai/flows/generate-budget-feedback';

export const POST = createNextJSHandler();