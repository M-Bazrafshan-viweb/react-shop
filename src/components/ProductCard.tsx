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
            <div className="absolute top-2 left-2 px-2 py-1 bg-red-500 text-white text-[10px] sm:text-xs font-bold rounded-lg z-10">
              {discount}%
            </div>
          )}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleAddToCart}
            className="absolute bottom-2 left-2 p-2 sm:p-3 bg-white dark:bg-gray-900 rounded-xl shadow-lg sm:opacity-0 sm:group-hover:opacity-100 transition-opacity hover:bg-primary hover:text-white"
          >
            <ShoppingCart size={16} className="sm:w-5 sm:h-5" />
          </motion.button>
          <button
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
            }}
            className="absolute top-2 right-2 p-1.5 sm:p-2 bg-white/80 dark:bg-gray-900/80 rounded-lg sm:opacity-0 sm:group-hover:opacity-100 transition-opacity hover:bg-red-50 hover:text-red-500"
          >
            <Heart size={14} className="sm:w-4 sm:h-4" />
          </button>
        </div>

        {/* Info */}
        <div className="p-2 sm:p-4">
          <h3 className="font-bold text-xs sm:text-sm mb-1 line-clamp-2 group-hover:text-primary transition-colors min-h-[2rem] sm:min-h-[2.5rem]">
            {product.name}
          </h3>
          <div className="flex items-center gap-0.5 sm:gap-1 mb-1 sm:mb-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={10}
                className={`sm:w-3 sm:h-3 ${i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
              />
            ))}
            <span className="text-[10px] sm:text-xs text-gray-400 mr-1">({product.reviews})</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center gap-0.5 sm:gap-2">
            <span className="font-bold text-xs sm:text-sm text-primary">{formatPrice(product.price)}</span>
            {product.originalPrice && (
              <span className="text-[10px] sm:text-xs text-gray-400 line-through">{formatPrice(product.originalPrice)}</span>
            )}
          </div>
        </div>
      </motion.div>
    </Link>
  )
}
