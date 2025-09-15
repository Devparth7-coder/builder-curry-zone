import { useEffect, useRef, useState } from "react";
import { Button } from "./button";

interface Message {
  sender: "user" | "bot";
  content: string;
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    { sender: "bot", content: "Hi! Ask me about crops, diseases, or schemes." },
  ]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, open]);

  function send() {
    const text = input.trim();
    if (!text) return;
    const next = [...messages, { sender: "user", content: text }];
    setMessages(next);
    setInput("");
    setTimeout(() => {
      setMessages([
        ...next,
        {
          sender: "bot",
          content:
            "Thanks! I can help with personalized crop suggestions, quick disease triage, and nearby experts.",
        },
      ]);
    }, 800);
  }

  return (
    <div className="fixed bottom-5 right-5 z-50">
      <Button
        size="icon"
        className="h-12 w-12 rounded-full shadow-lg"
        onClick={() => setOpen((v) => !v)}
        aria-label="Open chat"
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M21 15a4 4 0 0 1-4 4H7l-4 4V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z" />
        </svg>
      </Button>
      {open && (
        <div className="mt-3 w-[340px] overflow-hidden rounded-xl border bg-background shadow-xl">
          <div className="flex items-center justify-between border-b bg-primary px-4 py-2 text-primary-foreground">
            <span className="text-sm font-medium">Farming Assistant</span>
            <button
              className="opacity-80"
              onClick={() => setOpen(false)}
              aria-label="Close"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div ref={scrollRef} className="h-64 space-y-3 overflow-y-auto p-3">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${m.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[75%] rounded-2xl px-3 py-2 text-sm ${m.sender === "user" ? "bg-secondary" : "bg-muted"}`}
                >
                  {m.content}
                </div>
              </div>
            ))}
          </div>
          <div className="flex gap-2 border-t p-3">
            <input
              className="flex-1 rounded-md border bg-background px-3 py-2 text-sm outline-none"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
            />
            <Button size="sm" onClick={send}>
              Send
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
