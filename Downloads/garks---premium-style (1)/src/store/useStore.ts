import { create } from 'zustand';

export type Review = {
  id: string;
  user: string;
  rating: number;
  comment: string;
  date: string;
};

export type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  description: string;
  stock: number;
  variants: { size: string[]; color: string[]; material?: string[] };
  rating: number;
  stockHistory?: { date: string; amount: number; type: 'in' | 'out' }[];
  sku?: string;
  reviews?: Review[];
};

export type Supplier = {
  id: string;
  name: string;
  company: string;
  contactPerson: string;
  phone: string;
  email: string;
  address: string;
  category: string; // Fabric, Leather, Accessories, etc.
  rating: number; // 1-5 Performance Rating
};

export type PurchaseOrder = {
  id: string;
  supplierId: string;
  productId: string;
  quantity: number;
  status: 'Draft' | 'Sent' | 'Received' | 'Completed';
  createdAt: string;
  totalCost: number;
};

export type CartItem = Product & { quantity: number };

export type User = {
  id: string;
  username: string;
  name: string;
  email: string;
  phone: string;
  isAdmin: boolean;
  photo?: string;
  points: number;
  tier: 'Silver' | 'Gold' | 'Platinum';
};

export type Order = {
  id: string;
  items: CartItem[];
  total: number;
  status: 'Processing' | 'Shipped' | 'Out for Delivery' | 'Delivered';
  date: string;
  trackingNumber: string;
};

export type Notification = {
  id: string;
  title: string;
  message: string;
  time: string;
  type: 'sale' | 'info' | 'order' | 'inventory';
  read: boolean;
};

export type Campaign = {
  id: string;
  name: string;
  status: 'Active' | 'Draft' | 'Paused';
  reach: string;
  ctr: string;
  icon: string;
  color: string;
  type: 'Instagram' | 'Email' | 'SMS' | 'Web';
};

export type Theme = 'dark' | 'light' | 'premium-gold';

export type AppState = {
  user: User | null;
  mode: 'customer' | 'admin';
  theme: Theme;
  cart: CartItem[];
  wishlist: string[]; // Product IDs
  inventory: Product[];
  suppliers: Supplier[];
  purchaseOrders: PurchaseOrder[];
  orders: Order[];
  notifications: Notification[];
  campaigns: Campaign[];
  isLoggedIn: boolean;
  isLocked: boolean;
  adminPassword: string;
  adminSecurityCode: string;
  gargiOpen: boolean;
  toast: { message: string; visible: boolean } | null;
  cartFeedback: string | null; // ID of product added to cart
  flyPos: { x: number; y: number } | null;
  lastViewed: string[]; // To track recently viewed items for recommendations
  
  // Actions
  setUser: (user: User | null) => void;
  setMode: (mode: 'customer' | 'admin') => void;
  setTheme: (theme: Theme) => void;
  addToCart: (product: Product, event?: any) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  toggleWishlist: (productId: string) => void;
  clearCart: () => void;
  placeOrder: (total: number) => void;
  logout: () => void;
  updateInventory: (product: Product) => void;
  addNotification: (notif: Omit<Notification, 'id' | 'time' | 'read'>) => void;
  markNotificationsRead: () => void;
  clearNotifications: () => void;
  setToast: (message: string | null) => void;
  trackView: (productId: string) => void;
  setGargiOpen: (open: boolean) => void;
  addCampaign: (campaign: Campaign) => void;
  
  setAdminPassword: (password: string) => void;
  setAdminSecurityCode: (code: string) => void;
  unlockAdmin: (password: string) => boolean;
  lockAdmin: () => void;
  
  // Inventory & Supplier Actions
  addSupplier: (supplier: Supplier) => void;
  updateSupplier: (supplier: Supplier) => void;
  addPurchaseOrder: (po: PurchaseOrder) => void;
  updatePurchaseOrder: (po: PurchaseOrder) => void;
};

const INITIAL_SUPPLIERS: Supplier[] = [
  // Fabric Suppliers
  { id: 's1', name: 'Marco Rossi', company: 'Milan Fabrics Co.', contactPerson: 'Marco', phone: '+39 02 123456', email: 'marco@milanfabrics.it', address: 'Via Montenapoleone, Milan', category: 'Fabric', rating: 4.8 },
  { id: 's4', name: 'Ahmed Khan', company: 'Indus Textiles', contactPerson: 'Ahmed', phone: '+92 21 3456789', email: 'ahmed@industext.com', address: 'SITE Area, Karachi', category: 'Fabric', rating: 4.6 },
  
  // Leather Suppliers
  { id: 's2', name: 'John Smith', company: 'Premium Leather Ltd.', contactPerson: 'John', phone: '+44 20 7946 0000', email: 'john@premiumleather.co.uk', address: 'Leather Lane, London', category: 'Leather', rating: 4.5 },
  { id: 's5', name: 'Enzo Ferrari', company: 'Tuscan Leather S.p.A', contactPerson: 'Enzo', phone: '+39 055 987654', email: 'enzo@tuscanleather.it', address: 'Via di Scandicci, Florence', category: 'Leather', rating: 4.9 },
  
  // Accessories Suppliers
  { id: 's3', name: 'Li Wei', company: 'Zhejiang Accessories', contactPerson: 'Li', phone: '+86 571 8888 8888', email: 'li.wei@zjacce.com', address: 'Industrial Road, Hangzhou', category: 'Accessories', rating: 4.2 },
  { id: 's6', name: 'Yuta Watanabe', company: 'Tokyo Trim & Zipper', contactPerson: 'Yuta', phone: '+81 3 1234 5678', email: 'y.watanabe@tokyotrim.jp', address: 'Chuo City, Tokyo', category: 'Accessories', rating: 4.7 }
];

const DUMMY_POS: PurchaseOrder[] = [
  { id: 'PO-001', supplierId: 's1', productId: 'm1', quantity: 100, status: 'Completed', createdAt: '2024-03-10', totalCost: 4500 },
  { id: 'PO-002', supplierId: 's2', productId: 'm3', quantity: 20, status: 'Sent', createdAt: '2024-03-15', totalCost: 3800 }
];

const DUMMY_PRODUCTS: Product[] = [
  // Men's Collection
  { 
    id: 'm1', 
    sku: 'SH-OX-001', 
    name: 'Premium Oxford Shirt', 
    category: 'Shirts', 
    price: 85, 
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&q=80', 
    description: 'Handcrafted from fine Egyptian cotton. Features a semi-spread collar and reinforced seams for a sharp, executive silhouette.', 
    stock: 24, 
    variants: { size: ['S', 'M', 'L', 'XL'], color: ['White', 'Light Blue'], material: ['Cotton'] }, 
    rating: 4.8,
    reviews: [
      { id: 'r1', user: 'Alexander V.', rating: 5, comment: "The quality of this cotton is unmatched. Perfect for long board meetings.", date: '2 days ago' },
      { id: 'r2', user: 'James L.', rating: 4, comment: "Excellent fit, though I'd recommend sizing up if you prefer a relaxed look.", date: '1 week ago' },
      { id: 'r19', user: 'Saeed K.', rating: 5, comment: "Truly a luxury staple. The light blue is stunning in person.", date: '1 month ago' }
    ]
  },
  { 
    id: 'm2', 
    sku: 'PN-CH-002', 
    name: 'Slim Fit Chinos', 
    category: 'Pants', 
    price: 75, 
    image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&q=80', 
    description: 'Perfect balance of comfort and style. Engineered with a slight stretch for the modern professional on the move.', 
    stock: 35, 
    variants: { size: ['30', '32', '34'], color: ['Khaki', 'Navy'], material: ['Cotton Twill'] }, 
    rating: 4.6,
    reviews: [
      { id: 'r3', user: 'Robert D.', rating: 5, comment: "The comfort level is insane. I wear these both to the office and for casual dinners.", date: '3 days ago' },
      { id: 'r4', user: 'Mark T.', rating: 4, comment: "Great material, holds its shape well after multiple washes.", date: '2 weeks ago' }
    ]
  },
  { 
    id: 'm3', 
    sku: 'JK-LE-003', 
    name: 'Biker Leather Jacket', 
    category: 'Leather Jackets', 
    price: 295, 
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&q=80', 
    description: 'Grained leather with metallic hardware. A bold statement piece designed to age beautifully over time.', 
    stock: 8, 
    variants: { size: ['M', 'L', 'XL'], color: ['Black'], material: ['Lambskin Leather'] }, 
    rating: 4.9,
    reviews: [
      { id: 'r5', user: 'Viktor R.', rating: 5, comment: "A masterpiece. The leather is buttery soft but feels incredibly durable.", date: 'Yesterday' },
      { id: 'r6', user: 'Chris P.', rating: 5, comment: "Every biker enthusiast needs this. The hardware is high-grade and doesn't rattle.", date: '1 month ago' },
      { id: 'r20', user: 'GarKS Fan', rating: 5, comment: "The smell of premium leather is unmistakable. Simply elite.", date: '2 months ago' }
    ]
  },
  { 
    id: 'm4', 
    sku: 'HD-FL-004', 
    name: 'Tech Fleece Hoodie', 
    category: 'Hoodies', 
    price: 95, 
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80', 
    description: 'Advanced warmth without the weight. Features moisture-wicking technology and a sleek, technical finish.', 
    stock: 42, 
    variants: { size: ['S', 'M', 'L'], color: ['Grey', 'Black'], material: ['Tech Fleece'] }, 
    rating: 4.7,
    reviews: [
      { id: 'r7', user: 'Leo S.', rating: 5, comment: "Doesn't even feel like a hoodie. It feels like a piece of high-performance gear.", date: '4 days ago' },
      { id: 'r8', user: 'Daniel M.', rating: 4, comment: "Great for early morning runs. The hood stays in place perfectly.", date: '3 weeks ago' }
    ]
  },
  { 
    id: 'm5', 
    sku: 'PL-PI-005', 
    name: 'Classic Pique Polo', 
    category: 'Polo Shirts', 
    price: 55, 
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80', 
    description: 'Breathable cotton pique fabric. A timeless silhouette for the refined casual wardrobe.', 
    stock: 5, 
    variants: { size: ['S', 'M', 'L', 'XL'], color: ['Navy', 'White', 'Black'], material: ['Cotton Pique'] }, 
    rating: 4.5,
    reviews: [
      { id: 'r9', user: 'Sebastian W.', rating: 5, comment: "The collar doesn't curl, which is a sign of true quality polo.", date: '5 days ago' },
      { id: 'r10', user: 'Thomas E.', rating: 4, comment: "Nice traditional fit. Would love more pastel colors in the future.", date: '1 month ago' }
    ]
  },
  
  // Women's Collection
  { 
    id: 'w1', 
    sku: 'BL-SI-006', 
    name: 'Silk Blouse', 
    category: 'Women', 
    price: 120, 
    image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&q=80', 
    description: 'Smooth silk for an elegant drape. Designed to capture light and exude effortless sophisticated charm.', 
    stock: 15, 
    variants: { size: ['XS', 'S', 'M'], color: ['Ivory', 'Champagne'], material: ['100% Silk'] }, 
    rating: 4.9,
    reviews: [
      { id: 'r11', user: 'Elena G.', rating: 5, comment: "The way this silk falls is just ethereal. I feel incredibly confident wearing it.", date: '1 week ago' },
      { id: 'r12', user: 'Sarah J.', rating: 5, comment: "Pure luxury. Worth every penny for the quality alone.", date: '2 weeks ago' },
      { id: 'r21', user: 'Isabella M.', rating: 4, comment: "Beautiful ivory shade. It's delicate but well-constructed.", date: '1 month ago' }
    ]
  },
  { 
    id: 'w2', 
    sku: 'TR-HW-007', 
    name: 'High-Waist Trousers', 
    category: 'Women', 
    price: 90, 
    image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&q=80', 
    description: 'Tailored fit for professional presence. High-waisted silhouette that elongates and empowers.', 
    stock: 20, 
    variants: { size: ['2', '4', '6', '8'], color: ['Black', 'Tan'], material: ['Wool Blend'] }, 
    rating: 4.7,
    reviews: [
      { id: 'r13', user: 'Natasha K.', rating: 5, comment: "Finally, trousers that fit perfectly at the waist and hip. Executive chic.", date: '10 days ago' },
      { id: 'r14', user: 'Fiona H.', rating: 4, comment: "Lovely wool blend. Warm but breathable for indoor use.", date: '3 weeks ago' }
    ]
  },
  { 
    id: 'w3', 
    sku: 'CT-TR-008', 
    name: 'Oversized Trench Coat', 
    category: 'Women', 
    price: 185, 
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80', 
    description: 'Water-resistant luxury trench. A modern reinterpretion of a classic, providing style in any element.', 
    stock: 12, 
    variants: { size: ['S', 'M', 'L'], color: ['Camel'], material: ['Gabardine'] }, 
    rating: 4.8,
    reviews: [
      { id: 'r15', user: 'Catherine B.', rating: 5, comment: "The ultimate power move. This trench turns heads in London rain.", date: 'Yesterday' },
      { id: 'r16', user: 'Lydia W.', rating: 5, comment: "Incredible detail on the belt and buckles. Truly high fashion.", date: '1 month ago' }
    ]
  },
  { 
    id: 'w4', 
    sku: 'SW-CS-009', 
    name: 'Cashmere Sweater', 
    category: 'Women', 
    price: 210, 
    image: 'https://images.unsplash.com/photo-1574167132742-132ba067ced5?auto=format&fit=crop&q=80', 
    description: '100% pure Himalayan cashmere. Unrivaled softness and warmth for the discerning individual.', 
    stock: 0, 
    variants: { size: ['S', 'M'], color: ['Soft Grey', 'Dusty Rose'], material: ['Cashmere'] }, 
    rating: 5.0,
    reviews: [
      { id: 'r17', user: 'Sofia L.', rating: 5, comment: "It feels like a warm hug from a cloud. My desert island item.", date: '2 days ago' },
      { id: 'r18', user: 'Maya P.', rating: 5, comment: "Pure, unadulterated luxury. I'll be ordering the rose one as soon as it's back in stock.", date: '1 week ago' }
    ]
  },
];

export const useStore = create<AppState>((set, get) => ({
  user: null,
  mode: 'customer',
  theme: 'dark',
  cart: [],
  wishlist: [],
  inventory: DUMMY_PRODUCTS,
  suppliers: INITIAL_SUPPLIERS,
  purchaseOrders: DUMMY_POS,
  orders: [],
  notifications: [
    { id: 'initial-1', title: 'Welcome to GarKS', message: 'Experience the future of fashion with Gargi AI.', time: '1h ago', type: 'info', read: false }
  ],
  campaigns: [
    { id: 'c1', name: 'Summer Solstice', status: 'Active', reach: '12.4k', ctr: '4.2%', icon: 'Instagram', color: '#ec4899', type: 'Instagram' },
    { id: 'c2', name: 'VIP Privilege', status: 'Active', reach: '2.1k', ctr: '12.8%', icon: 'Mail', color: '#3fb950', type: 'Email' },
    { id: 'c3', name: 'Flash Friday', status: 'Draft', reach: '0', ctr: '0%', icon: 'Zap', color: '#fbbf24', type: 'SMS' },
  ],
  isLoggedIn: false,
  isLocked: false,
  adminPassword: 'hehehahahoho',
  adminSecurityCode: '1234567890',
  gargiOpen: false,
  toast: null,
  cartFeedback: null,
  flyPos: null,
  lastViewed: [],

  setUser: (user) => set({ user, isLoggedIn: !!user }),
  setMode: (mode) => set({ mode }),
  setTheme: (theme) => set({ theme }),
  
  addToCart: (product, event) => {
    set((state) => {
      const existing = state.cart.find((item) => item.id === product.id);
      
      if (event && event.nativeEvent) {
        set({ flyPos: { x: event.nativeEvent.pageX || 0, y: event.nativeEvent.pageY || 0 } });
        setTimeout(() => set({ flyPos: null }), 600);
      } else if (event) {
        // Fallback for any old web events if they somehow trigger
        set({ flyPos: { x: event.clientX || 0, y: event.clientY || 0 } });
        setTimeout(() => set({ flyPos: null }), 600);
      }

      // Feedback mechanism
      setTimeout(() => set({ cartFeedback: null }), 1000);
      
      const newCart = existing 
        ? state.cart.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)
        : [...state.cart, { ...product, quantity: 1 }];

      return { 
        cart: newCart,
        cartFeedback: product.id,
        toast: { message: `Added ${product.name} to cart`, visible: true }
      };
    });
    
    // Auto clear toast
    setTimeout(() => set({ toast: null }), 3000);
  },

  removeFromCart: (productId) => set((state) => ({
    cart: state.cart.filter((item) => item.id !== productId),
  })),

  updateCartQuantity: (productId, quantity) => set((state) => ({
    cart: state.cart.map((item) =>
      item.id === productId ? { ...item, quantity: Math.max(0, quantity) } : item
    ).filter(item => item.quantity > 0),
  })),

  toggleWishlist: (productId) => set((state) => ({
    wishlist: state.wishlist.includes(productId) 
      ? state.wishlist.filter(id => id !== productId)
      : [...state.wishlist, productId]
  })),

  clearCart: () => set({ cart: [] }),

  placeOrder: (total) => set((state) => {
    const newOrder: Order = {
      id: `ORD-${Math.floor(Math.random() * 100000).toString().padStart(6, '0')}`,
      items: [...state.cart],
      total: total,
      status: 'Processing',
      date: new Date().toISOString(),
      trackingNumber: `GS-${Math.random().toString(36).substring(7).toUpperCase()}`
    };
    
    // Award points
    const pointsEarned = Math.floor(total * 0.5);
    const updatedUser = state.user ? {
      ...state.user,
      points: state.user.points + pointsEarned,
      tier: (state.user.points + pointsEarned) > 2000 ? 'Platinum' : (state.user.points + pointsEarned) > 1000 ? 'Gold' : 'Silver'
    } as User : null;

    return {
      orders: [newOrder, ...state.orders],
      cart: [],
      user: updatedUser,
      toast: { message: "Order placed successfully!", visible: true }
    };
  }),
  
  logout: () => set({ user: null, isLoggedIn: false, cart: [], wishlist: [], mode: 'customer', notifications: [], toast: null, cartFeedback: null, orders: [] }),

  updateInventory: (product) => set((state) => ({
    inventory: state.inventory.map((p) => p.id === product.id ? product : p),
  })),

  addNotification: (notif) => set((state) => ({
    notifications: [
      {
        ...notif,
        id: Math.random().toString(36).substr(2, 9),
        time: 'Just now',
        read: false
      },
      ...state.notifications
    ]
  })),

  markNotificationsRead: () => set((state) => ({
    notifications: state.notifications.map(n => ({ ...n, read: true }))
  })),

  clearNotifications: () => set({ notifications: [] }),
  setToast: (message) => {
    if (message) {
      set({ toast: { message, visible: true } });
      setTimeout(() => {
        set((state) => ({ 
          toast: state.toast?.message === message ? null : state.toast 
        }));
      }, 3000);
    } else {
      set({ toast: null });
    }
  },

  trackView: (productId) => set((state) => ({
    lastViewed: [productId, ...state.lastViewed.filter(id => id !== productId)].slice(0, 10)
  })),

  setGargiOpen: (open) => set({ gargiOpen: open }),
  addCampaign: (campaign) => set((state) => ({ campaigns: [campaign, ...state.campaigns] })),

  setAdminPassword: (password) => set({ adminPassword: password }),
  setAdminSecurityCode: (code) => set({ adminSecurityCode: code }),
  unlockAdmin: (password) => {
    set({ isLocked: false });
    return true;
  },
  lockAdmin: () => set({ isLocked: true }),

  addSupplier: (supplier) => set((state) => ({ suppliers: [...state.suppliers, supplier] })),
  updateSupplier: (supplier) => set((state) => ({
    suppliers: state.suppliers.map(s => s.id === supplier.id ? supplier : s)
  })),
  addPurchaseOrder: (po) => set((state) => ({ purchaseOrders: [...state.purchaseOrders, po] })),
  updatePurchaseOrder: (po) => set((state) => ({
    purchaseOrders: state.purchaseOrders.map(p => p.id === po.id ? po : p)
  })),
}));
