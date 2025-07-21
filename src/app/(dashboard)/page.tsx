"use client"

import { useEffect, useState, useTransition } from "react"
import { format, parseISO } from "date-fns"
import { Newspaper, Sparkles, ExternalLink } from "lucide-react"

import type { Influencer, Post, Trend } from "@/lib/data"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { getDashboardDataAction } from "./actions"

export default function DashboardPage() {
  const [trend, setTrend] = useState<Trend | null | undefined>(undefined)
  const [posts, setPosts] = useState<Post[]>([])
  const [influencers, setInfluencers] = useState<Influencer[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const fetchDashboardData = async () => {
    setIsLoading(true);
    const { trend, posts, influencers } = await getDashboardDataAction();
    setTrend(trend);
    setPosts(posts);
    setInfluencers(influencers);
    setIsLoading(false);
  }

  useEffect(() => {
    fetchDashboardData()
  }, [])


  const getInfluencerName = (channelId: string) => {
    return influencers.find((i) => i.channelId === channelId)?.name || "Unknown Influencer"
  }
  
  const PostCard = ({ post }: { post: Post }) => {
    const cardContent = (
      <CardHeader>
        <CardTitle className="text-lg">{post.title}</CardTitle>
        <CardDescription>
          By {getInfluencerName(post.channelId)} on{" "}
          {format(parseISO(post.isoDate), "MMM d, yyyy")}
        </CardDescription>
      </CardHeader>
    );
  
    if (post.link) {
      return (
        <a href={post.link} target="_blank" rel="noopener noreferrer" className="block hover:shadow-xl transition-shadow duration-300 rounded-lg">
          <Card className="shadow-md flex flex-col justify-between h-full group">
            {cardContent}
            <CardFooter>
              <Button variant="ghost" size="sm" className="text-accent group-hover:underline">
                View Post <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        </a>
      );
    }
  
    return (
        <Card className="shadow-md flex flex-col justify-between h-full">
            {cardContent}
        </Card>
    );
  };

  return (
    <div className="grid gap-6">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline flex items-center gap-2 text-2xl">
            <Sparkles className="h-6 w-6 text-accent" />
            Latest Trend Brief
          </CardTitle>
          <CardDescription>
            {isLoading ? <Skeleton className="h-4 w-48" /> : 
             trend ? `Generated on ${format(parseISO(trend.createdAt), "MMMM d, yyyy")}`: 'No trend brief available.'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
             <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
             </div>
          ) : (
            <p className="text-muted-foreground">
              {trend?.summary ?? 'No trend brief available. New trends are generated periodically.'}
            </p>
          )}
        </CardContent>
      </Card>

      <div>
        <h2 className="font-headline text-2xl font-semibold mb-4 flex items-center gap-2">
          <Newspaper />
          Recent Posts
        </h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {isLoading ? (
            Array.from({ length: 3 }).map((_, i) => (
                <Card key={i} className="shadow-md">
                    <CardHeader>
                        <Skeleton className="h-5 w-3/4" />
                        <Skeleton className="h-4 w-1/2" />
                    </CardHeader>
                </Card>
            ))
          ) : posts.length > 0 ? (
            posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))
          ) : (
            <p>No recent posts found.</p>
          )}
        </div>
      </div>
    </div>
  )
}
