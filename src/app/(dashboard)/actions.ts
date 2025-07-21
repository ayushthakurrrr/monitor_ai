'use server'

import { getInfluencers, getLatestTrend, getPosts, type Influencer, type Post, type Trend } from "@/lib/data";

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
