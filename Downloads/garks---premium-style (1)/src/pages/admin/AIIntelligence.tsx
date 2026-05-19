import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  FileUp, Search, Database, LineChart, 
  CheckCircle2, AlertCircle, Play, 
  ArrowRight, FileText, ImageIcon, 
  Mic, Table, CheckSquare, MessageCircle
} from 'lucide-react';
import { useStore } from '../../store/useStore';
import { Activity, BrainCircuit } from 'lucide-react';

const STEPS = [
  { label: 'Parsing Files', icon: FileText },
  { label: 'Extracting Data', icon: Table },
  { label: 'Pattern Recognition', icon: Search },
  { label: 'Cross-Referencing', icon: Database },
  { label: 'Trend Analysis', icon: LineChart },
  { label: 'Simulating Impact', icon: Activity },
  { label: 'Generating Insights', icon: BrainCircuit }
];

export default function AIIntelligence() {
  const { setGargiOpen } = useStore();
  const [status, setStatus] = useState<'idle' | 'processing' | 'ready' | 'executed'>('idle');
  const [currentStep, setCurrentStep] = useState(0);
  const [insight, setInsight] = useState<any>(null);
  const [selectedSources, setSelectedSources] = useState<string[]>(['PDF/Docs', 'Excel/CSV']);
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    if (status === 'processing') {
      const interval = setInterval(() => {
        setCurrentStep((prev) => {
          if (prev < STEPS.length - 1) return prev + 1;
          clearInterval(interval);
          setTimeout(() => setStatus('ready'), 500);
          return prev;
        });
      }, 1000); // Slower for better animation feel
      return () => clearInterval(interval);
    }
  }, [status]);

  const toggleSource = (label: string) => {
    setSelectedSources(prev => 
      prev.includes(label) ? prev.filter(s => s !== label) : [...prev, label]
    );
  };

  const handleStart = () => {
    setStatus('processing');
    setCurrentStep(0);
    setInsight({
      title: "Stock Optimization Strategy",
      description: "Based on current trends, a 15% discount on 'Summer Polo' series will clear remaining stock before the Fall collection drops. This is projected to increase cash flow by $12k.",
      before: "Stock: 450 units, Conversion: 2.1%",
      after: "Stock: 50 units, Conversion: 8.4%",
      kpis: [
        { label: 'Conversion', value: '+300%' },
        { label: 'Inventory Cost', value: '-82%' }
      ]
    });
  };

  const handleApproveClick = () => {
    setShowConfirmation(true);
  };

  const handleExecute = () => {
    setShowConfirmation(false);
    setStatus('executed');
  };

  return (
    <div className="flex flex-col px-6 pt-8 pb-12 gap-8 h-screen overflow-y-auto no-scrollbar">
      <header>
        <h1 className="text-3xl font-serif text-brand-text">Central Intelligence</h1>
        <p className="text-brand-muted text-xs font-mono uppercase tracking-widest mt-1">Autonomous Store Optimization</p>
      </header>

      {status === 'idle' && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex-1 flex flex-col items-center justify-center py-4 gap-8"
        >
          <div className="grid grid-cols-3 gap-3 w-full">
            {[
              { icon: FileText, label: 'PDF/Docs' },
              { icon: Table, label: 'Excel/CSV' },
              { icon: ImageIcon, label: 'OCR/Images' },
              { icon: Mic, label: 'Voice' },
              { icon: Database, label: 'SQL/API' },
              { icon: CheckSquare, label: 'Tasks' }
            ].map((item, i) => {
              const isSelected = selectedSources.includes(item.label);
              return (
                <button 
                  key={i} 
                  onClick={() => toggleSource(item.label)}
                  className={`p-4 rounded-2xl border transition-all flex flex-col items-center gap-2 ${
                    isSelected 
                      ? 'bg-brand-primary/10 border-brand-primary shadow-[0_0_20px_#4ade8060] ring-2 ring-brand-primary/20 scale-105 z-10' 
                      : 'bg-brand-card border-white/10 opacity-60 hover:opacity-100'
                  }`}
                >
                  <item.icon size={20} className={isSelected ? 'text-brand-primary' : 'text-brand-muted'} />
                  <span className={`text-[9px] font-mono uppercase whitespace-nowrap ${isSelected ? 'text-brand-primary font-bold' : 'text-brand-muted'}`}>
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="w-full aspect-square max-w-[200px] border-2 border-dashed border-brand-muted/20 rounded-3xl flex flex-col items-center justify-center p-6 text-center gap-4 group cursor-pointer hover:border-brand-primary/40 transition-all">
            <div className="p-3 bg-brand-primary/10 rounded-full group-hover:scale-110 transition-transform">
              <FileUp size={24} className="text-brand-primary" />
            </div>
            <div>
              <p className="text-brand-text text-xs font-medium">Upload Stream</p>
              <p className="text-brand-muted text-[8px] uppercase font-mono mt-1 tracking-tighter">PDF, XL, CSV supported</p>
            </div>
          </div>

          <button 
            onClick={handleStart}
            disabled={selectedSources.length === 0}
            className="w-full bg-brand-primary text-black font-bold py-5 rounded-2xl flex items-center justify-center gap-3 active:scale-95 transition-all shadow-xl disabled:opacity-50"
          >
            <Play size={20} />
            <span className="font-mono text-xs uppercase tracking-widest">Process Intelligence</span>
          </button>
        </motion.div>
      )}

      {status === 'processing' && (
        <div className="flex-1 flex flex-col items-center justify-center py-4">
          <div className="w-64 h-64 relative mb-12">
            {/* Pulsing Core */}
            <div className="absolute inset-0 border-2 border-brand-primary/10 rounded-full animate-ping" />
            <div className="absolute inset-0 border-2 border-brand-primary/20 rounded-full animate-[spin_10s_linear_infinite]" />
            <div className="absolute inset-4 border-2 border-brand-secondary/20 rounded-full animate-[spin_7s_linear_infinite_reverse]" />
            <div className="absolute inset-0 flex items-center justify-center">
              <BrainCircuit size={80} className="text-brand-primary animate-pulse" />
            </div>
            
            {/* 7-Step Orbital Flow */}
            {STEPS.map((step, i) => {
              const isActive = i === currentStep;
              const isPast = i < currentStep;
              const angle = (i / STEPS.length) * Math.PI * 2 - Math.PI / 2;
              const x = Math.cos(angle) * 128;
              const y = Math.sin(angle) * 128;
              return (
                <div key={i} className="absolute left-1/2 top-1/2 -ml-4 -mt-4" style={{ transform: `translate(${x}px, ${y}px)` }}>
                  <motion.div
                    animate={{ 
                      scale: isActive ? 1.4 : 1,
                      backgroundColor: isActive ? '#4ade80' : (isPast ? '#4ade8040' : '#172925'),
                      borderColor: isActive ? '#4ade80' : (isPast ? '#4ade80' : '#2a3f38')
                    }}
                    className="w-8 h-8 rounded-full border flex items-center justify-center shadow-lg"
                  >
                    <step.icon size={14} className={isActive ? 'text-black' : (isPast ? 'text-brand-primary' : 'text-brand-muted')} />
                  </motion.div>
                  {isActive && (
                    <motion.div 
                      layoutId="orb-glow"
                      className="absolute inset-0 bg-brand-primary rounded-full blur-md opacity-50"
                    />
                  )}
                </div>
              );
            })}
          </div>

          <div className="text-center space-y-3">
            <motion.h3 
              key={currentStep}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-2xl font-serif text-brand-text"
            >
              {STEPS[currentStep].label}
            </motion.h3>
            <div className="flex justify-center gap-1">
              {STEPS.map((_, i) => (
                <div 
                  key={i} 
                  className={`h-1 rounded-full transition-all duration-500 ${
                    i === currentStep ? 'w-8 bg-brand-primary' : (i < currentStep ? 'w-2 bg-brand-primary/40' : 'w-2 bg-white/5')
                  }`} 
                />
              ))}
            </div>
            <p className="text-brand-muted font-mono text-[9px] uppercase tracking-[0.3em]">Neural Link Processing...</p>
          </div>
        </div>
      )}

      {status === 'ready' && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="bg-brand-card p-6 rounded-3xl border border-brand-primary/30 relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 left-0 w-full h-1 bg-brand-primary overflow-hidden">
               <motion.div 
                 animate={{ x: ['-100%', '100%'] }}
                 transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                 className="w-1/2 h-full bg-white/20"
               />
            </div>
            <div className="flex items-center gap-3 mb-4">
              <BrainCircuit className="text-brand-primary" size={24} />
              <h3 className="text-xl font-serif">{insight.title}</h3>
            </div>
            <p className="text-brand-muted text-sm leading-relaxed mb-6 font-serif">
              {insight.description}
            </p>
            
            <div className="grid grid-cols-2 gap-4">
              {insight.kpis.map((kpi: any, i: number) => (
                <div key={i} className="bg-brand-bg p-4 rounded-2xl border border-white/5 flex flex-col gap-1">
                  <p className="text-[8px] font-mono text-brand-muted uppercase tracking-widest">{kpi.label}</p>
                  <p className="text-xl font-bold text-brand-primary font-mono">{kpi.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-brand-card p-4 rounded-2xl border border-white/5 opacity-60">
              <span className="text-[9px] font-mono text-brand-muted uppercase block mb-2 tracking-widest">Baseline</span>
              <p className="text-xs text-brand-text leading-tight italic">{insight.before}</p>
            </div>
            <div className="bg-brand-card p-4 rounded-2xl border border-brand-primary/20">
              <span className="text-[9px] font-mono text-brand-primary uppercase block mb-2 tracking-widest">Projected</span>
              <p className="text-xs text-brand-text leading-tight italic">{insight.after}</p>
            </div>
          </div>

          <div className="p-5 bg-brand-primary/5 border border-brand-primary/20 rounded-3xl flex gap-4">
            <AlertCircle className="text-brand-primary shrink-0" size={24} />
            <p className="text-[10px] text-brand-muted leading-relaxed font-serif italic">
              "Gargi requires executive authentication to deploy this strategy. This will affect 1,200 unique customer nodes."
            </p>
          </div>

          <div className="flex gap-4">
            <button 
              onClick={() => setGargiOpen(true)}
              className="flex-1 bg-brand-secondary/10 text-brand-secondary font-bold py-5 rounded-2xl flex items-center justify-center gap-2 active:scale-95 transition-all border border-brand-secondary/20"
            >
              <MessageCircle size={18} /> <span className="font-mono text-[10px] uppercase tracking-widest">Discuss</span>
            </button>
            <button 
              onClick={handleApproveClick}
              className="flex-[2] bg-brand-primary text-black font-bold py-5 rounded-2xl flex items-center justify-center gap-2 active:scale-95 transition-all shadow-xl"
            >
              <span className="font-mono text-xs uppercase tracking-widest">Apply Strategy</span> <ArrowRight size={18} />
            </button>
          </div>
        </motion.div>
      )}

      {/* Confirmation Modal Overlay */}
      <AnimatePresence>
        {showConfirmation && (
          <div className="absolute inset-0 z-[100] flex items-center justify-center px-8 bg-black/80 backdrop-blur-sm">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-brand-card p-8 rounded-[3rem] border border-brand-primary/40 text-center space-y-6 shadow-[0_0_50px_rgba(63,185,80,0.1)]"
            >
              <div className="w-16 h-16 bg-brand-primary/10 rounded-full flex items-center justify-center mx-auto">
                <CheckSquare size={32} className="text-brand-primary" />
              </div>
              <div className="space-y-2">
                <h4 className="text-2xl font-serif italic">Confirm Operation</h4>
                <p className="text-xs text-brand-muted leading-relaxed px-4 font-serif">
                  Are you absolutely sure you want to authorize Gargi to execute this optimization? This action is logged in the permanent ledger.
                </p>
              </div>
              <div className="flex flex-col gap-3">
                <button 
                  onClick={handleExecute}
                  className="w-full bg-brand-primary text-black font-bold py-4 rounded-2xl font-mono text-[10px] uppercase tracking-widest shadow-lg"
                >
                  Yes, Execute Strategy
                </button>
                <button 
                  onClick={() => setShowConfirmation(false)}
                  className="w-full bg-brand-bg text-brand-muted py-4 rounded-2xl font-mono text-[10px] uppercase tracking-widest border border-white/5"
                >
                  Return to Review
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {status === 'executed' && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex-1 flex flex-col items-center justify-center text-center p-8 gap-8"
        >
          <div className="relative">
            <div className="w-32 h-32 bg-brand-primary/20 rounded-full flex items-center justify-center">
              <CheckCircle2 size={64} className="text-brand-primary" />
            </div>
            <motion.div 
              initial={{ rotate: -15, scale: 0, opacity: 0 }}
              animate={{ rotate: -15, scale: 1, opacity: 1 }}
              transition={{ delay: 0.5, type: 'spring' }}
              className="absolute -top-4 -right-4 bg-brand-secondary text-black px-4 py-1 rounded-sm text-xs font-black uppercase tracking-tighter shadow-lg"
            >
              Applied
            </motion.div>
          </div>
          
          <div className="space-y-2 px-4">
            <h3 className="text-3xl font-serif italic italic font-light">Elegance Executed</h3>
            <p className="text-brand-muted text-sm font-serif italic leading-relaxed">"Gargi has successfully adapted the store's neural state."</p>
          </div>

          <button 
            onClick={() => setStatus('idle')}
            className="w-full bg-brand-card text-brand-primary font-bold py-5 rounded-2xl border border-brand-primary/20 font-mono text-[10px] uppercase tracking-widest"
          >
            Back to Dashboard
          </button>
        </motion.div>
      )}
    </div>
  );
}
