import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ShoppingCart, Heart, Star } from 'lucide-react'
import type { Product } from '../types'
import { useCartStore } from '../store/cartStore'
import toast from 'react-hot-toast'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCartStore()

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fa-IR').format(price) + ' تومان'
  }

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addItem(product)
    toast.success('به سبد خرید اضافه شد!')
  }

  return (
    <Link to={`/product/${product.id}`}>
      <motion.div
        whileHover={{ y: -5 }}
        className="group bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden hover:shadow-xl transition-all duration-300"
      >
        {/* Image */}
        <div className="relative aspect-[4/5] overflow-hidden bg-gray-100">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          {discount > 0 && (
            <div className="absolute top-1.5 left-1.5 sm:top-2 sm:left-2 px-1.5 py-0.5 sm:px-2 sm:py-1 bg-red-500 text-white text-[9px] sm:text-xs font-bold rounded-lg z-10 whitespace-nowrap">
              {discount}%
            </div>
          )}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleAddToCart}
            className="absolute bottom-1.5 left-1.5 sm:bottom-2 sm:left-2 p-1.5 sm:p-2 md:p-3 bg-white dark:bg-gray-900 rounded-xl shadow-lg sm:opacity-0 sm:group-hover:opacity-100 transition-opacity hover:bg-primary hover:text-white"
          >
            <ShoppingCart size={14} className="sm:w-5 sm:h-5" />
          </motion.button>
          <button
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
            }}
            className="absolute top-1.5 right-1.5 sm:top-2 sm:right-2 p-1 sm:p-1.5 md:p-2 bg-white/80 dark:bg-gray-900/80 rounded-lg sm:opacity-0 sm:group-hover:opacity-100 transition-opacity hover:bg-red-50 hover:text-red-500"
          >
            <Heart size={12} className="sm:w-4 sm:h-4" />
          </button>
        </div>

        {/* Info */}
        <div className="p-1.5 sm:p-3 md:p-4">
          <h3 className="font-bold text-[11px] sm:text-xs md:text-sm mb-0.5 sm:mb-1 line-clamp-2 group-hover:text-primary transition-colors min-h-[1.75rem] sm:min-h-[2rem] md:min-h-[2.5rem] leading-snug">
            {product.name}
          </h3>
          <div className="flex items-center gap-0.5 sm:gap-1 mb-0.5 sm:mb-1 md:mb-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={9}
                className={`sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 ${i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
              />
            ))}
            <span className="text-[8px] sm:text-[10px] md:text-xs text-gray-400 mr-0.5 sm:mr-1">({product.reviews})</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center gap-0 sm:gap-1 md:gap-2">
            <span className="font-bold text-[10px] sm:text-xs md:text-sm text-primary truncate">{formatPrice(product.price)}</span>
            {product.originalPrice && (
              <span className="text-[8px] sm:text-[10px] md:text-xs text-gray-400 line-through truncate">{formatPrice(product.originalPrice)}</span>
            )}
          </div>
        </div>
      </motion.div>
    </Link>
  )
}
