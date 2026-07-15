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
      <div className="text-center py-12">
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
    <div className="space-y-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-500">
        <Link to="/" className="hover:text-primary">خانه</Link>
        <ChevronLeft size={14} />
        <Link to="/products" className="hover:text-primary">محصولات</Link>
        <ChevronLeft size={14} />
        <span className="text-gray-900 dark:text-white">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
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
          className="space-y-6"
        >
          <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-2">{product.name}</h1>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
                  />
                ))}
                <span className="text-sm text-gray-500 mr-2">({product.reviews} نظر)</span>
              </div>
            </div>
          </div>

          {/* Price */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            <span className="text-2xl sm:text-3xl font-bold text-primary">{formatPrice(product.price)}</span>
            {product.originalPrice && (
              <>
                <span className="text-base sm:text-lg text-gray-400 line-through">{formatPrice(product.originalPrice)}</span>
                <span className="px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-full text-sm font-bold">
                  {discount}% تخفیف
                </span>
              </>
            )}
          </div>

          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{product.description}</p>

          {/* Colors */}
          {product.colors.length > 0 && (
            <div>
              <h3 className="font-bold mb-2 sm:mb-3 text-sm sm:text-base">رنگ: {product.colors[selectedColor]}</h3>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((color, index) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(index)}
                    className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg border-2 text-xs sm:text-sm transition-all ${
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
              <h3 className="font-bold mb-2 sm:mb-3 text-sm sm:text-base">سایز: {product.sizes[selectedSize]}</h3>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size, index) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(index)}
                    className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg border-2 text-xs sm:text-sm transition-all font-medium ${
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
            <h3 className="font-bold mb-2 sm:mb-3 text-sm sm:text-base">تعداد</h3>
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="flex items-center border border-gray-200 dark:border-gray-700 rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-1.5 sm:px-4 sm:py-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-r-lg text-sm sm:text-base"
                >
                  -
                </button>
                <span className="px-3 py-1.5 sm:px-4 sm:py-2 font-medium min-w-[40px] sm:min-w-[50px] text-center text-sm sm:text-base">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-1.5 sm:px-4 sm:py-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-l-lg text-sm sm:text-base"
                >
                  +
                </button>
              </div>
              <span className="text-gray-500 text-xs sm:text-sm">
                {formatPrice(product.price * quantity)}
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2 sm:gap-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleAddToCart}
              className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-accent text-white py-3 sm:py-4 rounded-xl font-bold text-sm sm:text-lg hover:shadow-lg transition-shadow"
            >
              <ShoppingCart size={18} className="sm:w-5 sm:h-5" />
              افزودن به سبد خرید
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-3 sm:p-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              <Heart size={18} className="sm:w-5 sm:h-5" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-3 sm:p-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              <Share2 size={18} className="sm:w-5 sm:h-5" />
            </motion.button>
          </div>

          {/* Features */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-2 text-xs sm:text-sm">
              <Truck size={16} className="text-primary" />
              <span>ارسال رایگان</span>
            </div>
            <div className="flex items-center gap-2 text-xs sm:text-sm">
              <Shield size={16} className="text-primary" />
              <span>گارانتی اصالت</span>
            </div>
            <div className="flex items-center gap-2 text-xs sm:text-sm">
              <Check size={16} className="text-primary" />
              <span>امکان پرداخت درب منزل</span>
            </div>
            <div className="flex items-center gap-2 text-xs sm:text-sm">
              <Check size={16} className="text-primary" />
              <span>امکان مرجوعی</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
