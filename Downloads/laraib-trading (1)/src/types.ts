// Laraib Trading Types
export type LaraibPage = 'home' | 'about' | 'services' | 'catalog' | 'palette' | 'contact' | 'qc';

export interface Product {
  id: string;
  name: string;
  description: string;
  category: 'Garments' | 'Industrial' | 'Trimmings';
  image?: string;
  icon?: string;
  label?: string;
}

export interface ColorShade {
  code: string;
  name: string;
  hex: string;
}

