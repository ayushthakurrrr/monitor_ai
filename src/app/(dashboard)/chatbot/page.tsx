"use client"

import { useState, useRef, useEffect } from "react"
import { BotMessageSquare, Send, User, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import { handleChatSubmit } from "./actions"

interface Message {
  role: "user" | "assistant"
  content: string
}

export default function ChatbotPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [messages])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage: Message = { role: "user", content: input }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    const result = await handleChatSubmit(input)

    let assistantMessage: Message
    if (result.error) {
      assistantMessage = { role: "assistant", content: result.error }
    } else {
      assistantMessage = { role: "assistant", content: result.answer as string }
    }
    
    setMessages((prev) => [...prev, assistantMessage])
    setIsLoading(false)
  }

  return (
    <div className="flex h-[calc(100vh-theme(spacing.20))] flex-col">
       <div className="mb-4">
        <h1 className="font-headline text-3xl font-semibold flex items-center gap-2">
            <BotMessageSquare /> Content Q&A Chatbot
        </h1>
        <p className="text-muted-foreground mt-1">Ask questions about recent content from tracked influencers.</p>
      </div>

      <div className="flex-1 overflow-hidden rounded-lg border shadow-md flex flex-col">
        <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
          <div className="space-y-6">
            <div className="flex items-start gap-4">
                <Avatar className="h-8 w-8 border-2 border-primary">
                    <AvatarFallback><BotMessageSquare /></AvatarFallback>
                </Avatar>
                <div className="rounded-lg bg-muted p-3 max-w-[80%]">
                    <p className="font-semibold text-sm">TrendWatch AI</p>
                    <p className="text-sm">Hello! How can I help you analyze today's trends?</p>
                </div>
            </div>
            {messages.map((message, index) => (
              <div
                key={index}
                className={cn(
                  "flex items-start gap-4",
                  message.role === "user" && "justify-end"
                )}
              >
                {message.role === "assistant" && (
                   <Avatar className="h-8 w-8 border-2 border-primary">
                        <AvatarFallback><BotMessageSquare /></AvatarFallback>
                    </Avatar>
                )}
                <div
                  className={cn(
                    "rounded-lg p-3 max-w-[80%]",
                    message.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  )}
                >
                    <p className="font-semibold text-sm">
                        {message.role === 'user' ? 'You' : 'TrendWatch AI'}
                    </p>
                    <p className="text-sm">{message.content}</p>
                </div>
                 {message.role === "user" && (
                    <Avatar className="h-8 w-8">
                        <AvatarFallback><User /></AvatarFallback>
                    </Avatar>
                 )}
              </div>
            ))}
             {isLoading && (
                <div className="flex items-start gap-4">
                    <Avatar className="h-8 w-8 border-2 border-primary">
                        <AvatarFallback><BotMessageSquare /></AvatarFallback>
                    </Avatar>
                    <div className="rounded-lg bg-muted p-3 max-w-[80%] flex items-center">
                        <Loader2 className="h-5 w-5 animate-spin text-muted-foreground"/>
                    </div>
                </div>
            )}
          </div>
        </ScrollArea>
        <div className="border-t p-4 bg-background/95">
          <form onSubmit={handleSubmit} className="flex items-center gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about a specific topic, product, or influencer..."
              disabled={isLoading}
              className="flex-1"
            />
            <Button type="submit" disabled={isLoading || !input.trim()}>
              <Send className="h-4 w-4" />
              <span className="sr-only">Send</span>
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
