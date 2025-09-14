import { config } from 'dotenv';
config();

import '@/ai/flows/generate-mcq-questions.ts';
import '@/ai/flows/answer-research-questions.ts';
import '@/ai/flows/summarize-research-content.ts';