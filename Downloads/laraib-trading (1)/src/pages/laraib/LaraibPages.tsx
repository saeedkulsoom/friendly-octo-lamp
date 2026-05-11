import React from 'react';
import { motion } from 'motion/react';
import { 
  Globe, ShieldCheck, Trophy, ArrowRight, MessageSquare,
  Mail, Phone, MapPin, History, Star, Users 
} from 'lucide-react';
import { Button, Card } from '../../components/Common';
import { LaraibPage } from '../../types';
import { PRODUCTS, COLOR_PALETTE, GLOBAL_REACH } from '../../constants';

export const LaraibHome = ({ setPage }: { setPage: (p: LaraibPage) => void }) => {
  return (
    <div className="animate-in fade-in duration-700">
      <section className="hero-gradient h-[85vh] flex flex-col justify-center items-center text-center px-6 relative">
        <div className="absolute inset-0 bg-black/30" />
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="relative z-10 max-w-4xl space-y-8">
          <span className="bg-gold text-white text-[10px] uppercase font-bold tracking-[0.4em] px-6 py-2 rounded-full shadow-lg">
            Est. 2007 | 40+ Years Industry Experience
          </span>
          <h1 className="text-6xl md:text-8xl font-display font-bold text-white leading-[1.1]">
            Global Trading <br/> <span className="text-gold">Redefined.</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto font-light leading-relaxed">
            Leading the bridge between Pakistan's textile excellence and global markets. Specialized in <span className="text-gold font-bold">Premium Garments</span>, <span className="text-gold font-bold">Industrial Spares</span>, and <span className="text-gold font-bold">Logistics</span> for 18+ Years.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center pt-10">
            <Button size="lg" onClick={() => setPage('contact')} className="bg-gold hover:bg-gold/90 text-white px-10 h-16 text-lg font-bold shadow-2xl">
              Start Trading Now
            </Button>
            <Button size="lg" variant="ghost" onClick={() => setPage('catalog')} className="text-white border-white/30 hover:bg-white/10 px-10 h-16 text-lg">
              Explore Catalog
            </Button>
          </div>
        </motion.div>
      </section>

      {/* Stats - Adjusted spacing and added blue borders */}
      <div className="px-8 lg:px-24 pt-32 pb-16 relative z-20">
        <div className="stats-grid grid grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { label: 'Years of Trading', val: '18+', icon: History },
            { label: 'Global Partners', val: '100+', icon: Users },
            { label: 'Sourcing Units', val: '50+', icon: MapPin },
            { label: 'Projects Delivered', val: '2.5k', icon: Star }
          ].map((stat, idx) => (
            <div key={idx} className="stat-box group bg-white p-10 rounded-[32px] shadow-sophisticated border-2 border-navy/30 hover:border-navy flex flex-col items-center hover:scale-105 transition-all duration-500">
              <stat.icon className="text-navy mb-4 group-hover:scale-110 transition-transform" size={32} />
              <div className="text-5xl font-display font-extrabold text-navy">{stat.val}</div>
              <div className="text-[10px] uppercase font-mono font-bold tracking-[0.2em] text-navy/80 mt-3 text-center">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Expertise grid - New lively section */}
      <section className="py-24 px-8 lg:px-24 space-y-16">
        <div className="text-center space-y-4">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-navy">Our Core Expertise</h2>
          <p className="text-text-dim max-w-2xl mx-auto">Providing end-to-end solutions for the global textile and manufacturing industry.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { title: 'Garment Sourcing', desc: 'Direct access to Pakistans top-tier manufacturing units for cotton and blend garments.', icon: '👕' },
            { title: 'Industrial Solutions', desc: 'Sourcing heavy-duty machinery parts, sewing threads, and critical industrial trimmings.', icon: '⚙️' },
            { title: 'Logistics Network', desc: 'Seamless supply chain management across Africa, China, UAE, and North America.', icon: '🌍' }
          ].map((item, i) => (
            <Card key={i} className="p-10 space-y-6 hover:shadow-2xl transition-all border-line group">
              <div className="text-5xl">{item.icon}</div>
              <h3 className="text-2xl font-bold text-navy">{item.title}</h3>
              <p className="text-text-dim leading-relaxed">{item.desc}</p>
              <div className="w-12 h-1 bg-gold/20 group-hover:w-full transition-all" />
            </Card>
          ))}
        </div>
      </section>

      {/* Featured Section split */}
      <section className="bg-slate-50 py-24 px-8 lg:px-24 grid lg:grid-cols-2 gap-20 items-center overflow-hidden">
        <div className="space-y-10">
          <div className="inline-flex items-center gap-3 text-gold font-bold uppercase text-xs tracking-[0.3em] bg-gold/5 px-4 py-2 rounded-full border border-gold/10">
            <ShieldCheck size={18} /> Global Quality Standard
          </div>
          <h2 className="text-4xl md:text-6xl font-display font-bold leading-tight text-navy">Pakistan's Brilliance, <br/> <span className="text-gold">Global Reach.</span></h2>
          <p className="text-text-dim text-lg leading-relaxed">
            Muhammad Anwar Saeed brings over 40 years of personal expertise to every trade deal. We don't just export products; we export trust. From local manufacturing floors to international warehouses, Laraib Trading ensures every link in your supply chain is solid.
          </p>
          <div className="grid grid-cols-2 gap-8">
            {[
              { t: 'Verified Units', d: 'Only certified factories' },
              { t: '100% QC', d: 'Personal inspection' },
              { t: 'Rapid Shipping', d: 'Air & Sea freight' },
              { t: 'Direct Pricing', d: 'No hidden middlemen' }
            ].map((p, i) => (
              <div key={i} className="space-y-1">
                <div className="font-bold text-navy flex items-center gap-2">
                  <div className="w-2 h-2 bg-gold rounded-full" /> {p.t}
                </div>
                <div className="text-xs text-text-dim pl-4">{p.d}</div>
              </div>
            ))}
          </div>
          <div className="pt-6">
            <Button variant="ghost" onClick={() => setPage('about')} className="group text-navy border-navy/20 h-14 px-8 text-sm uppercase font-bold tracking-widest">
              Read Our Full Story <ArrowRight className="ml-3 group-hover:translate-x-2 transition-transform" size={18} />
            </Button>
          </div>
        </div>
        <div className="relative group">
          <div className="absolute -inset-4 bg-gold/10 rounded-[40px] blur-2xl group-hover:bg-gold/20 transition-all" />
          <img 
            src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=1200" 
            alt="Trading Logistics" 
            className="rounded-[32px] shadow-2xl relative z-10 w-full transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute top-10 right-10 bg-navy p-8 rounded-3xl shadow-2xl z-20 text-white border border-white/10 hidden xl:block">
            <div className="text-3xl font-display font-bold">18+</div>
            <div className="text-[10px] uppercase tracking-widest opacity-60">Years Success</div>
          </div>
        </div>
      </section>

      {/* CTE Banner */}
      <section className="p-8 lg:p-24 bg-white">
        <Card className="bg-navy text-white p-16 lg:p-24 flex flex-col lg:flex-row justify-between items-center gap-16 border-none rounded-[64px] shadow-2xl overflow-hidden relative group">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gold/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 group-hover:bg-gold/20 transition-colors" />
          <div className="space-y-6 max-w-2xl text-center lg:text-left relative z-10">
            <h2 className="text-4xl lg:text-7xl font-display font-bold leading-[1.1]">Ready to Scale <br/> Your Trade?</h2>
            <p className="text-white/60 text-xl font-light">Join 100+ global partners who leverage our expertise for their industrial needs.</p>
          </div>
          <Button size="lg" onClick={() => setPage('contact')} className="bg-gold text-white hover:bg-gold/90 px-14 py-10 text-xl font-bold rounded-2xl relative z-10 shadow-2xl hover:scale-105 transition-all">
            Get A Custom Quote
          </Button>
        </Card>
      </section>
    </div>
  );
};

export const LaraibAbout = () => (
  <div className="p-8 lg:p-24 space-y-24 animate-in fade-in duration-500 max-w-5xl mx-auto">
    <div className="text-center space-y-12">
      <div className="inline-flex flex-col items-center">
        <div className="bg-gold text-white px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-[0.3em] mb-6">
          Founder & Visionary Leader
        </div>
        <h2 className="text-5xl md:text-7xl font-display font-bold text-navy">Muhammad <br/> Anwar Saeed</h2>
      </div>
      <div className="max-w-3xl mx-auto space-y-8">
        <p className="text-text-dim text-xl md:text-2xl leading-relaxed font-light">
          Founded on the principles of integrity and vast market knowledge, Muhammad Anwar Saeed has led Laraib Trading for over <span className="text-navy font-bold">18 years</span>. His deep-rooted expertise in international logistics and manufacturing (with 40+ years of industry experience) makes us a trusted name in the industry.
        </p>
        <div className="relative py-8">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-1 bg-gold/20" />
          <p className="text-navy text-2xl md:text-3xl font-display font-medium italic leading-tight pt-8">
            "My vision has always been to build a bridge between Pakistan's textile brilliance and the global market."
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-6 pt-8 justify-center font-body">
           <div className="bg-white p-8 rounded-[24px] border border-line shadow-sophisticated flex-1">
              <History className="text-gold mx-auto mb-4" size={40} />
              <div className="text-2xl font-bold text-navy">Founded 2007</div>
           </div>
           <div className="bg-white p-8 rounded-[24px] border border-line shadow-sophisticated flex-1">
              <Users className="text-gold mx-auto mb-4" size={40} />
              <div className="text-2xl font-bold text-navy">100+ Clients</div>
           </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8 pt-12">
        <Card className="p-8 space-y-4 border-line shadow-sm hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-gold/10 text-gold rounded-full flex items-center justify-center font-bold">01</div>
          <h3 className="text-xl font-bold text-navy">Integrity</h3>
          <p className="text-sm text-text-dim">Direct and honest communication in every trade deal we facilitate.</p>
        </Card>
        <Card className="p-8 space-y-4 border-line shadow-sm hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-navy/10 text-navy rounded-full flex items-center justify-center font-bold">02</div>
          <h3 className="text-xl font-bold text-navy">Precision</h3>
          <p className="text-sm text-text-dim">Meticulous detail in QC and product sourcing for international brands.</p>
        </Card>
        <Card className="p-8 space-y-4 border-line shadow-sm hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-gold/10 text-gold rounded-full flex items-center justify-center font-bold">03</div>
          <h3 className="text-xl font-bold text-navy">Dependability</h3>
          <p className="text-sm text-text-dim">18+ years of consistent delivery timelines across four continents.</p>
        </Card>
      </div>
    </div>
  </div>
);

export const LaraibServices = () => (
  <div className="p-8 lg:p-24 space-y-16 animate-in fade-in duration-500 font-body">
    <div className="text-center max-w-3xl mx-auto">
       <h2 className="text-4xl font-display font-bold">Global Logistics & Supply Chain</h2>
       <p className="text-text-dim mt-4">Reliable logistics from Pakistan to global destinations and vice versa.</p>
    </div>
    <div className="grid md:grid-cols-4 gap-8">
      {GLOBAL_REACH.map(reach => (
        <Card key={reach.country} className="p-8 space-y-4 hover:border-gold hover:shadow-xl transition-all">
          <Globe className="text-navy" size={24} />
          <h3 className="text-xl font-bold text-navy">{reach.country}</h3>
          <p className="text-sm text-text-dim">{reach.description}</p>
        </Card>
      ))}
    </div>

    <div className="bg-slate-50 p-12 lg:p-20 rounded-[40px] space-y-12">
       <div className="text-center space-y-4">
          <h3 className="text-3xl font-display font-bold text-navy">Our Logistics Workflow</h3>
          <p className="text-text-dim max-w-xl mx-auto">Standardized procedures for seamless international trade.</p>
       </div>
       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { step: '01', title: 'Sourcing', desc: 'Direct procurement from verified manufacturing units in Pakistan.' },
            { step: '02', title: 'QC Audit', desc: 'Personal inspection by Muhammad Anwar Saeed at the factory.' },
            { step: '03', title: 'Logistics', desc: 'Secure packaging and container loading for sea or air freight.' },
            { step: '04', title: 'Delivery', desc: 'Last-mile coordination in Africa, China, Canada, or UAE.' }
          ].map(item => (
            <div key={item.step} className="space-y-4">
               <div className="text-4xl font-display font-black text-gold/20">{item.step}</div>
               <h4 className="text-lg font-bold text-navy">{item.title}</h4>
               <p className="text-sm text-text-dim leading-relaxed">{item.desc}</p>
            </div>
          ))}
       </div>
    </div>
  </div>
);

export const LaraibCatalog = () => (
  <div className="p-8 lg:p-24 space-y-16 animate-in fade-in duration-500 font-body">
    <div className="flex flex-col md:flex-row justify-between items-end gap-6 border-b border-line pb-8">
       <div className="space-y-2">
          <h2 className="text-4xl font-display font-bold">Product Catalog</h2>
          <p className="text-text-dim">Professional grade garments and industrial sewing goods.</p>
       </div>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
      {PRODUCTS.map(product => (
        <Card key={product.id} className="p-0 overflow-hidden border-line hover:border-navy hover:shadow-2xl transition-all duration-500 group flex flex-col h-full translate-y-0 hover:-translate-y-3 rounded-[32px]">
          <div className="h-64 relative overflow-hidden bg-slate-100">
             {product.image ? (
               <img 
                 src={product.image} 
                 alt={product.name} 
                 className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
               />
             ) : (
               <div className="w-full h-full flex items-center justify-center text-7xl opacity-20">
                 {product.icon}
               </div>
             )}
             <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                <div className="text-white text-xs font-bold uppercase tracking-widest translate-y-4 group-hover:translate-y-0 transition-transform">
                   Premium Quality Guaranteed
                </div>
             </div>
             {product.label && (
               <div className="absolute top-4 left-4 bg-navy text-white text-[9px] font-bold px-3 py-1.5 rounded-full uppercase tracking-widest shadow-lg z-20">
                 {product.label}
               </div>
             )}
          </div>
          <div className="p-8 flex flex-col flex-1">
            <div className="text-[10px] uppercase font-bold text-navy/40 tracking-[0.2em] mb-2">{product.category}</div>
            <h4 className="text-2xl font-bold text-navy mb-3">{product.name}</h4>
            <p className="text-base text-text-dim leading-relaxed mb-6 flex-1">
              {product.description}
            </p>
            <div className="pt-6 border-t border-navy/10 mt-auto flex justify-between items-center">
               <div className="text-[10px] font-bold uppercase tracking-widest text-gold italic">Ready for Sourcing</div>
               <div className="w-8 h-8 rounded-full bg-navy/5 flex items-center justify-center text-navy group-hover:bg-navy group-hover:text-white transition-colors">
                  <ArrowRight size={14} />
               </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  </div>
);

export const LaraibQC = ({ setPage }: { setPage: (p: LaraibPage) => void }) => (
  <div className="animate-in fade-in duration-500 font-body">
    <section className="bg-navy text-white pt-12 pb-16 px-8 lg:px-24 text-center space-y-6">
       <div className="bg-gold/20 text-gold inline-block px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest border border-gold/30">
          Professional Inspection
       </div>
       <h1 className="text-4xl md:text-6xl font-display font-bold">Quality Control & <br/> Inspection Services</h1>
       <p className="text-white/90 text-lg max-w-2xl mx-auto italic">
          Ensuring every order meets international standards before it leaves the factory.
       </p>
    </section>

    <div className="p-8 lg:p-24 space-y-24 max-w-7xl mx-auto">
      {/* Section 1 */}
      <div className="grid md:grid-cols-2 gap-16 items-center">
         <div className="space-y-8">
            <div className="inline-flex items-center gap-2 text-gold font-bold uppercase text-xs tracking-widest">
               <ShieldCheck size={16} /> Pre-Shipment Specialist
            </div>
            <h2 className="text-4xl font-display font-bold">What We Do</h2>
            <p className="text-text-dim leading-relaxed">
               Muhammad Anwar Saeed personally conducts quality control inspections with 40+ years of garment industry experience. We leave no stone unturned in ensuring product integrity.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
               {[
                 'Pre-shipment inspection', 'In-line quality checks', 'Final quality inspection', 
                 'Measurement & fitting', 'Fabric quality & GSM', 'Stitching & workmanship',
                 'Color matching (Samples)', 'Label & Packaging Check'
               ].map(item => (
                 <div key={item} className="flex items-center gap-2 text-sm font-medium text-navy">
                    <div className="w-2 h-2 bg-gold rounded-full" /> {item}
                 </div>
               ))}
            </div>
         </div>
         <div className="bg-slate-50 p-12 rounded-[32px] border border-line">
            <h3 className="text-2xl font-bold mb-6 text-navy">Garment Consultancy</h3>
            <p className="text-text-dim mb-8">
               Muhammad Anwar Saeed also works as an independent garment consultant. Services include production planning advice, quality standard guidance, and supplier evaluation.
            </p>
            <Button onClick={() => setPage('contact')} className="bg-navy text-white w-full h-14">Get Consultancy</Button>
         </div>
      </div>

      {/* Section 2 */}
      <Card className="bg-navy text-white p-12 lg:p-20 border-none rounded-[40px] overflow-hidden relative">
         <div className="absolute top-0 right-0 w-96 h-96 bg-gold/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
         <div className="relative z-10 space-y-12">
            <div className="space-y-4 text-center md:text-left">
               <h2 className="text-4xl font-display font-bold">Third Party QC / On-Site Inspection</h2>
               <p className="text-white/60 max-w-2xl">
                  We also provide QC inspection services for external companies. If your company needs an experienced QC consultant to visit a factory or production facility in Pakistan and conduct a professional inspection — we are available.
               </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
               {[
                 { title: 'On-Site Audit', desc: 'Factory visit and on-site garment inspection during any stage of production.' },
                 { title: 'Independent Review', desc: 'Independent third-party quality audit for brands and export companies.' },
                 { title: 'Detailed Reports', desc: 'Comprehensive inspection reports provided immediately after the visit.' }
               ].map(service => (
                 <div key={service.title} className="bg-white/5 border border-white/10 p-8 rounded-3xl space-y-4">
                    <div className="text-gold font-bold">{service.title}</div>
                    <p className="text-sm opacity-60 leading-relaxed">{service.desc}</p>
                 </div>
               ))}
            </div>

            <div className="flex flex-col md:flex-row justify-between items-center gap-8 pt-12 border-t border-white/10">
               <div>
                  <div className="text-xl font-bold">Available for Global Brands</div>
                  <div className="text-white/40 text-sm">Serving brands, buying houses, and export companies worldwide.</div>
               </div>
               <Button onClick={() => setPage('contact')} size="lg" className="bg-gold text-white hover:bg-gold/90 px-12 h-16 text-lg">
                  Request QC Inspection
               </Button>
            </div>
         </div>
      </Card>
    </div>
  </div>
);

export const LaraibPalette = () => (
  <div className="p-8 lg:p-24 animate-in fade-in duration-500 font-body">
    <div className="text-center mb-12">
       <h2 className="text-4xl font-display font-bold">Digital Color Palette</h2>
    </div>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {COLOR_PALETTE.map(color => (
        <Card key={color.code} className="p-0 overflow-hidden">
          <div className="h-32" style={{ backgroundColor: color.hex }} />
          <div className="p-4 flex justify-between items-center text-navy font-mono font-bold">
            <div>
              <div>{color.code}</div>
              <div className="text-[10px] opacity-60">{color.name}</div>
            </div>
            <div className="text-[10px] opacity-40">{color.hex}</div>
          </div>
        </Card>
      ))}
    </div>
  </div>
);

export const LaraibContact = () => (
  <div className="p-8 lg:p-24 animate-in fade-in duration-500 font-body max-w-7xl mx-auto">
     <div className="grid lg:grid-cols-2 gap-20">
        <div className="space-y-10">
           <div className="space-y-4">
              <h2 className="text-5xl font-display font-bold text-navy">Request a Quote</h2>
              <p className="text-text-dim text-lg">Send us your trading requirements and we will get back to you within 24 hours.</p>
           </div>
           <form className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-bold tracking-widest text-navy/40">Full Name</label>
                  <input type="text" placeholder="e.g. John Doe" className="w-full p-4 border-2 border-line rounded-2xl focus:border-navy outline-none transition-colors bg-slate-50/50" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-bold tracking-widest text-navy/40">Email Address</label>
                  <input type="email" placeholder="john@company.com" className="w-full p-4 border-2 border-line rounded-2xl focus:border-navy outline-none transition-colors bg-slate-50/50" />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-bold tracking-widest text-navy/40">Contact Number</label>
                  <input type="tel" placeholder="+92 3XX XXXXXXX" className="w-full p-4 border-2 border-line rounded-2xl focus:border-navy outline-none transition-colors bg-slate-50/50" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-bold tracking-widest text-navy/40">Subject / Category</label>
                  <select className="w-full p-4 border-2 border-line rounded-2xl focus:border-navy outline-none transition-colors appearance-none bg-white">
                    <option>Garment Export</option>
                    <option>Industrial Parts</option>
                    <option>QC Inspection</option>
                    <option>General Inquiry</option>
                  </select>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-bold tracking-widest text-navy/40">Your Inquiry</label>
                <textarea placeholder="Describe your sourcing requirements in detail..." rows={6} className="w-full p-4 border-2 border-line rounded-2xl focus:border-navy outline-none transition-colors bg-slate-50/50" />
              </div>
              <Button size="lg" className="bg-navy text-white hover:bg-navy/90 w-full h-16 text-lg font-bold shadow-xl rounded-2xl">
                Submit Trade Inquiry
              </Button>
           </form>
        </div>
        
        <div className="space-y-12">
           <div className="bg-navy p-12 lg:p-16 rounded-[48px] text-white space-y-12 relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 rounded-full blur-3xl pointer-events-none" />
              
              <div className="space-y-6 relative z-10">
                 <h3 className="text-3xl font-display font-bold border-b border-white/10 pb-4">Direct Connection</h3>
                 <div className="space-y-10">
                    <div className="flex items-start gap-6">
                       <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center shrink-0 border border-white/20">
                          <Mail className="text-gold" size={28} />
                       </div>
                       <div className="space-y-1">
                          <div className="text-[10px] uppercase font-bold text-gold/90 tracking-[0.2em]">Send an Email</div>
                          <div className="text-2xl font-medium">laraibtrading188@gmail.com</div>
                       </div>
                    </div>
                    <div className="flex items-start gap-6">
                       <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center shrink-0 border border-white/20">
                          <Phone className="text-gold" size={28} />
                       </div>
                       <div className="space-y-1">
                          <div className="text-[10px] uppercase font-bold text-gold/90 tracking-[0.2em]">WhatsApp / Call</div>
                          <div className="text-2xl font-mono font-bold">03453253471</div>
                       </div>
                    </div>
                    <div className="flex items-start gap-6">
                       <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center shrink-0 border border-white/20">
                          <MapPin className="text-gold" size={28} />
                       </div>
                       <div className="space-y-1">
                          <div className="text-[10px] uppercase font-bold text-gold/90 tracking-[0.2em]">Main Regions</div>
                          <div className="text-2xl">Pakistan • Africa • Canada</div>
                       </div>
                    </div>
                 </div>
              </div>

              <div className="space-y-6 relative z-10 pt-10 border-t border-white/10">
                 <h4 className="font-bold text-gold uppercase tracking-[0.3em] text-xs underline underline-offset-8 decoration-gold/30">Business Hours</h4>
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-4">
                    <div className="bg-white/5 p-6 rounded-2xl border border-white/10 hover:border-gold/30 transition-colors">
                      <div className="text-gold/80 text-[10px] uppercase mb-1 font-bold tracking-widest">Mon - Sat</div>
                      <div className="font-bold text-2xl">9:00 AM - 7:00 PM</div>
                    </div>
                    <div className="bg-white/5 p-6 rounded-2xl border border-white/10 hover:border-gold/30 transition-colors">
                      <div className="text-gold/80 text-[10px] uppercase mb-1 font-bold tracking-widest">Sunday</div>
                      <div className="font-bold text-2xl">Appointment</div>
                    </div>
                 </div>
              </div>
           </div>

           <Card className="p-12 border-2 border-navy/10 bg-slate-50 space-y-6 rounded-[32px] shadow-lg">
              <div className="flex items-center gap-5">
                 <div className="bg-navy p-3 rounded-xl shadow-lg">
                    <ShieldCheck className="text-gold" size={32} />
                 </div>
                 <div className="font-bold text-2xl text-navy">Secure Trading Partners</div>
              </div>
              <p className="text-lg text-text-dim leading-relaxed">
                 Every inquiry is treated with strict confidentiality. We provide end-to-end logistics support for all international shipments.
              </p>
           </Card>
        </div>
     </div>
  </div>
);
