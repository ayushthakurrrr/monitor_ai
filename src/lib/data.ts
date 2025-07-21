export interface Influencer {
  id: string;
  name: string;
  handle: string;
}

export interface Post {
  id: string;
  influencerId: string;
  title: string;
  publishedAt: string;
  transcript: string;
}

export interface Trend {
  id: string;
  summary: string;
  createdAt: string;
}

let influencers: Influencer[] = [
  { id: '1', name: 'Marques Brownlee', handle: '@mkbhd' },
  { id: '2', name: 'iJustine', handle: '@ijustine' },
  { id: '3', name: 'Linus Tech Tips', handle: '@linustech' },
  { id: '4', name: 'MrWhoseTheBoss', handle: '@mrwhosetheboss' },
];

let posts: Post[] = [
  {
    id: '1',
    influencerId: '1',
    title: 'The State of Foldable Phones in 2024!',
    publishedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    transcript: 'So, foldable phones. They have been around for a few years now, and the technology is finally maturing. The creases are less noticeable, the software is getting better at handling the different form factors. I think 2024 is the year they go mainstream.',
  },
  {
    id: '2',
    influencerId: '2',
    title: 'My New AI-Powered Smart Home Setup',
    publishedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    transcript: 'I have fully automated my house with AI. The lights adjust to my mood, the coffee starts brewing when my alarm goes off. It is kind of creepy but also incredibly convenient. The biggest trend in smart homes right now is proactive assistance, where the AI anticipates your needs.',
  },
  {
    id: '3',
    influencerId: '3',
    title: 'We Water-Cooled a Toaster. For Science.',
    publishedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    transcript: 'This might seem crazy, but we wanted to see if liquid cooling could make the perfect toast. Spoiler: it did not. But we learned a lot about thermal dynamics. The key takeaway is that sometimes the most ridiculous ideas lead to interesting discoveries.',
  },
  {
    id: '4',
    influencerId: '4',
    title: 'Is AI Overrated? A Deep Dive.',
    publishedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    transcript: 'Everyone is talking about AI, AI, AI. But how much of it is genuine innovation versus marketing hype? In this video, we break down the real-world applications of AI today and what is still science fiction. The biggest trend is definitely generative AI, but practical implementation is still catching up.',
  },
];

let trends: Trend[] = [
    {
        id: '1',
        summary: 'Based on recent content, there is a strong focus on the practical applications and maturity of new technologies. Influencers are discussing how AI, particularly generative AI, is moving from hype to real-world implementation in areas like smart homes. Foldable phones are also highlighted as a maturing category poised for mainstream adoption in 2024. A recurring theme is the exploration of technology limits, even through unconventional experiments.',
        createdAt: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString()
    }
]

// Simulate DB calls
export const getInfluencers = async (): Promise<Influencer[]> => {
  return Promise.resolve(influencers);
};

export const getInfluencerById = async (id: string): Promise<Influencer | undefined> => {
  return Promise.resolve(influencers.find(inf => inf.id === id));
};

export const addInfluencer = async (influencer: Omit<Influencer, 'id'>): Promise<Influencer> => {
  const newInfluencer = { ...influencer, id: (Math.random() * 10000).toString() };
  influencers = [...influencers, newInfluencer];
  return Promise.resolve(newInfluencer);
};

export const updateInfluencer = async (id: string, data: Partial<Influencer>): Promise<Influencer | undefined> => {
    let influencerToUpdate = influencers.find(inf => inf.id === id);
    if(influencerToUpdate){
        influencerToUpdate = {...influencerToUpdate, ...data};
        influencers = influencers.map(inf => inf.id === id ? influencerToUpdate : inf);
        return Promise.resolve(influencerToUpdate);
    }
    return Promise.resolve(undefined);
};


export const deleteInfluencer = async (id: string): Promise<void> => {
  influencers = influencers.filter((inf) => inf.id !== id);
  return Promise.resolve();
};

export const getPosts = async (): Promise<Post[]> => {
  return Promise.resolve(posts);
};

export const getAllTranscripts = async (): Promise<string> => {
  const all = posts.map(p => `Content from ${influencers.find(i => i.id === p.influencerId)?.name || 'Unknown'}: ${p.transcript}`).join('\n\n');
  return Promise.resolve(all);
};

export const getLatestTrend = async (): Promise<Trend | undefined> => {
    return Promise.resolve(trends.sort((a,b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())[0]);
}

export const addTrend = async (summary: string): Promise<Trend> => {
    const newTrend: Trend = {
        id: (Math.random() * 10000).toString(),
        summary,
        createdAt: new Date().toISOString()
    }
    trends.push(newTrend);
    return Promise.resolve(newTrend);
}
