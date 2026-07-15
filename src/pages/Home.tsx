import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowLeft, Truck, Shield, Headphones, CreditCard } from 'lucide-react'
import ProductCard from '../components/ProductCard'
import { products, categories } from '../data/products'

const features = [
  { icon: Truck, title: 'ارسال رایگان', desc: 'برای سفارش‌های بالای ۵۰۰ هزار تومان' },
  { icon: Shield, title: 'گارانتی اصالت', desc: 'تمام محصولات دارای گارانتی اصالت' },
  { icon: Headphones, title: 'پشتیبانی ۲۴ ساعته', desc: 'همیشه در خدمت شما هستیم' },
  { icon: CreditCard, title: 'پرداخت امن', desc: 'پرداخت از طریق درگاه‌های بانکی معتبر' },
]

export default function Home() {
  const featuredProducts = products.slice(0, 8)

  return (
    <div className="space-y-10 sm:space-y-12 md:space-y-16">
      {/* Developer Badge */}
      <div className="flex justify-center">
        <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-white dark:bg-gray-800 rounded-full border border-gray-200 dark:border-gray-700 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
          <span>ساخته شده توسط</span>
          <a href="https://github.com/M-Bazrafshan-viweb" target="_blank" rel="noopener noreferrer" className="text-primary font-bold hover:underline">
            مهشید بذرافشان
          </a>
          <span>✦</span>
        </div>
      </div>
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative overflow-hidden bg-gradient-to-br from-primary via-primary-600 to-accent rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-12 text-white"
      >
        <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/hero/1200/600')] bg-cover bg-center opacity-20" />
        <div className="relative z-10 max-w-2xl">
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 leading-tight"
          >
            جدیدترین مدهای فصل
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-sm sm:text-lg md:text-xl mb-4 sm:mb-6 text-white/90"
          >
            مجموعه جدید پاییزه با تخفیف‌های ویژه منتظر شماست
          </motion.p>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Link
              to="/products"
              className="inline-flex items-center gap-2 bg-white text-primary px-5 py-2.5 sm:px-6 sm:py-3 rounded-xl font-bold text-sm sm:text-base hover:bg-gray-100 transition-colors"
            >
              مشاهده محصولات
              <ArrowLeft size={18} className="sm:w-5 sm:h-5" />
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* Features */}
      <section className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-4">
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
            className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 text-center"
          >
            <div className="w-9 h-9 sm:w-12 sm:h-12 mx-auto mb-2 sm:mb-3 rounded-lg sm:rounded-xl bg-primary/10 flex items-center justify-center">
              <feature.icon size={18} className="sm:w-6 sm:h-6 text-primary" />
            </div>
            <h3 className="font-bold text-xs sm:text-sm mb-0.5 sm:mb-1">{feature.title}</h3>
            <p className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{feature.desc}</p>
          </motion.div>
        ))}
      </section>

      {/* Categories */}
      <section>
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <h2 className="text-lg sm:text-2xl font-bold">دسته‌بندی‌ها</h2>
          <Link to="/products" className="text-primary flex items-center gap-1 text-xs sm:text-sm hover:underline">
            مشاهده همه
            <ArrowLeft size={14} className="sm:w-4 sm:h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-2 sm:gap-3 md:gap-4">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: index * 0.05 }}
            >
              <Link
                to={`/products?category=${category.slug}`}
                className="flex flex-col items-center gap-1.5 sm:gap-2 p-2.5 sm:p-3 md:p-4 rounded-xl sm:rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 hover:border-primary hover:shadow-lg transition-all"
              >
                <span className="text-xl sm:text-2xl md:text-3xl">{category.icon}</span>
                <span className="text-[10px] sm:text-xs md:text-sm font-medium text-center leading-tight">{category.name}</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section>
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <h2 className="text-lg sm:text-2xl font-bold">محصولات ویژه</h2>
          <Link to="/products" className="text-primary flex items-center gap-1 text-xs sm:text-sm hover:underline">
            مشاهده همه
            <ArrowLeft size={14} className="sm:w-4 sm:h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-4 md:gap-6">
          {featuredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.05 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Banner */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-l from-accent to-primary p-5 sm:p-8 md:p-12 text-white"
      >
        <div className="relative z-10 text-center">
          <h2 className="text-lg sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4">عضو باشگاه مشتریان شوید!</h2>
          <p className="text-white/80 text-xs sm:text-sm md:text-base mb-4 sm:mb-6">با عضویت در باشگاه، از تخفیف‌های ویژه و اخبار جدید مطلع شوید</p>
          <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="ایمیل خود را وارد کنید"
              className="flex-1 px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button className="px-5 sm:px-6 py-2.5 sm:py-3 bg-white text-primary rounded-xl font-bold text-sm hover:bg-gray-100 transition-colors">
              عضویت
            </button>
          </div>
        </div>
      </motion.section>
    </div>
  )
}
