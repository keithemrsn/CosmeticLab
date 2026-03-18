import { useState } from 'react';
import { useParams, Link } from 'react-router';
import { motion } from 'motion/react';
import { Star, Heart, ShoppingBag, Check } from 'lucide-react';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';

export function ProductDetail() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [selectedShade, setSelectedShade] = useState<string | undefined>();
  const [added, setAdded] = useState(false);

  const product = products.find(p => p.id === Number(id));

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="mb-4">Product not found</h2>
          <Link to="/products" className="text-sm hover:underline">
            Return to products
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (product.shades && !selectedShade) {
      return;
    }
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      shade: selectedShade,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-12">
        <nav className="mb-8 text-xs md:text-sm text-muted-foreground tracking-wide">
          <Link to="/" className="hover:text-foreground">Home</Link>
          <span className="mx-2">/</span>
          <Link to="/products" className="hover:text-foreground">Products</Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">{product.name}</span>
        </nav>

        <div className="grid md:grid-cols-2 gap-10 lg:gap-14 mb-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative"
          >
            <div className="absolute -left-4 -top-4 h-full w-full rounded-[2rem] border border-border" />
            <img
              src={product.image}
              alt={product.name}
              className="relative aspect-[4/5] w-full rounded-[2rem] object-cover bg-secondary"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col"
          >
            <div className="flex items-center gap-2 mb-2">
              {product.bestseller && (
                <span className="inline-flex items-center gap-1 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs">
                  <Star className="w-3 h-3 fill-current" />
                  Bestseller
                </span>
              )}
              {product.new && (
                <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs">
                  New
                </span>
              )}
            </div>

            <p className="ui-kicker mb-2">{product.brand}</p>
            <h1 className="mb-4 text-4xl md:text-5xl leading-tight">
              {product.name}
            </h1>

            <div className="flex items-center gap-4 mb-6">
              <span className="text-2xl font-medium">${product.price.toFixed(2)}</span>
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating)
                          ? 'fill-current text-foreground'
                          : 'text-border'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  ({product.reviews} reviews)
                </span>
              </div>
            </div>

            <p className="text-muted-foreground mb-8">{product.description}</p>

            {product.shades && (
              <div className="mb-8">
                <h3 className="ui-kicker mb-4">Select Shade</h3>
                <div className="grid grid-cols-2 gap-3">
                  {product.shades.map((shade) => (
                    <button
                      key={shade}
                      onClick={() => setSelectedShade(shade)}
                      className={`px-4 py-3 rounded-full border transition-all text-sm ${
                        selectedShade === shade
                          ? 'border-primary bg-primary text-primary-foreground'
                          : 'border-border hover:border-foreground/30 bg-white'
                      }`}
                    >
                      {shade}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="flex gap-4 mb-8">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={handleAddToCart}
                disabled={product.shades && !selectedShade}
                className="flex-1 bg-primary text-primary-foreground px-8 py-4 rounded-full hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {added ? (
                  <>
                    <Check className="w-5 h-5" />
                    Added to Cart
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-5 h-5" />
                    Add to Cart
                  </>
                )}
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.95 }}
                className="p-4 border border-border rounded-full hover:bg-white transition-colors"
              >
                <Heart className="w-6 h-6" />
              </motion.button>
            </div>

            <div className="border-t border-border pt-8 space-y-4 text-sm bg-white/60 rounded-2xl p-5">
              <div className="flex justify-between gap-4">
                <span className="text-muted-foreground">Free Shipping</span>
                <span>On orders over $50</span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-muted-foreground">Returns</span>
                <span>30-day return policy</span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-muted-foreground">Category</span>
                <span>{product.category}</span>
              </div>
            </div>
          </motion.div>
        </div>

        {relatedProducts.length > 0 && (
          <section>
            <h2 className="mb-8 text-3xl md:text-4xl">
              You May Also Like
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <Link
                  key={relatedProduct.id}
                  to={`/products/${relatedProduct.id}`}
                  className="group block bg-white rounded-3xl overflow-hidden border border-border/80 hover:shadow-lg transition-all duration-300"
                >
                  <div className="relative aspect-[4/5] overflow-hidden bg-secondary">
                    <img
                      src={relatedProduct.image}
                      alt={relatedProduct.name}
                      className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                    />
                  </div>
                  <div className="p-5">
                    <p className="ui-kicker mb-1">
                      {relatedProduct.brand}
                    </p>
                    <h3 className="mb-2">{relatedProduct.name}</h3>
                    <span className="font-medium">${relatedProduct.price.toFixed(2)}</span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
