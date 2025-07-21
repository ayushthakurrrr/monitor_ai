'use server';

/**
 * @fileOverview AI-powered chatbot that answers questions about influencers and trends based on content transcripts/summaries.
 *
 * - contentQAChatbot - A function that handles the chatbot interaction.
 * - ContentQAChatbotInput - The input type for the contentQAChatbot function.
 * - ContentQAChatbotOutput - The return type for the contentQAChatbot function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ContentQAChatbotInputSchema = z.object({
  query: z.string().describe('The question about influencers or trends.'),
  context: z.string().describe('The transcript/summary of content from the database.'),
});
export type ContentQAChatbotInput = z.infer<typeof ContentQAChatbotInputSchema>;

const ContentQAChatbotOutputSchema = z.object({
  answer: z.string().describe('The answer to the question based on the provided context.'),
});
export type ContentQAChatbotOutput = z.infer<typeof ContentQAChatbotOutputSchema>;

export async function contentQAChatbot(input: ContentQAChatbotInput): Promise<ContentQAChatbotOutput> {
  return contentQAChatbotFlow(input);
}

const prompt = ai.definePrompt({
  name: 'contentQAChatbotPrompt',
  input: {schema: ContentQAChatbotInputSchema},
  output: {schema: ContentQAChatbotOutputSchema},
  prompt: `You are a chatbot that answers questions about influencers and trends based on the provided content transcript/summary.\n\nContext:\n{{{context}}}\n\nQuestion: {{{query}}}\n\nAnswer:`,
});

const contentQAChatbotFlow = ai.defineFlow(
  {
    name: 'contentQAChatbotFlow',
    inputSchema: ContentQAChatbotInputSchema,
    outputSchema: ContentQAChatbotOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
