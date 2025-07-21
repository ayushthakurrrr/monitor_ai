'use server';

/**
 * @fileOverview An AI agent that summarizes content from watched influencers into key trends.
 *
 * - summarizeTrends - A function that handles the trend summarization process.
 * - SummarizeTrendsInput - The input type for the summarizeTrends function.
 * - SummarizeTrendsOutput - The return type for the summarizeTrends function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeTrendsInputSchema = z.object({
  transcripts: z
    .string()
    .describe(
      'A string containing the concatenated transcripts or summaries of recent content from watched influencers.'
    ),
});
export type SummarizeTrendsInput = z.infer<typeof SummarizeTrendsInputSchema>;

const SummarizeTrendsOutputSchema = z.object({
  trendSummary: z
    .string()
    .describe(
      'A brief report highlighting the key trends identified in the recent content from watched influencers.'
    ),
});
export type SummarizeTrendsOutput = z.infer<typeof SummarizeTrendsOutputSchema>;

export async function summarizeTrends(input: SummarizeTrendsInput): Promise<SummarizeTrendsOutput> {
  return summarizeTrendsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeTrendsPrompt',
  input: {schema: SummarizeTrendsInputSchema},
  output: {schema: SummarizeTrendsOutputSchema},
  prompt: `You are an AI agent specializing in identifying and summarizing key trends from a collection of content transcripts or summaries.\
\
  Your task is to analyze the provided transcripts and generate a concise report that highlights the main trends, topics, and themes that are emerging.\
\
  Transcripts:\
  {{transcripts}}\
\
  Trend Report:
  `,
});

const summarizeTrendsFlow = ai.defineFlow(
  {
    name: 'summarizeTrendsFlow',
    inputSchema: SummarizeTrendsInputSchema,
    outputSchema: SummarizeTrendsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
