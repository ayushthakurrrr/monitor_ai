'use server'

import { summarizeTrends } from "@/ai/flows/trend-summarization";
import { addTrend, getAllTranscripts } from "@/lib/data";
import { revalidatePath } from "next/cache";

export async function generateTrendBriefAction() {
    try {
        const transcripts = await getAllTranscripts();
        if (!transcripts) {
            return { error: 'No transcripts available to generate a trend brief.' };
        }
        const result = await summarizeTrends({ transcripts });
        await addTrend(result.trendSummary);
        revalidatePath('/');
        return { success: true, trendSummary: result.trendSummary };
    } catch (error) {
        console.error(error);
        return { error: 'Failed to generate trend brief.' };
    }
}
