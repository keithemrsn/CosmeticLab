import { Navigate, useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { User, ShoppingBag, Heart, Settings, LogOut, Package } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export function Account() {
  const { user, logout, isAuthenticated } = useAuth();
  const { cartCount } = useCart();
  const navigate = useNavigate();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const orderHistory = [
    {
      id: '12345',
      date: '2026-03-10',
      total: 156.00,
      status: 'Delivered',
      items: 3,
    },
    {
      id: '12344',
      date: '2026-02-28',
      total: 89.00,
      status: 'Delivered',
      items: 2,
    },
    {
      id: '12343',
      date: '2026-02-15',
      total: 234.00,
      status: 'Delivered',
      items: 5,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border bg-secondary/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-4"
          >
            <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center">
              <User className="w-8 h-8" />
            </div>
            <div>
              <p className="ui-kicker mb-1">My Account</p>
              <h1 className="mb-1 text-4xl md:text-5xl leading-none">
                {user?.name}
              </h1>
              <p className="text-muted-foreground">{user?.email}</p>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl p-6 border border-border/80"
          >
            <div className="flex items-center gap-4 mb-2">
              <div className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center">
                <ShoppingBag className="w-6 h-6" />
              </div>
              <div>
                <p className="text-2xl font-medium">{cartCount}</p>
                <p className="text-sm text-muted-foreground">Items in Cart</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-3xl p-6 border border-border/80"
          >
            <div className="flex items-center gap-4 mb-2">
              <div className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center">
                <Package className="w-6 h-6" />
              </div>
              <div>
                <p className="text-2xl font-medium">{orderHistory.length}</p>
                <p className="text-sm text-muted-foreground">Total Orders</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-3xl p-6 border border-border/80"
          >
            <div className="flex items-center gap-4 mb-2">
              <div className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center">
                <Heart className="w-6 h-6" />
              </div>
              <div>
                <p className="text-2xl font-medium">12</p>
                <p className="text-sm text-muted-foreground">Wishlist Items</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-3xl p-6 border border-border/80"
          >
            <div className="flex items-center gap-4 mb-2">
              <div className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center">
                <Settings className="w-6 h-6" />
              </div>
              <div>
                <p className="text-2xl font-medium">100</p>
                <p className="text-sm text-muted-foreground">Reward Points</p>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <h2 className="mb-6 text-3xl md:text-4xl">Order History</h2>
            <div className="space-y-4">
              {orderHistory.map((order, index) => (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-3xl p-6 border border-border/80"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="mb-1">Order #{order.id}</h3>
                      <p className="text-sm text-muted-foreground">
                        Placed on {new Date(order.date).toLocaleDateString('en-US', {
                          month: 'long',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </p>
                    </div>
                    <span className="bg-[#dde8db] text-[#2f5530] px-3 py-1 rounded-full text-xs">
                      {order.status}
                    </span>
                  </div>
                  <div className="flex justify-between items-center pt-4 border-t border-border">
                    <p className="text-sm text-muted-foreground">
                      {order.items} {order.items === 1 ? 'item' : 'items'}
                    </p>
                    <p className="font-medium">${order.total.toFixed(2)}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="md:col-span-1">
            <h2 className="mb-6 text-3xl md:text-4xl">Settings</h2>
            <div className="space-y-3">
              <button className="w-full flex items-center gap-3 bg-white p-4 rounded-2xl border border-border/80 hover:bg-accent transition-colors text-left">
                <User className="w-5 h-5" />
                <span>Edit Profile</span>
              </button>
              <button className="w-full flex items-center gap-3 bg-white p-4 rounded-2xl border border-border/80 hover:bg-accent transition-colors text-left">
                <Settings className="w-5 h-5" />
                <span>Preferences</span>
              </button>
              <button className="w-full flex items-center gap-3 bg-white p-4 rounded-2xl border border-border/80 hover:bg-accent transition-colors text-left">
                <Heart className="w-5 h-5" />
                <span>Wishlist</span>
              </button>
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 bg-white p-4 rounded-2xl border border-border/80 hover:bg-destructive/10 hover:text-destructive transition-colors text-left"
              >
                <LogOut className="w-5 h-5" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
