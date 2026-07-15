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
    <div className="space-y-16">
      {/* Developer Badge */}
      <div className="flex justify-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 rounded-full border border-gray-200 dark:border-gray-700 text-sm text-gray-500 dark:text-gray-400">
          <span>ساخته شده توسط</span>
          <a href="https://github.com/M-Bazrafshan-viweb" target="_blank" rel="noopener noreferrer" className="text-primary font-bold hover:underline">
            Mahshid Bazrafshan
          </a>
          <span>✦</span>
        </div>
      </div>
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative overflow-hidden bg-gradient-to-br from-primary via-primary-600 to-accent rounded-3xl p-8 md:p-12 text-white"
      >
        <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/hero/1200/600')] bg-cover bg-center opacity-20" />
        <div className="relative z-10 max-w-2xl">
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-3xl md:text-5xl font-bold mb-4"
          >
            جدیدترین مدهای فصل
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-lg md:text-xl mb-6 text-white/90"
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
              className="inline-flex items-center gap-2 bg-white text-primary px-6 py-3 rounded-xl font-bold hover:bg-gray-100 transition-colors"
            >
              مشاهده محصولات
              <ArrowLeft size={20} />
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* Features */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
            className="p-4 rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 text-center"
          >
            <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-primary/10 flex items-center justify-center">
              <feature.icon size={24} className="text-primary" />
            </div>
            <h3 className="font-bold text-sm mb-1">{feature.title}</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">{feature.desc}</p>
          </motion.div>
        ))}
      </section>

      {/* Categories */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">دسته‌بندی‌ها</h2>
          <Link to="/products" className="text-primary flex items-center gap-1 hover:underline">
            مشاهده همه
            <ArrowLeft size={16} />
          </Link>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-4">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: index * 0.05 }}
            >
              <Link
                to={`/products?category=${category.slug}`}
                className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 hover:border-primary hover:shadow-lg transition-all"
              >
                <span className="text-3xl">{category.icon}</span>
                <span className="text-sm font-medium">{category.name}</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">محصولات ویژه</h2>
          <Link to="/products" className="text-primary flex items-center gap-1 hover:underline">
            مشاهده همه
            <ArrowLeft size={16} />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
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
        className="relative overflow-hidden rounded-3xl bg-gradient-to-l from-accent to-primary p-8 md:p-12 text-white"
      >
        <div className="relative z-10 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">عضو باشگاه مشتریان شوید!</h2>
          <p className="text-white/80 mb-6">با عضویت در باشگاه، از تخفیف‌های ویژه و اخبار جدید مطلع شوید</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="ایمیل خود را وارد کنید"
              className="flex-1 px-4 py-3 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button className="px-6 py-3 bg-white text-primary rounded-xl font-bold hover:bg-gray-100 transition-colors">
              عضویت
            </button>
          </div>
        </div>
      </motion.section>
    </div>
  )
}
