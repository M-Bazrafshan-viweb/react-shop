import { motion } from 'framer-motion'
import type { Category } from '../types'

interface CategorySidebarProps {
  categories: Category[]
  selectedCategory: string | null
  onSelectCategory: (slug: string | null) => void
}

export default function CategorySidebar({ categories, selectedCategory, onSelectCategory }: CategorySidebarProps) {
  return (
    <div className="space-y-2">
      <h3 className="font-bold mb-3">دسته‌بندی</h3>
      <motion.button
        whileHover={{ x: 4 }}
        onClick={() => onSelectCategory(null)}
        className={`w-full text-right px-3 py-2 rounded-lg transition-all ${
          !selectedCategory
            ? 'bg-primary text-white'
            : 'hover:bg-gray-100 dark:hover:bg-gray-800'
        }`}
      >
        همه محصولات
      </motion.button>
      {categories.map((category) => (
        <motion.button
          key={category.id}
          whileHover={{ x: 4 }}
          onClick={() => onSelectCategory(category.slug)}
          className={`w-full text-right px-3 py-2 rounded-lg transition-all flex items-center gap-2 ${
            selectedCategory === category.slug
              ? 'bg-primary text-white'
              : 'hover:bg-gray-100 dark:hover:bg-gray-800'
          }`}
        >
          <span>{category.icon}</span>
          <span>{category.name}</span>
        </motion.button>
      ))}
    </div>
  )
}
