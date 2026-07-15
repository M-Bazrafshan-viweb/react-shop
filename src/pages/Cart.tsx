import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft } from 'lucide-react'
import { useCartStore } from '../store/cartStore'

export default function Cart() {
  const { items, removeItem, updateQuantity, clearCart } = useCartStore()

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fa-IR').format(price) + ' تومان'
  }

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = subtotal > 500000 ? 0 : 50000
  const total = subtotal + shipping

  if (items.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-12 sm:py-16 px-4"
      >
        <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-4 sm:mb-6 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
          <ShoppingBag size={40} className="sm:w-12 sm:h-12 text-gray-400" />
        </div>
        <h2 className="text-xl sm:text-2xl font-bold mb-2">سبد خرید شما خالی است</h2>
        <p className="text-gray-500 text-sm mb-5 sm:mb-6">محصولات مورد علاقه خود را به سبد اضافه کنید</p>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 bg-primary text-white px-5 py-2.5 sm:px-6 sm:py-3 rounded-xl font-bold text-sm hover:bg-primary-600 transition-colors"
        >
          مشاهده محصولات
          <ArrowLeft size={16} className="sm:w-4.5 sm:h-4.5" />
        </Link>
      </motion.div>
    )
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-lg sm:text-2xl font-bold">سبد خرید ({items.length} محصول)</h1>
        <button
          onClick={clearCart}
          className="text-red-500 hover:text-red-600 text-xs sm:text-sm font-medium"
        >
          خالی کردن سبد
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-3 sm:space-y-4">
          {items.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex gap-3 sm:gap-4 p-3 sm:p-4 bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl border border-gray-100 dark:border-gray-700"
            >
              <Link to={`/product/${item.id}`} className="flex-shrink-0">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-20 sm:w-20 sm:h-28 md:w-24 md:h-32 object-cover rounded-lg sm:rounded-xl"
                />
              </Link>
              <div className="flex-1 min-w-0">
                <Link
                  to={`/product/${item.id}`}
                  className="font-bold text-xs sm:text-sm hover:text-primary transition-colors line-clamp-1"
                >
                  {item.name}
                </Link>
                <p className="text-primary font-bold text-xs sm:text-sm mt-0.5 sm:mt-1">{formatPrice(item.price)}</p>
                <div className="flex items-center gap-3 sm:gap-4 mt-2 sm:mt-3">
                  <div className="flex items-center border border-gray-200 dark:border-gray-700 rounded-lg">
                    <button
                      onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                      className="p-1.5 sm:p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-r-lg"
                    >
                      <Minus size={12} className="sm:w-3.5 sm:h-3.5" />
                    </button>
                    <span className="px-2 sm:px-3 py-0.5 sm:py-1 font-medium text-xs sm:text-sm">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-1.5 sm:p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-l-lg"
                    >
                      <Plus size={12} className="sm:w-3.5 sm:h-3.5" />
                    </button>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="p-1.5 sm:p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg"
                  >
                    <Trash2 size={14} className="sm:w-4 sm:h-4" />
                  </button>
                </div>
              </div>
              <div className="text-left flex-shrink-0">
                <p className="font-bold text-xs sm:text-sm whitespace-nowrap">{formatPrice(item.price * item.quantity)}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Order Summary */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:sticky lg:top-24 h-fit"
        >
          <div className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl border border-gray-100 dark:border-gray-700 p-4 sm:p-6 space-y-3 sm:space-y-4">
            <h2 className="text-base sm:text-lg font-bold">خلاصه سفارش</h2>
            <div className="space-y-2.5 sm:space-y-3">
              <div className="flex justify-between text-xs sm:text-sm">
                <span className="text-gray-500">جمع سبد خرید</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-xs sm:text-sm">
                <span className="text-gray-500">هزینه ارسال</span>
                <span className={shipping === 0 ? 'text-green-500 font-bold' : ''}>
                  {shipping === 0 ? 'رایگان' : formatPrice(shipping)}
                </span>
              </div>
              {shipping > 0 && (
                <p className="text-[10px] sm:text-xs text-gray-400">
                  برای ارسال رایگان {formatPrice(500000 - subtotal)} دیگر خرید کنید
                </p>
              )}
              <div className="border-t border-gray-200 dark:border-gray-700 pt-2.5 sm:pt-3">
                <div className="flex justify-between font-bold text-sm sm:text-lg">
                  <span>مبلغ قابل پرداخت</span>
                  <span className="text-primary">{formatPrice(total)}</span>
                </div>
              </div>
            </div>
            <Link
              to="/checkout"
              className="block w-full bg-gradient-to-r from-primary to-accent text-white text-center py-2.5 sm:py-3 rounded-xl font-bold text-sm hover:shadow-lg transition-shadow"
            >
              تکمیل خرید
            </Link>
            <Link
              to="/products"
              className="block w-full text-center py-2.5 sm:py-3 rounded-xl border border-gray-200 dark:border-gray-700 text-sm hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              ادامه خرید
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
