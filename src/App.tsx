import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import { useCartStore } from './store/cartStore';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  const { theme, setTheme } = useCartStore();
  const location = useLocation();

  useEffect(() => {
    // Apply theme on mount
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme, setTheme]);

  return (
    <div className="min-h-screen bg-rose-light dark:bg-rose-dark text-gray-800 dark:text-gray-200 transition-colors duration-300 overflow-x-hidden">
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            borderRadius: '12px',
            background: '#2a1a30',
            color: '#fdf2f8',
          },
        }}
      />
      <Navbar />
      <CartDrawer />
      <ScrollToTop />
      <main className="px-3 sm:px-4 md:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="py-4 sm:py-6 md:py-8">
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
            </Routes>
          </AnimatePresence>
        </div>
      </main>
      <Footer />
    </div>
  );
}
