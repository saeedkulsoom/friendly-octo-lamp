import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, X, Mic, BrainCircuit, Sparkles, MicOff } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { useStore } from '../store/useStore';

function VoiceVisualizer({ isActive }: { isActive: boolean }) {
  return (
    <div className="flex items-center gap-1 h-8 px-4">
      {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
        <motion.div
          key={i}
          animate={isActive ? {
            height: [4, 16, 8, 20, 4][Math.floor(Math.random() * 5)],
          } : { height: 4 }}
          transition={{
            duration: 0.3,
            repeat: Infinity,
            repeatType: "mirror",
            delay: i * 0.05
          }}
          className="w-1 bg-brand-primary rounded-full"
        />
      ))}
    </div>
  );
}

export default function GargiAssistant() {
  const { user, mode, gargiOpen, setGargiOpen } = useStore();
  const [message, setMessage] = useState('');
  const [history, setHistory] = useState<{ role: 'user' | 'ai'; text: string }[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const toggleListening = () => {
    setIsListening(!isListening);
    if (!isListening) {
      // Simulate voice-to-text
      setTimeout(() => {
        setIsListening(false);
        setMessage("Show me some elegant evening wear.");
      }, 2500);
    }
  };

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (gargiOpen) scrollToBottom();
  }, [history, gargiOpen]);

  const handleSend = async () => {
    if (!message.trim()) return;

    const userMessage = message;
    setMessage('');
    setHistory(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsTyping(true);

    try {
      // Intelligent Local Mocking for Specific Realistic Queries
      const lowerMsg = userMessage.toLowerCase();
      let mockResponse = "";

      if (mode === 'customer') {
        if (lowerMsg.includes('office')) {
          mockResponse = "For a refined office presence, I recommend our **Silk Tapered Trousers**. They offer effortless sophistication and a silhouette that commands respect. Would you like to see coordinating blazers?";
        } else if (lowerMsg.includes('leather')) {
          mockResponse = "Our **Handcrafted Leather Collection** features sustainably sourced lambskin. Each piece is treated with natural oils to ensure a lifetime of supple wear and a unique patina.";
        } else if (lowerMsg.includes('evening')) {
          mockResponse = "The **Midnight Gala Dress** is our current highlight for evening elegance. Its structured bodice and fluid skirt create a timeless, ethereal look.";
        }
      } else if (mode === 'admin') {
        if (lowerMsg.includes('sales')) {
          mockResponse = "**Growth remains consistent.** We've observed a **14% lift** in premium category conversions. Your clientele shows strong engagement during early evening hours.";
        }
      }

      if (mockResponse) {
        // Simulated AI delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        setHistory(prev => [...prev, { role: 'ai', text: mockResponse }]);
      } else {
        const response = await fetch('/api/gargi/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            message: userMessage,
            isAdmin: mode === 'admin',
            context: {
              userName: user?.name,
              currentView: mode,
            }
          })
        });
        const data = await response.json();
        setHistory(prev => [...prev, { role: 'ai', text: data.text }]);
      }
    } catch (error) {
      setHistory(prev => [...prev, { role: 'ai', text: "I'm momentarily unavailable to assist. Please try again in a moment." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      <div className="fixed bottom-24 right-4 z-[100] pointer-events-none">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setGargiOpen(true)}
          className="w-10 h-10 bg-brand-card/40 backdrop-blur-xl border border-white/10 rounded-full flex items-center justify-center shadow-2xl relative group pointer-events-auto"
        >
          <div className="absolute inset-0 bg-brand-primary opacity-0 group-hover:opacity-10 transition-opacity rounded-full" />
          <Sparkles className="text-brand-primary/60 group-hover:text-brand-primary transition-colors" size={18} strokeWidth={1.5} />
        </motion.button>
      </div>

      <AnimatePresence>
        {gargiOpen && (
          <div className="absolute inset-0 z-[150] flex items-center justify-center p-4 pointer-events-none bg-black/40 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.95 }}
              className="w-full max-w-[400px] h-[75vh] bg-brand-card rounded-[3rem] shadow-2xl flex flex-col border border-brand-border pointer-events-auto overflow-hidden relative"
            >
              {/* Header */}
              <div className="p-7 border-b border-white/5 flex items-center justify-between bg-brand-card">
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-2xl bg-brand-primary/10 flex items-center justify-center border border-brand-primary/20">
                    <Sparkles className="text-brand-primary" size={22} />
                  </div>
                  <div>
                    <h4 className="text-brand-text font-serif italic text-lg leading-none mb-1">Fashion Concierge</h4>
                    <span className="text-[9px] text-brand-muted font-mono uppercase tracking-[0.2em]">Personalized Intelligence</span>
                  </div>
                </div>
                <button onClick={() => setGargiOpen(false)} className="p-2.5 hover:bg-white/5 rounded-full transition-colors text-brand-muted">
                  <X size={20} />
                </button>
              </div>

              {/* Chat Area */}
              <div className="flex-1 overflow-y-auto p-7 space-y-5 no-scrollbar bg-brand-bg/20">
                {history.length === 0 && (
                  <div className="flex flex-col items-center justify-center h-full text-center p-8 space-y-5">
                    <div className="w-16 h-16 rounded-full bg-brand-primary/5 flex items-center justify-center border border-brand-primary/10 animate-pulse">
                      <Sparkles className="text-brand-primary/40" size={32} />
                    </div>
                    <p className="text-brand-muted text-sm italic font-serif opacity-80">
                      "I am here to refine your selection. How may I assist your style journey today?"
                    </p>
                  </div>
                )}
                {history.map((msg, i) => (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    key={i}
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[85%] rounded-[1.5rem] px-5 py-4 text-[13px] leading-relaxed ${
                      msg.role === 'user' 
                        ? 'bg-brand-primary text-black font-semibold shadow-lg shadow-brand-primary/10' 
                        : 'bg-brand-bg/80 text-brand-text border border-white/10 backdrop-blur-md'
                    }`}>
                      <div className="markdown-body text-inherit">
                        <ReactMarkdown>{msg.text}</ReactMarkdown>
                      </div>
                    </div>
                  </motion.div>
                ))}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-brand-bg/80 rounded-full px-5 py-3 flex gap-1.5 border border-white/5">
                      <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1 }} className="w-1.5 h-1.5 bg-brand-primary rounded-full" />
                      <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-1.5 h-1.5 bg-brand-primary rounded-full" />
                      <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-1.5 h-1.5 bg-brand-primary rounded-full" />
                    </div>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>

              {/* Input Area */}
              <div className="p-5 bg-brand-card border-t border-white/5">
                <AnimatePresence>
                  {isListening && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="flex flex-col items-center justify-center py-4 gap-3"
                    >
                      <VoiceVisualizer isActive={isListening} />
                      <span className="text-[9px] font-mono text-brand-primary uppercase tracking-[0.3em] animate-pulse">Capturing Voice...</span>
                    </motion.div>
                  )}
                </AnimatePresence>
                <div className="relative flex items-center gap-3">
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                      placeholder="Converse with concierge..."
                      className="w-full bg-brand-bg border border-white/10 rounded-2xl py-4 pl-5 pr-12 text-sm text-brand-text focus:border-brand-primary focus:ring-1 focus:ring-brand-primary/20 outline-none transition-all placeholder:text-brand-muted/30"
                    />
                    <button 
                      onClick={toggleListening}
                      className={`absolute right-4 top-1/2 -translate-y-1/2 p-1.5 transition-colors ${isListening ? 'text-brand-primary' : 'text-brand-muted hover:text-brand-primary'}`}
                    >
                      {isListening ? <MicOff size={18} /> : <Mic size={18} />}
                    </button>
                  </div>
                  <button
                    onClick={handleSend}
                    disabled={!message.trim()}
                    className="p-4 bg-brand-primary text-black rounded-2xl active:scale-95 transition-all shadow-xl shadow-brand-primary/10 disabled:opacity-50 disabled:grayscale"
                  >
                    <Send size={18} />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
