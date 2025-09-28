'use server';
/**
 * @fileOverview A flow for generating a personalized learning roadmap on a specific topic.
 *
 * - generateRoadmap - A function that generates a roadmap for a given topic.
 * - GenerateRoadmapInput - The input type for the generateRoadmap function.
 * - GenerateRoadmapOutput - The return type for the generateRoadmap function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateRoadmapInputSchema = z.object({
  topic: z.string().describe('The topic for which to generate the roadmap.'),
});
export type GenerateRoadmapInput = z.infer<typeof GenerateRoadmapInputSchema>;

const GenerateRoadmapOutputSchema = z.object({
  title: z.string().describe('The title of the generated roadmap.'),
  description: z.string().describe('A brief description of the roadmap.'),
  steps: z.array(
    z.object({
      title: z.string().describe('The title of the roadmap step.'),
      description: z.string().describe('The description of the roadmap step.'),
      status: z.enum(['completed', 'in-progress', 'not-started']).default('not-started'),
      orderIndex: z.number().describe('The sequential order of the step.'),
    })
  ).describe('The generated steps for the roadmap.'),
});
export type GenerateRoadmapOutput = z.infer<typeof GenerateRoadmapOutputSchema>;

export async function generateRoadmap(input: GenerateRoadmapInput): Promise<GenerateRoadmapOutput> {
  return generateRoadmapFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateRoadmapPrompt',
  input: {schema: GenerateRoadmapInputSchema},
  output: {schema: GenerateRoadmapOutputSchema},
  prompt: `You are an expert educational planner. A 10th-grade student wants a roadmap for the following topic: {{{topic}}}.

  Generate a clear, step-by-step learning roadmap for them. The roadmap should have a concise title, a short description, and between 5 to 7 sequential steps. Each step must have a title and a brief description.

  Return the roadmap in JSON format.
  Ensure that the orderIndex for steps is sequential starting from 1.
  The status for all steps should be 'not-started'.`,
});

const generateRoadmapFlow = ai.defineFlow(
  {
    name: 'generateRoadmapFlow',
    inputSchema: GenerateRoadmapInputSchema,
    outputSchema: GenerateRoadmapOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
