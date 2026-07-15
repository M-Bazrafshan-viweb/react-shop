import { create } from 'zustand'
import type { CartItem, Product, ThemeMode } from '../types'

interface CartStore {
  items: CartItem[]
  isOpen: boolean
  theme: ThemeMode
  isDark: boolean
  addItem: (product: Product) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  toggleCart: () => void
  setCartOpen: (open: boolean) => void
  toggleTheme: () => void
  setTheme: (theme: ThemeMode) => void
  getTotalItems: () => number
  getTotalPrice: () => number
}

const loadCartFromStorage = (): CartItem[] => {
  try {
    const stored = localStorage.getItem('react-shop-cart')
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

const loadThemeFromStorage = (): ThemeMode => {
  try {
    const stored = localStorage.getItem('react-shop-theme')
    return (stored as ThemeMode) || 'light'
  } catch {
    return 'light'
  }
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: loadCartFromStorage(),
  isOpen: false,
  theme: loadThemeFromStorage(),
  isDark: loadThemeFromStorage() === 'dark',

  addItem: (product: Product) => {
    set((state) => {
      const existingItem = state.items.find((item) => item.id === product.id)
      let newItems: CartItem[]
      if (existingItem) {
        newItems = state.items.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      } else {
        newItems = [...state.items, { ...product, quantity: 1 }]
      }
      localStorage.setItem('react-shop-cart', JSON.stringify(newItems))
      return { items: newItems, isOpen: true }
    })
  },

  removeItem: (productId: string) => {
    set((state) => {
      const newItems = state.items.filter((item) => item.id !== productId)
      localStorage.setItem('react-shop-cart', JSON.stringify(newItems))
      return { items: newItems }
    })
  },

  updateQuantity: (productId: string, quantity: number) => {
    set((state) => {
      let newItems: CartItem[]
      if (quantity <= 0) {
        newItems = state.items.filter((item) => item.id !== productId)
      } else {
        newItems = state.items.map((item) =>
          item.id === productId ? { ...item, quantity } : item
        )
      }
      localStorage.setItem('react-shop-cart', JSON.stringify(newItems))
      return { items: newItems }
    })
  },

  clearCart: () => {
    localStorage.removeItem('react-shop-cart')
    set({ items: [] })
  },

  toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
  setCartOpen: (open: boolean) => set({ isOpen: open }),

  toggleTheme: () =>
    set((state) => {
      const newTheme = state.theme === 'light' ? 'dark' : 'light'
      localStorage.setItem('react-shop-theme', newTheme)
      if (newTheme === 'dark') {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
      return { theme: newTheme, isDark: newTheme === 'dark' }
    }),

  setTheme: (theme: ThemeMode) => {
    localStorage.setItem('react-shop-theme', theme)
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    set({ theme, isDark: theme === 'dark' })
  },

  getTotalItems: () => {
    return get().items.reduce((total, item) => total + item.quantity, 0)
  },

  getTotalPrice: () => {
    return get().items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    )
  },
}))
