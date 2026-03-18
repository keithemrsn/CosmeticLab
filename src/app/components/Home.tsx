import { Link } from 'react-router';
import { motion } from 'motion/react';
import { ArrowRight, Sparkles, Heart, Star } from 'lucide-react';
import { products } from '../data/products';

export function Home() {
  const bestsellers = products.filter(p => p.bestseller).slice(0, 4);
  const newArrivals = products.filter(p => p.new).slice(0, 4);

  return (
    <div>
      <section className="relative h-[600px] bg-gradient-to-br from-pink-50 to-purple-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full mb-6"
            >
              <Sparkles className="w-4 h-4" />
              <span className="text-sm">New Spring Collection</span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-6"
              style={{ fontSize: '3.5rem', lineHeight: '1.1' }}
            >
              Discover Your Natural Beauty
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-muted-foreground mb-8 max-w-xl"
              style={{ fontSize: '1.125rem' }}
            >
              Premium makeup and skincare products crafted to enhance your unique beauty. Shop our curated collection of bestsellers and new arrivals.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex gap-4"
            >
              <Link
                to="/products"
                className="inline-flex items-center gap-2 bg-foreground text-background px-8 py-4 rounded-full hover:bg-foreground/90 transition-all"
              >
                Shop Now
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/products"
                className="inline-flex items-center gap-2 bg-white border border-border px-8 py-4 rounded-full hover:bg-accent transition-all"
              >
                Explore Collection
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="mb-4" style={{ fontSize: '2.5rem' }}>
              Bestsellers
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Shop our most-loved products, chosen by beauty enthusiasts worldwide
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {bestsellers.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  to={`/products/${product.id}`}
                  className="group block bg-white rounded-2xl overflow-hidden border border-border hover:shadow-lg transition-all duration-300"
                >
                  <div className="relative aspect-square overflow-hidden bg-secondary">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {product.bestseller && (
                      <div className="absolute top-3 right-3 bg-foreground text-background px-3 py-1 rounded-full text-xs flex items-center gap-1">
                        <Star className="w-3 h-3 fill-current" />
                        Bestseller
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <p className="text-xs text-muted-foreground mb-1">{product.brand}</p>
                    <h3 className="mb-2">{product.name}</h3>
                    <div className="flex items-center justify-between">
                      <span className="font-medium">${product.price.toFixed(2)}</span>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Star className="w-3 h-3 fill-current" />
                        {product.rating}
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 text-sm hover:gap-3 transition-all"
            >
              View All Products
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center p-8 bg-white rounded-2xl"
            >
              <div className="w-12 h-12 bg-foreground text-background rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-6 h-6" />
              </div>
              <h3 className="mb-2">Clean Beauty</h3>
              <p className="text-sm text-muted-foreground">
                Products made with natural, sustainable ingredients
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-center p-8 bg-white rounded-2xl"
            >
              <div className="w-12 h-12 bg-foreground text-background rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="mb-2">Expert Tested</h3>
              <p className="text-sm text-muted-foreground">
                Every product approved by beauty professionals
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-center p-8 bg-white rounded-2xl"
            >
              <div className="w-12 h-12 bg-foreground text-background rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-6 h-6" />
              </div>
              <h3 className="mb-2">Free Shipping</h3>
              <p className="text-sm text-muted-foreground">
                On all orders over $50, delivered to your door
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {newArrivals.length > 0 && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="mb-4" style={{ fontSize: '2.5rem' }}>
                New Arrivals
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Be the first to discover our latest beauty innovations
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {newArrivals.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    to={`/products/${product.id}`}
                    className="group block bg-white rounded-2xl overflow-hidden border border-border hover:shadow-lg transition-all duration-300"
                  >
                    <div className="relative aspect-square overflow-hidden bg-secondary">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      {product.new && (
                        <div className="absolute top-3 right-3 bg-foreground text-background px-3 py-1 rounded-full text-xs">
                          New
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <p className="text-xs text-muted-foreground mb-1">{product.brand}</p>
                      <h3 className="mb-2">{product.name}</h3>
                      <div className="flex items-center justify-between">
                        <span className="font-medium">${product.price.toFixed(2)}</span>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
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
        </section>
      )}
    </div>
  );
}
