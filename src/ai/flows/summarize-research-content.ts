'use server';

/**
 * @fileOverview An AI agent to summarize research content.
 *
 * - summarizeResearchContent - A function that summarizes research content.
 * - SummarizeResearchContentInput - The input type for the summarizeResearchContent function.
 * - SummarizeResearchContentOutput - The return type for the summarizeResearchContent function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeResearchContentInputSchema = z.object({
  content: z.string().describe('The research content to be summarized.'),
});
export type SummarizeResearchContentInput = z.infer<typeof SummarizeResearchContentInputSchema>;

const SummarizeResearchContentOutputSchema = z.object({
  summary: z.string().describe('The summary of the research content.'),
});
export type SummarizeResearchContentOutput = z.infer<typeof SummarizeResearchContentOutputSchema>;

export async function summarizeResearchContent(input: SummarizeResearchContentInput): Promise<SummarizeResearchContentOutput> {
  return summarizeResearchContentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeResearchContentPrompt',
  input: {schema: SummarizeResearchContentInputSchema},
  output: {schema: SummarizeResearchContentOutputSchema},
  prompt: `You are an expert research assistant. Please summarize the following research content:

{{{content}}}`,
});

const summarizeResearchContentFlow = ai.defineFlow(
  {
    name: 'summarizeResearchContentFlow',
    inputSchema: SummarizeResearchContentInputSchema,
    outputSchema: SummarizeResearchContentOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
