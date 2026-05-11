import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, X, Send, Bot, User, Loader2 } from 'lucide-react';
import { cn } from '../lib/utils';
import { GoogleGenAI } from "@google/genai";

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

// Initialize Gemini
const ai = new GoogleGenAI({ 
  apiKey: process.env.GEMINI_API_KEY || "" 
});

const SYSTEM_PROMPT = `You are GarLT, an expert AI assistant for Laraib Trading — a Pakistan-based garment and sewing goods trading company established in 2007, owned by Muhammad Anwar Saeed who has 40+ years of personal industry experience.

Help users with:
1. COLOR ADVICE: color recommendations per market (Africa = bold/bright, Canada = muted/neutral), colorfastness, Pantone vs HEX
2. COTTON QUALITY BY ORIGIN: Pakistani (Sindh/Punjab) = long staple great for shirts, Egyptian = premium, American Pima = soft, Chinese = budget, Indian = medium
3. KARACHI SUPPLIERS: SITE Area, Korangi, Landhi, North Karachi. Major companies: Interloop, Artistic Milliners, Gul Ahmed, Al-Karam
4. MACHINE PARTS: Bolton Market, Jodia Bazar in Karachi. Alibaba/Guangzhou for China sourcing
5. OUTSIDE PAKISTAN: China (Guangzhou) for fabric & parts, Bangladesh for cheap RMG, Turkey for premium fabric
6. GSM GUIDE: 120-150 lightweight tees, 160-180 regular tshirts, 220-280 sweatshirts, 280-350 hoodies
7. TRADE ADVICE: import/export Pakistan, quality standards ISO/OEKO-TEX

For orders always refer to: 0345-3253471 or laraibtrading188@gmail.com
Reply in English by default, switch to Urdu/Roman Urdu if user writes in Urdu.`;

export const GarLT = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: inputValue };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: newMessages.map(m => ({
          role: m.role,
          parts: [{ text: m.content }]
        })),
        config: {
          systemInstruction: SYSTEM_PROMPT,
        },
      });

      const assistantMessage: Message = {
        role: 'assistant',
        content: response.text || "I'm sorry, I couldn't generate a response.",
      };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error: any) {
      console.error('Chat error:', error);
      setMessages(prev => [
        ...prev,
        { role: 'assistant', content: `Error: ${error.message}. Please check your Gemini API key configurations.` },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-[2000] font-sans">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="mb-4 w-[350px] sm:w-[400px] h-[500px] bg-white rounded-3xl shadow-2xl border border-line overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="bg-navy p-4 flex items-center justify-between text-white">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gold rounded-full flex items-center justify-center shadow-lg">
                  <Bot size={20} className="text-white" />
                </div>
                <div>
                  <div className="font-bold">GarLT</div>
                  <div className="text-[10px] uppercase tracking-widest text-gold font-bold">Trade Assistant</div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50">
              {messages.length === 0 && (
                <div className="text-center py-8 space-y-4">
                  <div className="w-16 h-16 bg-gold/10 text-gold rounded-full flex items-center justify-center mx-auto">
                    <MessageCircle size={32} />
                  </div>
                  <div className="space-y-1">
                    <p className="font-bold text-navy">Welcome to Laraib Trading!</p>
                    <p className="text-sm text-text-dim px-8">Ask about GSM, fabrics, sourcing or color palettes.</p>
                  </div>
                </div>
              )}
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={cn(
                    "flex w-full mb-4",
                    message.role === 'user' ? "justify-end" : "justify-start"
                  )}
                >
                  <div
                    className={cn(
                      "max-w-[80%] p-3 rounded-2xl text-sm shadow-sm",
                      message.role === 'user'
                        ? "bg-navy text-white rounded-tr-none"
                        : "bg-white border border-line text-navy rounded-tl-none"
                    )}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start mb-4">
                  <div className="bg-white border border-line p-3 rounded-2xl rounded-tl-none shadow-sm">
                    <Loader2 size={16} className="animate-spin text-gold" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-line bg-white">
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Type your question..."
                  className="w-full pl-4 pr-12 py-3 bg-slate-50 border border-line rounded-2xl focus:border-gold outline-none transition-all text-sm"
                />
                <button
                  onClick={handleSend}
                  disabled={!inputValue.trim() || isLoading}
                  className={cn(
                    "absolute right-2 p-2 rounded-xl transition-all",
                    inputValue.trim() && !isLoading ? "text-gold" : "text-slate-300"
                  )}
                >
                  <Send size={20} />
                </button>
              </div>
              <div className="mt-2 text-[8px] uppercase tracking-widest text-center text-text-dim/50">
                Laraib AI • Muhammad Anwar Saeed
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="bg-[#c9a84c] text-white p-5 rounded-full shadow-2xl flex items-center justify-center relative hover:rotate-12 transition-transform"
      >
        {isOpen ? <X size={28} /> : <MessageCircle size={28} />}
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-navy border-2 border-white rounded-full animate-pulse" />
      </motion.button>
    </div>
  );
};
