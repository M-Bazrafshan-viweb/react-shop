import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ShoppingCart, Heart, Share2, Star, ChevronLeft, Truck, Shield, Check } from 'lucide-react'
import { products } from '../data/products'
import { useCartStore } from '../store/cartStore'
import toast from 'react-hot-toast'
import ImageGallery from '../components/ImageGallery'

export default function ProductDetail() {
  const { id } = useParams()
  const product = products.find((p) => p.id === id)
  const { addItem } = useCartStore()
  const [selectedColor, setSelectedColor] = useState(0)
  const [selectedSize, setSelectedSize] = useState(0)
  const [quantity, setQuantity] = useState(1)

  if (!product) {
    return (
      <div className="text-center py-12 px-4">
        <p className="text-gray-500">محصول یافت نشد</p>
        <Link to="/products" className="text-primary hover:underline mt-4 inline-block">
          بازگشت به محصولات
        </Link>
      </div>
    )
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(product)
    }
    toast.success('محصول به سبد خرید اضافه شد!')
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fa-IR').format(price) + ' تومان'
  }

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-sm text-gray-500 overflow-x-auto whitespace-nowrap pb-1">
        <Link to="/" className="hover:text-primary">خانه</Link>
        <ChevronLeft size={12} className="sm:w-3.5 sm:h-3.5 flex-shrink-0" />
        <Link to="/products" className="hover:text-primary">محصولات</Link>
        <ChevronLeft size={12} className="sm:w-3.5 sm:h-3.5 flex-shrink-0" />
        <span className="text-gray-900 dark:text-white truncate max-w-[120px] sm:max-w-none">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6 md:gap-8">
        {/* Image Gallery */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <ImageGallery images={product.images} />
        </motion.div>

        {/* Product Info */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-4 sm:space-y-5 md:space-y-6"
        >
          <div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-1.5 sm:mb-2 leading-snug">{product.name}</h1>
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="flex items-center gap-0.5 sm:gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    className={`sm:w-4 sm:h-4 ${i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                  />
                ))}
                <span className="text-[11px] sm:text-sm text-gray-500 mr-1 sm:mr-2">({product.reviews} نظر)</span>
              </div>
            </div>
          </div>

          {/* Price */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 md:gap-4">
            <span className="text-xl sm:text-2xl md:text-3xl font-bold text-primary">{formatPrice(product.price)}</span>
            {product.originalPrice && (
              <>
                <span className="text-sm sm:text-base md:text-lg text-gray-400 line-through">{formatPrice(product.originalPrice)}</span>
                <span className="px-2 py-0.5 sm:px-3 sm:py-1 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-full text-xs sm:text-sm font-bold">
                  {discount}% تخفیف
                </span>
              </>
            )}
          </div>

          <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-xs sm:text-sm md:text-base">{product.description}</p>

          {/* Colors */}
          {product.colors.length > 0 && (
            <div>
              <h3 className="font-bold mb-2 sm:mb-2.5 text-xs sm:text-sm md:text-base">رنگ: {product.colors[selectedColor]}</h3>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {product.colors.map((color, index) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(index)}
                    className={`px-2.5 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2 rounded-lg border-2 text-[11px] sm:text-xs md:text-sm transition-all ${
                      selectedColor === index
                        ? 'border-primary bg-primary/10 text-primary'
                        : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Sizes */}
          {product.sizes.length > 0 && product.sizes[0] !== 'تک سایز' && (
            <div>
              <h3 className="font-bold mb-2 sm:mb-2.5 text-xs sm:text-sm md:text-base">سایز: {product.sizes[selectedSize]}</h3>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {product.sizes.map((size, index) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(index)}
                    className={`w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-lg border-2 text-[10px] sm:text-xs md:text-sm transition-all font-medium ${
                      selectedSize === index
                        ? 'border-primary bg-primary text-white'
                        : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity */}
          <div>
            <h3 className="font-bold mb-2 sm:mb-2.5 text-xs sm:text-sm md:text-base">تعداد</h3>
            <div className="flex items-center gap-2.5 sm:gap-3 md:gap-4">
              <div className="flex items-center border border-gray-200 dark:border-gray-700 rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-2.5 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-r-lg text-xs sm:text-sm md:text-base"
                >
                  -
                </button>
                <span className="px-2.5 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2 font-medium min-w-[32px] sm:min-w-[40px] md:min-w-[50px] text-center text-xs sm:text-sm md:text-base">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-2.5 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-l-lg text-xs sm:text-sm md:text-base"
                >
                  +
                </button>
              </div>
              <span className="text-gray-500 text-[10px] sm:text-xs md:text-sm">
                {formatPrice(product.price * quantity)}
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2 sm:gap-2.5 md:gap-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleAddToCart}
              className="flex-1 flex items-center justify-center gap-1.5 sm:gap-2 bg-gradient-to-r from-primary to-accent text-white py-2.5 sm:py-3 md:py-4 rounded-xl font-bold text-xs sm:text-sm md:text-lg hover:shadow-lg transition-shadow"
            >
              <ShoppingCart size={16} className="sm:w-4 sm:h-4 md:w-5 md:h-5" />
              <span className="hidden xs:inline sm:inline">افزودن به سبد خرید</span>
              <span className="xs:hidden sm:hidden">افزودن</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2.5 sm:p-3 md:p-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              <Heart size={16} className="sm:w-4 sm:h-4 md:w-5 md:h-5" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2.5 sm:p-3 md:p-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              <Share2 size={16} className="sm:w-4 sm:h-4 md:w-5 md:h-5" />
            </motion.button>
          </div>

          {/* Features */}
          <div className="grid grid-cols-2 gap-2 sm:gap-3 md:gap-4 pt-3 sm:pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs md:text-sm">
              <Truck size={14} className="sm:w-4 sm:h-4 text-primary flex-shrink-0" />
              <span>ارسال رایگان</span>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs md:text-sm">
              <Shield size={14} className="sm:w-4 sm:h-4 text-primary flex-shrink-0" />
              <span>گارانتی اصالت</span>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs md:text-sm">
              <Check size={14} className="sm:w-4 sm:h-4 text-primary flex-shrink-0" />
              <span>امکان پرداخت درب منزل</span>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs md:text-sm">
              <Check size={14} className="sm:w-4 sm:h-4 text-primary flex-shrink-0" />
              <span>امکان مرجوعی</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
