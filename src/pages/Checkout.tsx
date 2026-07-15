import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { CreditCard, Truck, CheckCircle } from 'lucide-react'
import { useCartStore } from '../store/cartStore'
import toast from 'react-hot-toast'

export default function Checkout() {
  const { items, clearCart } = useCartStore()
  const [step, setStep] = useState(1)
  const [orderComplete, setOrderComplete] = useState(false)

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fa-IR').format(price) + ' تومان'
  }

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = subtotal > 500000 ? 0 : 50000
  const total = subtotal + shipping

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (step === 1) {
      setStep(2)
    } else {
      setOrderComplete(true)
      clearCart()
      toast.success('سفارش شما با موفقیت ثبت شد!')
    }
  }

  if (items.length === 0 && !orderComplete) {
    return (
      <div className="text-center py-12 sm:py-16 px-4">
        <p className="text-gray-500 mb-4 text-sm">سبد خرید شما خالی است</p>
        <Link to="/products" className="text-primary hover:underline text-sm">
          مشاهده محصولات
        </Link>
      </div>
    )
  }

  if (orderComplete) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-12 sm:py-16 px-4"
      >
        <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-5 sm:mb-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
          <CheckCircle size={36} className="sm:w-10 sm:h-10 text-green-500" />
        </div>
        <h2 className="text-xl sm:text-2xl font-bold mb-2">سفارش شما ثبت شد! 🎉</h2>
        <p className="text-gray-500 text-sm mb-5 sm:mb-6">سفارش شما با موفقیت ثبت شد و به زودی ارسال خواهد شد</p>
        <p className="text-xs sm:text-sm text-gray-400 mb-5 sm:mb-6">شماره سفارش: #{Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
        <Link
          to="/"
          className="inline-block bg-primary text-white px-5 py-2.5 sm:px-6 sm:py-3 rounded-xl font-bold text-sm hover:bg-primary-600 transition-colors"
        >
          بازگشت به خانه
        </Link>
      </motion.div>
    )
  }

  return (
    <div className="space-y-5 sm:space-y-6">
      <h1 className="text-lg sm:text-2xl font-bold">تسویه حساب</h1>

      {/* Progress Steps */}
      <div className="flex items-center justify-center gap-3 sm:gap-4 mb-6 sm:mb-8">
        <div className={`flex items-center gap-1.5 sm:gap-2 ${step >= 1 ? 'text-primary' : 'text-gray-400'}`}>
          <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs sm:text-sm ${step >= 1 ? 'bg-primary text-white' : 'bg-gray-200 dark:bg-gray-700'}`}>
            1
          </div>
          <span className="hidden sm:inline text-sm">اطلاعات ارسال</span>
        </div>
        <div className={`w-10 sm:w-16 h-0.5 ${step >= 2 ? 'bg-primary' : 'bg-gray-200 dark:bg-gray-700'}`} />
        <div className={`flex items-center gap-1.5 sm:gap-2 ${step >= 2 ? 'text-primary' : 'text-gray-400'}`}>
          <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs sm:text-sm ${step >= 2 ? 'bg-primary text-white' : 'bg-gray-200 dark:bg-gray-700'}`}>
            2
          </div>
          <span className="hidden sm:inline text-sm">پرداخت</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Form */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit}>
            {step === 1 ? (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl border border-gray-100 dark:border-gray-700 p-4 sm:p-6 space-y-3.5 sm:space-y-4"
              >
                <h2 className="text-base sm:text-lg font-bold flex items-center gap-2">
                  <Truck size={18} className="sm:w-5 sm:h-5 text-primary" />
                  اطلاعات ارسال
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label className="block text-xs sm:text-sm font-medium mb-1.5 sm:mb-2">نام</label>
                    <input
                      type="text"
                      required
                      className="w-full px-3 py-2.5 sm:px-4 sm:py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="نام خود را وارد کنید"
                    />
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm font-medium mb-1.5 sm:mb-2">نام خانوادگی</label>
                    <input
                      type="text"
                      required
                      className="w-full px-3 py-2.5 sm:px-4 sm:py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="نام خانوادگی خود را وارد کنید"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-medium mb-1.5 sm:mb-2">شماره موبایل</label>
                  <input
                    type="tel"
                    required
                    className="w-full px-3 py-2.5 sm:px-4 sm:py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="09121234567"
                    dir="ltr"
                  />
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-medium mb-1.5 sm:mb-2">آدرس</label>
                  <textarea
                    required
                    rows={3}
                    className="w-full px-3 py-2.5 sm:px-4 sm:py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                    placeholder="آدرس کامل خود را وارد کنید"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label className="block text-xs sm:text-sm font-medium mb-1.5 sm:mb-2">شهر</label>
                    <input
                      type="text"
                      required
                      className="w-full px-3 py-2.5 sm:px-4 sm:py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="تهران"
                    />
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm font-medium mb-1.5 sm:mb-2">کد پستی</label>
                    <input
                      type="text"
                      required
                      className="w-full px-3 py-2.5 sm:px-4 sm:py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="1234567890"
                      dir="ltr"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-primary to-accent text-white py-2.5 sm:py-3 rounded-xl font-bold text-sm hover:shadow-lg transition-shadow"
                >
                  ادامه به پرداخت
                </button>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl border border-gray-100 dark:border-gray-700 p-4 sm:p-6 space-y-3.5 sm:space-y-4"
              >
                <h2 className="text-base sm:text-lg font-bold flex items-center gap-2">
                  <CreditCard size={18} className="sm:w-5 sm:h-5 text-primary" />
                  اطلاعات پرداخت
                </h2>
                <div>
                  <label className="block text-xs sm:text-sm font-medium mb-1.5 sm:mb-2">شماره کارت</label>
                  <input
                    type="text"
                    required
                    className="w-full px-3 py-2.5 sm:px-4 sm:py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="1234 5678 9012 3456"
                    dir="ltr"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label className="block text-xs sm:text-sm font-medium mb-1.5 sm:mb-2">تاریخ انقضا</label>
                    <input
                      type="text"
                      required
                      className="w-full px-3 py-2.5 sm:px-4 sm:py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="MM/YY"
                      dir="ltr"
                    />
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm font-medium mb-1.5 sm:mb-2">CVV2</label>
                    <input
                      type="text"
                      required
                      className="w-full px-3 py-2.5 sm:px-4 sm:py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="123"
                      dir="ltr"
                    />
                  </div>
                </div>
                <div className="flex gap-2.5 sm:gap-3">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="flex-1 py-2.5 sm:py-3 rounded-xl border border-gray-200 dark:border-gray-700 text-sm hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    بازگشت
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-primary to-accent text-white py-2.5 sm:py-3 rounded-xl font-bold text-sm hover:shadow-lg transition-shadow"
                  >
                    پرداخت {formatPrice(total)}
                  </button>
                </div>
              </motion.div>
            )}
          </form>
        </div>

        {/* Order Summary */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:sticky lg:top-24 h-fit"
        >
          <div className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl border border-gray-100 dark:border-gray-700 p-4 sm:p-6 space-y-3 sm:space-y-4">
            <h2 className="text-base sm:text-lg font-bold">خلاصه سفارش</h2>
            <div className="space-y-2.5 sm:space-y-3 max-h-48 sm:max-h-60 overflow-y-auto">
              {items.map((item) => (
                <div key={item.id} className="flex gap-2.5 sm:gap-3">
                  <img src={item.image} alt={item.name} className="w-9 h-12 sm:w-12 sm:h-16 object-cover rounded-lg" />
                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] sm:text-sm font-medium line-clamp-1">{item.name}</p>
                    <p className="text-[10px] sm:text-xs text-gray-500">تعداد: {item.quantity}</p>
                  </div>
                  <p className="text-[11px] sm:text-sm font-bold whitespace-nowrap">{formatPrice(item.price * item.quantity)}</p>
                </div>
              ))}
            </div>
            <div className="border-t border-gray-200 dark:border-gray-700 pt-2.5 sm:pt-3 space-y-1.5 sm:space-y-2">
              <div className="flex justify-between text-xs sm:text-sm">
                <span className="text-gray-500">جمع سبد</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-xs sm:text-sm">
                <span className="text-gray-500">ارسال</span>
                <span className={shipping === 0 ? 'text-green-500 font-bold' : ''}>
                  {shipping === 0 ? 'رایگان' : formatPrice(shipping)}
                </span>
              </div>
              <div className="flex justify-between font-bold text-sm sm:text-lg border-t border-gray-200 dark:border-gray-700 pt-2.5 sm:pt-3">
                <span>مبلغ نهایی</span>
                <span className="text-primary">{formatPrice(total)}</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
