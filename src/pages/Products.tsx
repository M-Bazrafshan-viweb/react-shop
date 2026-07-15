import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { SlidersHorizontal, ChevronDown, X } from 'lucide-react'
import ProductCard from '../components/ProductCard'
import { products, categories } from '../data/products'
import type { SortOption } from '../types'

const sortOptions: SortOption[] = [
  { value: 'newest', label: 'جدیدترین' },
  { value: 'price-asc', label: 'ارزان‌ترین' },
  { value: 'price-desc', label: 'گران‌ترین' },
  { value: 'popular', label: 'محبوب‌ترین' },
]

export default function Products() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [sortOption, setSortOption] = useState<string>('newest')
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000000])
  const [filtersOpen, setFiltersOpen] = useState(false)

  const filteredProducts = useMemo(() => {
    let result = [...products]

    if (selectedCategory) {
      result = result.filter((p) => p.category === selectedCategory)
    }

    result = result.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1])

    switch (sortOption) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        result.sort((a, b) => b.price - a.price)
        break
      case 'popular':
        result.sort((a, b) => b.reviews - a.reviews)
        break
      default:
        break
    }

    return result
  }, [selectedCategory, sortOption, priceRange])

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fa-IR').format(price) + ' تومان'
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold">محصولات</h1>
          <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm">{filteredProducts.length} محصول یافت شد</p>
        </div>
        <div className="flex items-center gap-2.5 sm:gap-3">
          <button
            onClick={() => setFiltersOpen(!filtersOpen)}
            className="lg:hidden flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl border border-gray-200 dark:border-gray-700 text-xs sm:text-sm hover:bg-gray-50 dark:hover:bg-gray-800"
          >
            <SlidersHorizontal size={16} className="sm:w-[18px] sm:h-[18px]" />
            فیلترها
          </button>
          <div className="relative">
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="appearance-none px-3 py-1.5 sm:px-4 sm:py-2 pr-7 sm:pr-8 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <ChevronDown size={14} className="absolute left-2.5 sm:left-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400" />
          </div>
        </div>
      </div>

      <div className="flex gap-4 sm:gap-6">
        {/* Sidebar Filters */}
        <aside className={`${filtersOpen ? 'fixed inset-0 z-50 bg-black/50 lg:relative lg:bg-transparent' : 'hidden lg:block'} lg:w-64 flex-shrink-0`}>
          <div className={`${filtersOpen ? 'absolute left-0 top-0 h-full w-72 sm:w-80 bg-white dark:bg-gray-900 p-5 sm:p-6 overflow-y-auto' : ''} lg:relative lg:bg-transparent lg:p-0`}>
            {filtersOpen && (
              <div className="flex items-center justify-between mb-5 sm:mb-6 lg:hidden">
                <h3 className="text-base sm:text-lg font-bold">فیلترها</h3>
                <button onClick={() => setFiltersOpen(false)} className="p-1">
                  <X size={22} className="sm:w-6 sm:h-6" />
                </button>
              </div>
            )}

            {/* Categories */}
            <div className="mb-5 sm:mb-6">
              <h3 className="font-bold mb-2.5 sm:mb-3 text-sm">دسته‌بندی</h3>
              <div className="space-y-1.5 sm:space-y-2">
                <button
                  onClick={() => setSelectedCategory(null)}
                  className={`w-full text-right px-3 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm transition-all ${
                    !selectedCategory
                      ? 'bg-primary text-white'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  همه محصولات
                </button>
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.slug)}
                    className={`w-full text-right px-3 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm transition-all flex items-center gap-1.5 sm:gap-2 ${
                      selectedCategory === category.slug
                        ? 'bg-primary text-white'
                        : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                  >
                    <span>{category.icon}</span>
                    <span className="truncate">{category.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div className="mb-5 sm:mb-6">
              <h3 className="font-bold mb-2.5 sm:mb-3 text-sm">محدوده قیمت</h3>
              <div className="space-y-2.5 sm:space-y-3">
                <div className="flex items-center justify-between text-[10px] sm:text-xs md:text-sm">
                  <span className="truncate">{formatPrice(priceRange[0])}</span>
                  <span className="truncate">{formatPrice(priceRange[1])}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="5000000"
                  step="100000"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                  className="w-full accent-primary"
                />
              </div>
            </div>
          </div>
        </aside>

        {/* Products Grid */}
        <div className="flex-1 min-w-0">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-10 sm:py-12">
              <p className="text-gray-500 dark:text-gray-400 text-sm">محصولی یافت نشد</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-4 md:gap-6">
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
