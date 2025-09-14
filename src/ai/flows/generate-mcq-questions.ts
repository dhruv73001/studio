'use server';
/**
 * @fileOverview A flow for generating multiple-choice questions (MCQs) on a specific topic.
 *
 * - generateMCQQuestions - A function that generates MCQs for a given topic.
 * - GenerateMCQQuestionsInput - The input type for the generateMCQQuestions function.
 * - GenerateMCQQuestionsOutput - The return type for the generateMCQQuestions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateMCQQuestionsInputSchema = z.object({
  topic: z.string().describe('The topic for which to generate MCQs.'),
  numQuestions: z
    .number()
    .min(1)
    .max(10)
    .default(5)
    .describe('The number of MCQs to generate (between 1 and 10).'),
});
export type GenerateMCQQuestionsInput = z.infer<typeof GenerateMCQQuestionsInputSchema>;

const GenerateMCQQuestionsOutputSchema = z.object({
  questions: z.array(
    z.object({
      question: z.string().describe('The multiple choice question.'),
      options: z.array(z.string()).describe('The possible answers.'),
      answer: z.string().describe('The correct answer.'),
    })
  ).describe('Generated multiple choice questions.'),
});
export type GenerateMCQQuestionsOutput = z.infer<typeof GenerateMCQQuestionsOutputSchema>;

export async function generateMCQQuestions(input: GenerateMCQQuestionsInput): Promise<GenerateMCQQuestionsOutput> {
  return generateMCQQuestionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateMCQQuestionsPrompt',
  input: {schema: GenerateMCQQuestionsInputSchema},
  output: {schema: GenerateMCQQuestionsOutputSchema},
  prompt: `You are a helpful AI assistant that generates multiple-choice questions (MCQs) on a given topic.

  Generate {{{numQuestions}}} MCQs on the topic: {{{topic}}}.

  Each question should have 4 options, with one correct answer.

  Return the questions in JSON format.
  Ensure that the output can be parsed by Javascript's JSON.parse function.

  Example output:
  {
    "questions": [
      {
        "question": "What is the capital of France?",
        "options": ["Berlin", "Paris", "Madrid", "Rome"],
        "answer": "Paris"
      },
      {
        "question": "What is the highest mountain in the world?",
        "options": ["K2", "Kangchenjunga", "Lhotse", "Mount Everest"],
        "answer": "Mount Everest"
      }
    ]
  }`,
});

const generateMCQQuestionsFlow = ai.defineFlow(
  {
    name: 'generateMCQQuestionsFlow',
    inputSchema: GenerateMCQQuestionsInputSchema,
    outputSchema: GenerateMCQQuestionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
