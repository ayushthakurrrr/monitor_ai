'use server'

import { summarizeTrends } from "@/ai/flows/trend-summarization";
import { addTrend, getAllTranscripts, getInfluencers, getLatestTrend, getPosts, type Influencer, type Post, type Trend } from "@/lib/data";
import { revalidatePath } from "next/cache";

export async function generateTrendBriefAction() {
    try {
        const transcripts = await getAllTranscripts();
        if (!transcripts) {
            return { error: 'No transcripts available to generate a trend brief.' };
        }
        const result = await summarizeTrends({ transcripts });
        const newTrend = await addTrend(result.trendSummary);
        revalidatePath('/');
        return { success: true, trend: JSON.parse(JSON.stringify(newTrend)) };
    } catch (error) {
        console.error(error);
        return { error: 'Failed to generate trend brief.' };
    }
}

export async function getDashboardDataAction(): Promise<{trend: Trend | null | undefined, posts: Post[], influencers: Influencer[]}> {
    const [trendData, postsData, influencersData] = await Promise.all([
        getLatestTrend(),
        getPosts(),
        getInfluencers(),
      ]);
      return {
        trend: JSON.parse(JSON.stringify(trendData)),
        posts: JSON.parse(JSON.stringify(postsData)),
        influencers: JSON.parse(JSON.stringify(influencersData)),
      }
}