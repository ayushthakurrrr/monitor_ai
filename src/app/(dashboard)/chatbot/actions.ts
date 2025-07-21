"use server"

import { generateChatResponse } from "@/ai/flows/chatbot";

export async function handleChatSubmit(query: string) {
    if (!query) {
        return { error: 'Please enter a question.' };
    }

    try {
        const result = await generateChatResponse({ query });
        return { answer: result.answer };
    } catch (error) {
        console.error("Chatbot action error:", error);
        return { error: 'Sorry, I ran into an error. Please try again.' };
    }
}
