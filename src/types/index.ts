export interface Product {
  id: string
  name: string
  price: number
  originalPrice?: number
  description: string
  category: string
  image: string
  images: string[]
  rating: number
  reviews: number
  inStock: boolean
  colors: string[]
  sizes: string[]
}

export interface Review {
  id: number
  author: string
  rating: number
  comment: string
  date: string
  avatar: string
}

export interface CartItem extends Product {
  quantity: number
}

export interface Category {
  id: string
  name: string
  slug: string
  icon: string
}

export interface SortOption {
  value: string
  label: string
}

export type ThemeMode = 'light' | 'dark'
