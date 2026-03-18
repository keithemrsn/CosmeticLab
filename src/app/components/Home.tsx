import { Link } from 'react-router';
import { motion } from 'motion/react';
import { ArrowRight, Sparkles, Heart, Star } from 'lucide-react';
import { useState, useEffect } from 'react';
import { products } from '../data/products';

const heroSlides = [
  {
    title: 'New Spring Collection',
    subtitle: 'Discover your perfect shade',
    description: 'Fresh, vibrant colors for the new season',
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=1200&h=600&fit=crop',
    cta: 'Shop Now',
  },
  {
    title: 'Luxury Skincare',
    subtitle: 'Science meets beauty',
    description: 'Premium formulas for radiant skin',
    image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=1200&h=600&fit=crop',
    cta: 'Explore',
  },
  {
    title: 'Limited Edition',
    subtitle: 'Exclusive makeup sets',
    description: 'Only while supplies last',
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=1200&h=600&fit=crop',
    cta: 'Get Yours',
  },
];

const categories = [
  {
    name: 'Lipstick',
    image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400&h=400&fit=crop',
    count: '120+ shades',
  },
  {
    name: 'Foundation',
    image: 'https://images.unsplash.com/photo-1631214524020-7e18db2a8f39?w=400&h=400&fit=crop',
    count: '85+ shades',
  },
  {
    name: 'Eyeshadow',
    image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=400&h=400&fit=crop',
    count: '200+ colors',
  },
  {
    name: 'Skincare',
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&h=400&fit=crop',
    count: '50+ products',
  },
];

export function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const bestsellers = products.filter(p => p.bestseller).slice(0, 6);
  const newArrivals = products.filter(p => p.new).slice(0, 6);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Carousel */}
      <div className="relative h-[70vh] overflow-hidden bg-secondary">
        {heroSlides.map((slide, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{
              opacity: currentSlide === index ? 1 : 0,
              scale: currentSlide === index ? 1 : 1.1,
            }}
            transition={{ duration: 0.7 }}
            className="absolute inset-0"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent z-10" />
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 z-20 flex items-center">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={{
                    opacity: currentSlide === index ? 1 : 0,
                    y: currentSlide === index ? 0 : 40,
                  }}
                  transition={{ delay: 0.2, duration: 0.7 }}
                  className="max-w-2xl"
                >
                  <p className="text-white/90 mb-2 flex items-center gap-2">
                    <Sparkles className="w-4 h-4" />
                    {slide.subtitle}
                  </p>
                  <h2 className="text-white mb-4" style={{ fontSize: '4rem', lineHeight: '1.1' }}>
                    {slide.title}
                  </h2>
                  <p className="text-white/80 text-xl mb-8">{slide.description}</p>
                  <Link
                    to="/products"
                    className="inline-flex items-center gap-2 bg-white text-foreground px-8 py-4 rounded-full hover:bg-white/90 transition-all"
                  >
                    {slide.cta}
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.div>
        ))}

        {/* Carousel Indicators */}
        <div className="absolute bottom-8 left-0 right-0 z-30 flex justify-center gap-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-1 rounded-full transition-all ${
                currentSlide === index ? 'w-8 bg-white' : 'w-4 bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Categories Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="mb-4" style={{ fontSize: '3rem' }}>
            Shop by Category
          </h2>
          <p className="text-muted-foreground text-lg">Explore our complete collection</p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                to="/products"
                className="group block relative aspect-square rounded-2xl overflow-hidden"
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
                  <h3 className="text-white mb-1">{category.name}</h3>
                  <p className="text-white/80 text-sm">{category.count}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bestsellers */}
      <div className="bg-secondary py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-between mb-12"
          >
            <div>
              <h2 className="mb-2 flex items-center gap-3" style={{ fontSize: '3rem' }}>
                <Star className="w-10 h-10 fill-current" />
                Bestsellers
              </h2>
              <p className="text-muted-foreground text-lg">Customer favorites</p>
            </div>
            <Link
              to="/products"
              className="hidden md:flex items-center gap-2 text-sm hover:gap-3 transition-all"
            >
              View All
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {bestsellers.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <Link
                  to={`/products/${product.id}`}
                  className="group block bg-white rounded-2xl overflow-hidden border border-border hover:shadow-lg transition-all"
                >
                  <div className="relative aspect-square overflow-hidden bg-secondary">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-4">
                    <p className="text-xs text-muted-foreground mb-1">{product.brand}</p>
                    <h4 className="text-sm mb-2 truncate">{product.name}</h4>
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-sm">${product.price}</span>
                      <div className="flex items-center gap-1 text-xs">
                        <Star className="w-3 h-3 fill-current" />
                        {product.rating}
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* New Arrivals */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="mb-2 flex items-center justify-center gap-3" style={{ fontSize: '3rem' }}>
            <Sparkles className="w-10 h-10" />
            New Arrivals
          </h2>
          <p className="text-muted-foreground text-lg">Just landed</p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {newArrivals.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -5 }}
            >
              <Link
                to={`/products/${product.id}`}
                className="group block bg-white rounded-2xl overflow-hidden border border-border hover:shadow-lg transition-all"
              >
                <div className="relative aspect-square overflow-hidden bg-secondary">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3 bg-foreground text-background px-3 py-1 rounded-full text-xs">
                    New
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-xs text-muted-foreground mb-1">{product.brand}</p>
                  <h4 className="text-sm mb-2 truncate">{product.name}</h4>
                  <span className="font-medium text-sm">${product.price}</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA Banner */}
      <div className="bg-secondary border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto"
          >
            <Heart className="w-12 h-12 mx-auto mb-6 text-muted-foreground" />
            <h2 className="mb-4" style={{ fontSize: '3rem' }}>
              Join CosmeticLab Rewards
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Get exclusive access to new products, special offers, and earn points with every purchase
            </p>
            <Link
              to="/signup"
              className="inline-flex items-center gap-2 bg-foreground text-background px-8 py-4 rounded-full hover:bg-foreground/90 transition-all"
            >
              Sign Up Free
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
