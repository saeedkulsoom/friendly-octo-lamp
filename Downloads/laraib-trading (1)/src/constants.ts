import { Product, ColorShade } from './types';

// Laraib Trading Constants
export const PRODUCTS: Product[] = [
  { id: 'g1', name: 'Cotton Shirts', description: 'Premium quality 100% cotton shirts for global export.', category: 'Garments', icon: '👕', label: '100% Cotton', image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&q=80&w=800' },
  { id: 'g2', name: 'Polyester Shirts', description: 'High-durability polyester blend dress shirts.', category: 'Garments', icon: '👕', label: 'Polyester Blend', image: 'https://images.unsplash.com/photo-1598033129183-c4f50c7176c8?auto=format&fit=crop&q=80&w=800' },
  { id: 'g3', name: 'T-Shirts', description: 'Classic 180 GSM combed cotton t-shirts.', category: 'Garments', icon: '👕', label: 'Classic Tee', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=800' },
  { id: 'g4', name: 'Polo Shirts', description: 'Double pique polo shirts with tipping collars.', category: 'Garments', icon: '🎽', label: 'Polo', image: 'https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?auto=format&fit=crop&q=80&w=800' },
  { id: 'g5', name: 'Hoodies', description: 'Heavyweight fleece hoodies with durable stitching.', category: 'Garments', icon: '🧥', label: 'Hoodie', image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=800' },
  { id: 'g6', name: 'Sweatshirts', description: 'Soft interior brushed fleece sweatshirts.', category: 'Garments', icon: '🧥', label: 'Sweatshirt', image: 'https://images.unsplash.com/photo-1578932724460-639a0441d01a?auto=format&fit=crop&q=80&w=800' },
  { id: 't1', name: 'Button Threads', description: 'Industrial grade sewing threads for heavy machinery.', category: 'Trimmings', icon: '🧵', image: 'https://images.unsplash.com/photo-1506806732259-39c2d4a68470?auto=format&fit=crop&q=80&w=800' },
  { id: 't2', name: 'Labels', description: 'Woven and printed labels for garment branding.', category: 'Trimmings', icon: '🏷️', image: 'https://images.unsplash.com/photo-1560243563-062bff001d68?auto=format&fit=crop&q=80&w=800' },
  { id: 't3', name: 'Buttons', description: 'High-quality poly and metal buttons.', category: 'Trimmings', icon: '🔘', image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&q=80&w=800' },
  { id: 'i1', name: 'Machine Spare Parts', description: 'Original spare parts for Juki, Brothers, and Pegasus machines.', category: 'Industrial', icon: '⚙️', image: 'https://images.unsplash.com/photo-1537462715879-360eeb61a0ad?auto=format&fit=crop&q=80&w=800' },
  { id: 'i2', name: 'Industrial Belts', description: 'Timing and power transmission belts for textile mills.', category: 'Industrial', icon: '〰️', image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&q=80&w=800' },
];

export const COLOR_PALETTE: ColorShade[] = [
  { code: 'LT-101', name: 'Navy Blue', hex: '#002366' },
  { code: 'LT-102', name: 'Crimson', hex: '#E30022' },
  { code: 'LT-103', name: 'Forest Green', hex: '#008000' },
  { code: 'LT-104', name: 'Royal Gold', hex: '#FFD700' },
  { code: 'LT-105', name: 'Jet Black', hex: '#000000' },
  { code: 'LT-106', name: 'Pure White', hex: '#FFFFFF' },
  { code: 'LT-107', name: 'Steel Grey', hex: '#778899' },
  { code: 'LT-108', name: 'Sky Blue', hex: '#87CEEB' },
];

export const GLOBAL_REACH = [
  { country: 'Africa', description: 'Major trade routes to Nigeria, Kenya, and South Africa.' },
  { country: 'China', description: 'Import and export hub for raw materials and finished goods.' },
  { country: 'Canada', description: 'Specialized garment exports to North American retailers.' },
  { country: 'Pakistan', description: 'The manufacturing soul and headquarters of operations.' },
];

