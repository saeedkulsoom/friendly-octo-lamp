import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { LayoutGrid, Shield } from 'lucide-react';
import { LaraibHome, LaraibAbout, LaraibServices, LaraibCatalog, LaraibPalette, LaraibContact, LaraibQC } from './pages/laraib/LaraibPages';
import { LaraibNavbar, LaraibFooter } from './pages/laraib/NavigationLaraib';
import { GarLT } from './components/GarLT';
import { Toast, ToastProps } from './components/Common';
import { LaraibPage } from './types';

export default function App() {
  const [laraibPage, setLaraibPage] = useState<LaraibPage>('home');
  const [toast, setToast] = useState<ToastProps | null>(null);

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    setToast({ message, type, onClose: () => setToast(null) });
  };

  const renderLaraib = () => {
    switch (laraibPage) {
      case 'home': return <LaraibHome setPage={setLaraibPage} />;
      case 'about': return <LaraibAbout />;
      case 'services': return <LaraibServices />;
      case 'qc': return <LaraibQC setPage={setLaraibPage} />;
      case 'catalog': return <LaraibCatalog />;
      case 'palette': return <LaraibPalette />;
      case 'contact': return <LaraibContact />;
      default: return <LaraibHome setPage={setLaraibPage} />;
    }
  };

  return (
    <div>
      <div className="bg-background text-primary min-h-screen flex flex-col font-body transition-colors duration-500">
        <LaraibNavbar currentPage={laraibPage} setPage={setLaraibPage} />
        <main className="flex-1">
          <AnimatePresence mode="wait">
            <motion.div key={laraibPage} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              {renderLaraib()}
            </motion.div>
          </AnimatePresence>
        </main>
        <LaraibFooter />
        <GarLT />

        <AnimatePresence>
          {toast && <Toast {...toast} />}
        </AnimatePresence>
      </div>
    </div>
  );
}
