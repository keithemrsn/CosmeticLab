import { Link } from 'react-router';
import { motion } from 'motion/react';
import { ArrowRight, Sparkles, Heart, Star } from 'lucide-react';
import { products } from '../data/products';

const categories = [
  'Face',
  'Eyes',
  'Lips',
  'Skincare',
  'Tools',
];

export function Home() {
  const bestsellers = products.filter((p) => p.bestseller).slice(0, 4);
  const newArrivals = products.filter((p) => p.new).slice(0, 4);

  return (
    <div className="min-h-screen bg-background">
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute -top-28 left-[-6rem] h-72 w-72 rounded-full bg-[#dec9b8]/40 blur-3xl" />
        <div className="absolute bottom-[-8rem] right-[-4rem] h-80 w-80 rounded-full bg-[#d7b59a]/30 blur-3xl" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-20">
          <div className="grid gap-10 md:grid-cols-2 md:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <p className="ui-kicker inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/70 border border-border">
                <Sparkles className="w-3.5 h-3.5" />
                Minimal Ritual Beauty
              </p>
              <h1 className="mt-6 text-5xl md:text-7xl leading-[0.95] text-foreground">
                Makeup for
                <br />
                quiet confidence
              </h1>
              <p className="mt-6 text-base md:text-lg text-muted-foreground max-w-xl">
                A restrained collection of modern staples, nuanced shades, and skin-first formulas.
                Designed to feel effortless every day.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  to="/products"
                  className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-6 py-3 text-sm tracking-wide hover:opacity-90 transition-opacity"
                >
                  Shop Collection
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/products"
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-white/70 px-6 py-3 text-sm tracking-wide hover:bg-white transition-colors"
                >
                  Build Your Routine
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="relative"
            >
              <div className="absolute -left-4 -top-4 h-full w-full border border-border rounded-[2rem]" />
              <img
                src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=900&h=1100&fit=crop"
                alt="Minimal makeup essentials"
                className="relative h-[520px] w-full rounded-[2rem] object-cover"
              />
              <div className="absolute bottom-5 left-5 rounded-2xl border border-white/40 bg-white/80 backdrop-blur px-4 py-3">
                <p className="ui-kicker">Editor Pick</p>
                <p className="text-sm">Soft Veil Foundation</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8 md:mb-10"
        >
          <p className="ui-kicker mb-3">Categories</p>
          <h2 className="ui-section-title">Simple makeup, layered your way</h2>
        </motion.div>

        <div className="flex flex-wrap gap-3 md:gap-4">
          {categories.map((category, index) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                to="/products"
                className="inline-flex items-center rounded-full border border-border bg-white/70 px-5 py-2 text-sm tracking-wide hover:bg-accent transition-colors"
              >
                {category}
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="bg-secondary/70 border-y border-border py-14 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-between mb-8 md:mb-10"
          >
            <div>
              <p className="ui-kicker mb-3">Bestsellers</p>
              <h2 className="ui-section-title mb-1 flex items-center gap-3">
                <Star className="w-8 h-8 fill-current" />
                Most loved
              </h2>
              <p className="text-muted-foreground">Daily essentials with proven wear and comfort.</p>
            </div>
            <Link
              to="/products"
              className="hidden md:flex items-center gap-2 text-sm tracking-wide hover:gap-3 transition-all"
            >
              View All
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
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
                  className="group block bg-white rounded-3xl overflow-hidden border border-border/80 hover:shadow-xl hover:-translate-y-0.5 transition-all"
                >
                  <div className="relative aspect-[4/5] overflow-hidden bg-secondary">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                    />
                  </div>
                  <div className="p-4 md:p-5">
                    <p className="ui-kicker mb-1">{product.brand}</p>
                    <h3 className="text-sm md:text-base mb-2 line-clamp-1">{product.name}</h3>
                    <div className="flex items-center justify-between text-sm">
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

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8 md:mb-10"
        >
          <h2 className="ui-section-title mb-2 flex items-center justify-center gap-3">
            <Sparkles className="w-8 h-8" />
            New Arrivals
          </h2>
          <p className="text-muted-foreground">Fresh launches with modern textures and tones.</p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
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
                className="group block bg-white rounded-3xl overflow-hidden border border-border/80 hover:shadow-xl transition-all"
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-secondary">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs">
                    New
                  </div>
                </div>
                <div className="p-4 md:p-5">
                  <p className="ui-kicker mb-1">{product.brand}</p>
                  <h3 className="text-sm md:text-base mb-2 line-clamp-1">{product.name}</h3>
                  <span className="font-medium text-sm">${product.price.toFixed(2)}</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="bg-secondary border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto"
          >
            <Heart className="w-12 h-12 mx-auto mb-6 text-muted-foreground" />
            <h2 className="ui-section-title mb-4">
              Keep your routine intentional
            </h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
              Join our members list for curated drops, skincare notes, and early access to limited shades.
            </p>
            <Link
              to="/signup"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-full hover:opacity-90 transition-opacity"
            >
              Join the List
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
