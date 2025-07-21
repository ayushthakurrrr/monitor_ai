"use server"

export async function handleChatSubmit(query: string) {
    if (!query) {
        return { error: 'Please enter a question.' };
    }

    try {
        const response = await fetch(`https://null-ai.vercel.app/api/${encodeURIComponent(query)}`);
        
        if (!response.ok) {
            console.error("API Error:", response.status, await response.text());
            return { error: 'Sorry, the AI service is currently unavailable.' };
        }

        const result = await response.json();
        
        return { answer: result.answer };
    } catch (error) {
        console.error("Chatbot action error:", error);
        return { error: 'Sorry, I ran into an error. Please try again.' };
    }
}
