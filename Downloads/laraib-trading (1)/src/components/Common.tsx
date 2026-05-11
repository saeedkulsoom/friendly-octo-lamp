import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';
import { cn } from '../lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg' | 'icon';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    const variants = {
      primary: 'bg-accent text-background font-semibold hover:opacity-90 active:scale-95',
      secondary: 'bg-secondary text-background font-semibold hover:opacity-90 active:scale-95',
      outline: 'border-2 border-accent/20 text-accent hover:bg-accent/10 active:scale-95',
      ghost: 'hover:bg-accent/10 text-white/70 hover:text-white',
      danger: 'bg-red-500 text-white hover:bg-red-600 active:scale-95',
    };
    const sizes = {
      sm: 'px-3 py-1.5 text-sm rounded-lg',
      md: 'px-6 py-3 rounded-xl',
      lg: 'px-8 py-4 text-lg rounded-2xl',
      icon: 'p-2 rounded-lg',
    };
    return (
      <button
        ref={ref}
        className={cn('inline-flex items-center justify-center transition-all duration-200 disabled:opacity-50 disabled:pointer-events-none', variants[variant], sizes[size], className)}
        {...props}
      />
    );
  }
);

export const Card = ({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('bg-surface border border-line rounded-[16px] p-6 shadow-sophisticated', className)} {...props}>
    {children}
  </div>
);

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export const Modal = ({ isOpen, onClose, title, children, className }: ModalProps) => (
  <AnimatePresence>
    {isOpen && (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className={cn('relative bg-surface border border-white/10 rounded-[32px] w-full max-w-lg overflow-hidden shadow-2xl', className)}
        >
          {title && (
            <div className="flex items-center justify-between p-6 border-bottom border-white/5">
              <h2 className="text-xl font-display font-semibold">{title}</h2>
              <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full transition-colors">
                <X size={20} />
              </button>
            </div>
          )}
          <div className="p-6">{children}</div>
        </motion.div>
      </div>
    )}
  </AnimatePresence>
);

export interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'info';
  onClose: () => void;
}

export const Toast = ({ message, type = 'success', onClose }: ToastProps) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const icons = {
    success: <CheckCircle className="text-accent" size={20} />,
    error: <AlertCircle className="text-red-500" size={20} />,
    info: <Info className="text-secondary" size={20} />,
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, x: 0 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="fixed bottom-8 right-8 z-[100] flex items-center gap-3 bg-surface-hover border border-white/10 px-4 py-3 rounded-2xl shadow-2xl min-w-[300px]"
    >
      {icons[type]}
      <span className="text-sm font-medium">{message}</span>
      <button onClick={onClose} className="ml-auto p-1 hover:bg-white/5 rounded-lg">
        <X size={16} />
      </button>
    </motion.div>
  );
};
