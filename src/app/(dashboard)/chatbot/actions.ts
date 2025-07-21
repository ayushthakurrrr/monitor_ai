"use server"

import { contentQAChatbot } from "@/ai/flows/content-qa-chatbot";
import { getAllTranscripts } from "@/lib/data";

export async function handleChatSubmit(query: string) {
    if (!query) {
        return { error: 'Please enter a question.' };
    }

    try {
        const context = await getAllTranscripts();
        if (!context) {
            return { answer: "I don't have any content to answer questions about yet." };
        }
        
        const result = await contentQAChatbot({ query, context });
        return { answer: result.answer };
    } catch (error) {
        console.error("Chatbot action error:", error);
        return { error: 'Sorry, I ran into an error. Please try again.' };
    }
}
