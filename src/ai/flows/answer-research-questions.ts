'use server';

/**
 * @fileOverview This flow allows users to ask Student GPT questions on a variety of topics.
 *
 * - answerResearchQuestion - A function that handles the answering of research questions.
 * - AnswerResearchQuestionInput - The input type for the answerResearchQuestion function.
 * - AnswerResearchQuestionOutput - The return type for the answerResearchQuestion function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnswerResearchQuestionInputSchema = z.object({
  question: z.string().describe('The research question to be answered.'),
});
export type AnswerResearchQuestionInput = z.infer<typeof AnswerResearchQuestionInputSchema>;

const AnswerResearchQuestionOutputSchema = z.object({
  answer: z.string().describe('The answer to the research question.'),
});
export type AnswerResearchQuestionOutput = z.infer<typeof AnswerResearchQuestionOutputSchema>;

export async function answerResearchQuestion(input: AnswerResearchQuestionInput): Promise<AnswerResearchQuestionOutput> {
  return answerResearchQuestionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'answerResearchQuestionPrompt',
  input: {schema: AnswerResearchQuestionInputSchema},
  output: {schema: AnswerResearchQuestionOutputSchema},
  prompt: `You are Student GPT, an AI assistant that is able to answer questions on a variety of topics. Answer the following question to the best of your ability.\n\nQuestion: {{{question}}}`,
});

const answerResearchQuestionFlow = ai.defineFlow(
  {
    name: 'answerResearchQuestionFlow',
    inputSchema: AnswerResearchQuestionInputSchema,
    outputSchema: AnswerResearchQuestionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
