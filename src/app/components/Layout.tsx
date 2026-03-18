import { Outlet, Link, useLocation } from 'react-router';
import { ShoppingBag, User, Search, Menu, X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Logo } from './Logo';

export function Layout() {
  const { cartCount } = useCart();
  const { isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigation = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products' },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="sticky top-0 z-50 border-b border-border bg-[#fbf6f2]/85 backdrop-blur-lg">
        <div className="border-b border-border/60 bg-white/35">
          <p className="ui-kicker max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 text-center">
            Free shipping on all orders over $50
          </p>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-18 min-h-[4.5rem]">
            <div className="flex items-center gap-8">
              <Link to="/" className="flex items-center">
                <Logo />
              </Link>

              <nav className="hidden md:flex gap-6">
                {navigation.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`relative py-1 text-sm tracking-[0.06em] uppercase transition-colors ${
                      location.pathname === item.path
                        ? 'text-foreground'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {item.name}
                    {location.pathname === item.path && (
                      <motion.div
                        layoutId="underline"
                        className="absolute -bottom-1 left-0 right-0 h-px bg-foreground"
                      />
                    )}
                  </Link>
                ))}
              </nav>
            </div>

            <div className="flex items-center gap-4">
              <button className="p-2 hover:bg-white/80 rounded-full transition-colors">
                <Search className="w-5 h-5" />
              </button>

              {isAuthenticated ? (
                <div className="hidden md:flex items-center gap-2">
                  <Link
                    to="/account"
                    className="flex items-center gap-2 p-2 hover:bg-white/80 rounded-full transition-colors"
                  >
                    <User className="w-5 h-5" />
                  </Link>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="ui-kicker hidden md:block hover:text-foreground transition-colors"
                >
                  Sign In
                </Link>
              )}

              <Link to="/cart" className="relative p-2 hover:bg-white/80 rounded-full transition-colors">
                <ShoppingBag className="w-5 h-5" />
                {cartCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs w-5 h-5 rounded-full flex items-center justify-center"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </Link>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 hover:bg-white/80 rounded-full transition-colors"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-border overflow-hidden bg-[#fbf6f2]"
            >
              <div className="px-4 py-4 space-y-2">
                {navigation.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className="ui-kicker block py-2 hover:text-foreground transition-colors"
                  >
                    {item.name}
                  </Link>
                ))}
                {!isAuthenticated && (
                  <Link
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="ui-kicker block py-2 hover:text-foreground transition-colors"
                  >
                    Sign In
                  </Link>
                )}
                {isAuthenticated && (
                  <>
                    <Link
                      to="/account"
                      onClick={() => setMobileMenuOpen(false)}
                      className="ui-kicker block py-2 hover:text-foreground transition-colors"
                    >
                      My Account
                    </Link>
                    <button
                      onClick={() => {
                        logout();
                        setMobileMenuOpen(false);
                      }}
                      className="ui-kicker block py-2 hover:text-foreground transition-colors w-full text-left"
                    >
                      Sign Out
                    </button>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>

      <footer className="bg-secondary/65 border-t border-border mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-6 border-b border-border pb-8">
            <div>
              <p className="ui-kicker mb-3">CosmeticLab</p>
              <h2 className="text-4xl md:text-5xl leading-none">Quiet luxury, daily wear.</h2>
            </div>
            <p className="text-sm text-muted-foreground max-w-md">
              Purposeful formulas, inclusive shades, and a minimalist beauty ritual designed for real life.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="ui-kicker mb-4">About</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Our Story</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Sustainability</a></li>
              </ul>
            </div>
            <div>
              <h3 className="ui-kicker mb-4">Help</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Shipping</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Returns</a></li>
              </ul>
            </div>
            <div>
              <h3 className="ui-kicker mb-4">Services</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Beauty Consultation</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Rewards Program</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Gift Cards</a></li>
              </ul>
            </div>
            <div>
              <h3 className="ui-kicker mb-4">Follow Us</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Instagram</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">TikTok</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">YouTube</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
            <p>&copy; 2026 CosmeticLab. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
