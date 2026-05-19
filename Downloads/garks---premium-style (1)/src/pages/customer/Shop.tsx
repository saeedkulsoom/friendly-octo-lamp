import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Filter, SlidersHorizontal, 
  ShoppingBag, Star, 
  TrendingUp, Grid2X2, LayoutList, Plus, Search
} from 'lucide-react';
import { useStore } from '../../store/useStore';
import { useNavigate, useLocation } from 'react-router-dom';
import PageHeader from '../../components/PageHeader';
import GargiEmptyState from '../../components/GargiEmptyState';

export default function Shop() {
  const { inventory, cartFeedback, addToCart } = useStore();
  const navigate = useNavigate();
  const location = useLocation();
  
  const [search, setSearch] = useState(location.state?.search || '');
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [activeFilter, setActiveFilter] = useState(location.state?.filter || 'All');

  useEffect(() => {
    if (location.state?.filter) setActiveFilter(location.state.filter);
    if (location.state?.search) setSearch(location.state.search);
  }, [location.state]);

  const categories = ['All', 'Shirts', 'Pants', 'Hoodies', 'Polo Shirts', 'Leather Jackets', 'Bags', 'Shoes', 'Accessories', 'Women', 'Children'];

  const filteredItems = inventory.filter(p => 
    (activeFilter === 'All' || p.category === activeFilter) &&
    (p.name.toLowerCase().includes(search.toLowerCase()) || 
     p.category.toLowerCase().includes(search.toLowerCase()) ||
     p.description.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="flex flex-col pb-64">
      <PageHeader 
        title="Boutique" 
        subtitle="The Series Collection" 
        showBack 
        rightElement={
          <button 
            onClick={() => navigate('/customer/cart')}
            className="px-5 py-2.5 bg-brand-secondary text-brand-bg rounded-full font-mono text-[10px] font-bold uppercase tracking-[0.2em] active:scale-95 transition-all shadow-xl shadow-brand-secondary/10"
          >
            Review Collection
          </button>
        }
      />
      
      <div className="px-6 space-y-10 pt-4">
        {/* Tool Bar */}
      <div className="space-y-8">
        <div className="relative group">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-brand-muted/40 group-focus-within:text-brand-primary transition-colors" size={18} strokeWidth={1} />
          <input 
            type="text" 
            placeholder="Search by name, category, fabric..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-brand-card border border-white/5 rounded-2xl py-4 pl-14 pr-4 text-brand-text placeholder:text-brand-muted/20 focus:border-brand-primary outline-none transition-all font-mono text-xs tracking-tight"
          />
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <span className="text-[9px] font-mono text-brand-muted uppercase tracking-[0.3em] font-bold">Categories</span>
            <button onClick={() => setActiveFilter('All')} className="text-[9px] font-mono text-brand-secondary uppercase tracking-[0.2em] hover:brightness-110">Clear Filter</button>
          </div>
          <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2 px-1">
            {categories.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`px-6 py-3 rounded-2xl text-[9px] whitespace-nowrap font-mono uppercase tracking-[0.2em] transition-all border ${
                  activeFilter === f ? 'bg-brand-primary border-brand-primary text-black font-bold shadow-xl shadow-brand-primary/10' : 'bg-brand-card text-brand-muted border-white/5 hover:border-brand-primary/30'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between bg-brand-card/30 p-2.5 rounded-2xl border border-white/5">
          <span className="text-[9px] font-mono text-brand-muted px-3 uppercase tracking-widest">{filteredItems.length} curated pieces</span>
          <div className="flex gap-2 p-1 bg-brand-bg rounded-xl border border-white/5">
            <button 
              onClick={() => setView('grid')}
              className={`p-2 rounded-lg transition-colors ${view === 'grid' ? 'bg-brand-card text-brand-primary shadow-sm shadow-brand-primary/10' : 'text-brand-muted/40'}`}
            >
              <Grid2X2 size={16} strokeWidth={1.5} />
            </button>
            <button 
              onClick={() => setView('list')}
              className={`p-2 rounded-lg transition-colors ${view === 'list' ? 'bg-brand-card text-brand-primary shadow-sm shadow-brand-primary/10' : 'text-brand-muted/40'}`}
            >
              <LayoutList size={16} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </div>

      {/* Product List */}
      <div className={`grid gap-x-6 gap-y-10 ${view === 'grid' ? 'grid-cols-2' : 'grid-cols-1'}`}>
        <AnimatePresence mode="popLayout">
          {filteredItems.map((product) => {
            const isAdded = cartFeedback === product.id;
            
            return (
              <motion.div
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                key={product.id}
                onClick={() => navigate(`/customer/product/${product.id}`)}
                className={`group cursor-pointer ${view === 'list' ? 'flex gap-6 bg-brand-card p-5 rounded-[2rem] border border-white/5 shadow-xl' : ''}`}
              >
                <div className={`relative rounded-[2rem] overflow-hidden bg-brand-card shrink-0 border border-white/5 shadow-2xl ${view === 'grid' ? 'aspect-[4/5] mb-4' : 'w-24 h-24'}`}>
                  <img 
                    src={product.image} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1.5s]"
                    alt={product.name}
                  />
                  <div className="absolute top-3 right-3 bg-black/30 backdrop-blur-md px-2 py-1 rounded-full border border-white/10 flex items-center gap-1.5">
                    <Star size={8} className="text-brand-secondary fill-brand-secondary" />
                    <span className="text-[8px] font-mono text-white font-bold">{product.rating}</span>
                  </div>
                </div>
                
                <div className="flex-1 flex flex-col justify-center gap-1">
                  <p className="text-[9px] font-mono text-brand-muted uppercase tracking-[0.2em]">{product.category}</p>
                  <h4 className="text-[13px] font-medium text-brand-text truncate pr-4">{product.name}</h4>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-brand-secondary font-bold font-mono text-xs tracking-tighter">${product.price}</span>
                    <div className="flex items-center gap-2">
                      <motion.button 
                        animate={isAdded ? { scale: [1, 1.2, 1] } : {}}
                        onClick={(e) => {
                          e.stopPropagation();
                          addToCart(product, e);
                        }}
                        className={`w-10 h-10 rounded-2xl flex items-center justify-center active:scale-90 transition-all shadow-xl ${
                          isAdded 
                            ? 'bg-brand-primary text-black shadow-brand-primary/20' 
                            : 'bg-brand-card border border-white/10 text-brand-muted hover:border-brand-primary hover:text-brand-primary'
                        }`}
                      >
                        {isAdded ? <ShoppingBag size={16} /> : <Plus size={16} />}
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {filteredItems.length === 0 && (
        <GargiEmptyState 
          title="Selection Unavailable" 
          description="Our concierge couldn't locate any matching pieces in the current series. Try adjusting your refinement or view the full boutique."
          actionLabel="View All Pieces"
          onAction={() => setActiveFilter('All')}
        />
      )}
      </div>
    </div>
  );
}
