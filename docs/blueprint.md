# **App Name**: TrendWatch AI

## Core Features:

- Recent Posts Feed: Dashboard display of recent posts: Show recent YouTube posts with title, author, and publication date from tracked influencers, as pulled from the database by n8n.
- Influencer Management: Influencer List Management: Enable authorized users to add, remove, and modify the list of tracked YouTube influencer handles, and store to the database. changes to influencers list should not need the ai component to make decision of what is to be changed and how
- Trend Brief Generation: Trend Summarization Tool: Summarize content from watched influencer. An AI agent processes recent transcripts/summaries and generates brief reports highlighting key trends every 48 hours.
- Content Q&A: AI-Powered Chatbot: A chatbot tool uses the transcript/summary from the database to answer questions about influencers and trends.
- Transcript aggregation: Content Retrieval: Using n8n retrieve video transcripts/summaries of watched influencer from YouTube every 48 hours and save it in the mongo db

## Style Guidelines:

- Primary color: Deep Indigo (#4B0082) to evoke trust and intelligence.
- Background color: Light Lavender (#E6E6FA), offering a soft, non-distracting backdrop.
- Accent color: Vivid Purple (#9400D3), adding highlights and focus.
- Headline font: 'Space Grotesk' sans-serif for a modern and tech-savvy feel; body font: 'Inter' sans-serif to ensure readability and clean presentation.
- Simple, line-based icons for clarity and quick recognition.
- Clean, card-based layout to clearly organize the trends
- Subtle animations and transitions for smooth navigation