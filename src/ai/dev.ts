import { config } from 'dotenv';
config();

import '@/ai/flows/categorize-transaction.ts';
import '@/ai/flows/analyze-spending.ts';
import '@/ai/flows/generate-budget-feedback.ts';
