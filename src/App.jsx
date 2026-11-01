import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Menu, X, ArrowUpRight, ChevronRight, ShoppingBag, Plus } from 'lucide-react';

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeAccordion, setActiveAccordion] = useState(0);
  const [activeCategory, setActiveCategory] = useState(0);
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);

  const heroRef = useRef(null);
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end end"]
  });

  const heroScale = useTransform(heroProgress, [0.75, 1], [1, 0.85]);
  const heroRadius = useTransform(heroProgress, [0.75, 1], ["0px", "40px"]);
  const heroOpacity = useTransform(heroProgress, [0.85, 1], [1, 0]);

  const circleScale = useTransform(heroProgress, [0, 0.5], [0.5, 6]);
  const circleOpacity = useTransform(heroProgress, [0.4, 0.65], [1, 0]);

  const content1Y = useTransform(heroProgress, [0.15, 0.3, 0.45], [50, 0, -50]);
  const content1Opacity = useTransform(heroProgress, [0.15, 0.25, 0.45], [0, 1, 0]);
  
  const content2Opacity = useTransform(heroProgress, [0.45, 0.55], [0, 1]);
  const content2Y = useTransform(heroProgress, [0.45, 0.55], [50, 0]);

  const products = [
    { id: 1, title: "Smart Chrono X", category: "Wearable Tech", price: "$299", image: "/images/watch.jpg" },
    { id: 2, title: "Aura Wireless Pods", category: "Audio & Sound", price: "$189", image: "/images/pods.jpg" },
    { id: 3, title: "Zenith Glass", category: "Smart Home", price: "$349", image: "/images/glass.jpg" },
    { id: 4, title: "Apex Kinetic", category: "Performance Gear", price: "$210", image: "/images/kinetic.jpg" },
    { id: 5, title: "Pure Essence", category: "Organic Living", price: "$120", image: "/images/essence.jpg" }
  ];

  const categories = [
    { title: "Next-Gen Tech", desc: "Engineered for maximum performance and futuristic design.", video: "https://strvid.nyc3.cdn.digitaloceanspaces.com/cloudinary/bg5_yx7j4k.mp4", bg: "bg-[#0f172a]" },
    { title: "Smart Ecosystem", desc: "Seamlessly connecting your daily lifestyle and devices.", video: "https://strvid.nyc3.cdn.digitaloceanspaces.com/cloudinary/bg2_zvj76l.mp4", bg: "bg-[#1e1b4b]" },
    { title: "Elite Craftsmanship", desc: "Hand-finished materials built to last a lifetime.", video: "https://strvid.nyc3.cdn.digitaloceanspaces.com/cloudinary/bg3_fqnvi9.mp4", bg: "bg-[#172554]" }
  ];

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  return (
    <div className="bg-[#0a0f1a] text-white font-sans antialiased selection:bg-blue-600 selection:text-white overflow-x-hidden relative">
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none z-10 opacity-30"></div>

      {/* شريط التنقل العلوي */}
      <nav className="fixed top-4 md:top-6 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] md:w-[calc(100%-3rem)] max-w-7xl z-50 flex items-center justify-between px-6 py-4 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl transition-all">
        <a href="#" className="text-2xl md:text-3xl font-black tracking-tighter">
          NEX<span className="text-blue-500">US</span>
        </a>
        
        <div className="hidden lg:flex items-center gap-8 text-sm font-semibold uppercase tracking-widest mr-8 text-slate-300">
          <a href="#hero" className="hover:text-blue-400 transition-colors">Home</a>
          <a href="#categories" className="hover:text-blue-400 transition-colors">Categories</a>
          <a href="#showcase" className="hover:text-blue-400 transition-colors">Products</a>
          <button onClick={() => setCartOpen(true)} className="hover:text-blue-400 transition-colors flex items-center gap-1.5 cursor-pointer">
            <ShoppingBag className="w-4 h-4" />
            <span>Cart ({cart.length})</span>
          </button>
        </div>

        <div className="flex items-center gap-3">
          <button onClick={() => setCartOpen(true)} className="lg:hidden p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors text-white relative">
            <ShoppingBag className="w-5 h-5" />
            {cart.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {cart.length}
              </span>
            )}
          </button>
          <button onClick={() => setMenuOpen(true)} className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors text-white">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </nav>

      {/* Cart Drawer Modal */}
      <AnimatePresence>
        {cartOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/70 z-[200] flex justify-end">
            <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 25 }} className="w-full max-w-md bg-[#0f172a] h-full p-8 flex flex-col justify-between border-l border-white/10">
              <div>
                <div className="flex justify-between items-center mb-8">
                  <div className="flex items-center gap-2">
                    <ShoppingBag className="w-6 h-6 text-blue-400" />
                    <h3 className="text-2xl font-black">Shopping Cart</h3>
                  </div>
                  <button onClick={() => setCartOpen(false)} className="p-2 rounded-full bg-white/5 hover:bg-white/10">
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {cart.length === 0 ? (
                  <p className="text-slate-400 text-center py-16">Your cart is currently empty. Start shopping now!</p>
                ) : (
                  <div className="flex flex-col gap-4 max-h-[50vh] overflow-y-auto pr-2">
                    {cart.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between bg-white/5 p-4 rounded-2xl border border-white/10">
                        <div className="flex items-center gap-4">
                          <img src={item.image} alt={item.title} className="w-14 h-14 object-cover rounded-xl" />
                          <div>
                            <h4 className="font-bold">{item.title}</h4>
                            <span className="text-sm text-blue-400 font-semibold">{item.price}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div>
                {cart.length > 0 && (
                  <button onClick={() => alert('Order placed successfully! Thank you for shopping with us.')} className="w-full py-4 rounded-full bg-blue-500 text-white font-bold text-lg hover:bg-white hover:text-blue-950 transition-all shadow-xl mb-4">
                    Secure Checkout
                  </button>
                )}
                <button onClick={() => setCartOpen(false)} className="w-full py-3 rounded-full bg-white/5 text-slate-300 font-semibold hover:bg-white/10 transition-all">
                  Continue Shopping
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* القائمة الجانبية */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{ y: "-100%" }} animate={{ y: 0 }} exit={{ y: "-100%" }} transition={{ duration: 0.6 }} className="fixed inset-0 bg-[#0f172a] z-[100] flex flex-col justify-between p-8 md:p-16 border-b border-white/10">
            <div className="flex justify-between items-center">
              <span className="text-2xl font-black tracking-tighter">NEXUS</span>
              <button onClick={() => setMenuOpen(false)} className="p-3 rounded-full bg-white/5 hover:bg-white/10 transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="flex flex-col gap-4 md:gap-6 my-auto">
              {['Home', 'Categories', 'Products', 'Cart'].map((item, index) => (
                <a key={index} href={`#${['hero', 'categories', 'showcase', 'contact'][index]}`} onClick={() => { setMenuOpen(false); if(index === 3) setCartOpen(true); }} className="text-4xl md:text-7xl font-black tracking-tight hover:text-blue-400 transition-all">
                  0{index + 1}. {item}
                </a>
              ))}
            </div>
            <div className="flex justify-between text-sm text-slate-400 uppercase tracking-widest">
              <span>Next-Gen Products</span>
              <span>© 2026</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* قسم الهيرو الرئيسي */}
      <div ref={heroRef} id="hero" className="h-[400vh] relative">
        <motion.div style={{ scale: heroScale, borderRadius: heroRadius, opacity: heroOpacity }} className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center bg-[#0a0f1a]">
          <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover opacity-30 pointer-events-none" src="https://strvid.nyc3.cdn.digitaloceanspaces.com/cloudinary/bg1_jgni8n.mp4" />

          <motion.div style={{ scale: circleScale, opacity: circleOpacity }} className="absolute w-[30vw] h-[30vw] min-w-[300px] min-h-[300px] rounded-full bg-blue-950/70 overflow-hidden flex items-center justify-center z-20 border border-blue-700/50 shadow-[0_0_100px_-10px_rgba(56,189,248,0.5)]">
            <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-40 pointer-events-none scale-150" src="https://strvid.nyc3.cdn.digitaloceanspaces.com/cloudinary/bg4_hzaahu.mp4" />
          </motion.div>

          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-30 select-none">
            <h1 className="text-[30vmin] font-black tracking-tighter leading-none flex items-center">
              <span className="mr-[14vmin]">L</span><span className="opacity-0">U</span><span className="ml-[11vmin]">X</span>
            </h1>
          </div>

          <div className="absolute inset-0 flex items-center justify-center z-40 text-center px-4 pointer-events-none">
            <motion.div style={{ y: content1Y, opacity: content1Opacity }} className="absolute">
              <p className="text-lg md:text-2xl font-semibold uppercase tracking-[0.3em] text-slate-300">Crafted for Perfection.</p>
            </motion.div>

            <motion.div style={{ y: content2Y, opacity: content2Opacity }} className="absolute flex flex-col items-center pointer-events-auto">
              <h2 className="text-4xl md:text-7xl font-black tracking-tight mb-6 max-w-4xl">Experience Ultimate Innovation.</h2>
              <a href="#showcase" className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-blue-500 text-white font-bold text-lg hover:bg-white hover:text-blue-950 transition-all shadow-xl shadow-blue-500/20">
                <span>Explore Products</span>
                <ArrowUpRight className="w-5 h-5" />
              </a>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* قسم الفئات */}
      <section id="categories" className="relative px-6 md:px-16 py-32 z-30">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5 lg:sticky lg:top-32">
            <span className="text-sm font-bold uppercase tracking-[0.3em] text-blue-400">Collections</span>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter mt-4 mb-6">Engineered Excellence.</h2>
            <p className="text-lg text-slate-300 leading-relaxed">Discover products designed to elevate your everyday life through cutting-edge technology.</p>
          </div>
          
          <div className="lg:col-span-7 relative min-h-[480px] md:min-h-[520px] w-full">
            {categories.map((cat, index) => {
              const isActive = activeCategory === index;
              return (
                <div 
                  key={index} 
                  onMouseEnter={() => setActiveCategory(index)}
                  onClick={() => setActiveCategory(index)}
                  style={{ top: `${index * 55}px` }}
                  className={`absolute inset-x-0 h-[400px] md:h-[480px] rounded-3xl p-8 md:p-12 flex flex-col justify-between overflow-hidden shadow-2xl ${cat.bg} border border-white/10 transition-all duration-700 cursor-pointer ${
                    isActive ? 'scale-100 opacity-100 z-30 shadow-[0_20px_50px_rgba(0,0,0,0.9)]' : 'scale-[0.93] opacity-75 z-10'
                  }`}
                >
                  <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover opacity-30 pointer-events-none" src={cat.video} />
                  <div className="relative z-10 flex justify-between items-center">
                    <span className="text-xl font-bold">0{index + 1}</span>
                    <ChevronRight className="w-6 h-6 text-blue-400" />
                  </div>
                  <div className="relative z-10">
                    <h3 className="text-3xl md:text-5xl font-black mb-3">{cat.title}</h3>
                    <p className="text-slate-300 max-w-md">{cat.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* قسم المنتجات المميزة (حركة أفقية فخمة مع عرض كامل للصور وغير مقصوصة في جميع الأجهزة) */}
      <section id="showcase" className="min-h-screen bg-[#0f172a] py-32 px-6 md:px-16 z-30 relative border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <span className="text-sm font-bold uppercase tracking-[0.3em] text-blue-400">Featured Lineup</span>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter mt-2">Flagship Products</h2>
          </div>
          
          {/* حاوية تفاعلية بحركة أفقية دقيقة متناسبة مع كافة الشاشات */}
          <div className="flex flex-col lg:flex-row h-[75vh] md:h-[65vh] gap-4">
            {products.map((item, index) => {
              const isActive = activeAccordion === index;
              return (
                <div 
                  key={index} 
                  onMouseEnter={() => setActiveAccordion(index)} 
                  onClick={() => setActiveAccordion(index)}
                  className={`relative rounded-3xl overflow-hidden cursor-pointer transition-all duration-700 flex flex-col justify-end p-6 md:p-8 ${
                    isActive ? 'flex-[4] lg:flex-[5] opacity-100 shadow-[0_25px_60px_rgba(0,0,0,0.9)]' : 'flex-[1] opacity-60 lg:blur-[1px]'
                  }`}
                >
                  {/* تم تعديل خصائص الصورة لتظهر كاملة وواضحة بدون قص */}
                  <img src={item.image} alt={item.title} className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none scale-105 hover:scale-100 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent"></div>
                  
                  <div className="relative z-10 flex flex-col sm:flex-row lg:flex-row justify-between items-start sm:items-end lg:items-end gap-4">
                    <div>
                      <span className="text-xs font-semibold uppercase tracking-widest text-blue-400">{item.category}</span>
                      <h3 className="text-xl md:text-3xl font-black mt-1">{item.title}</h3>
                      <p className="text-lg md:text-xl font-bold text-white mt-1">{item.price}</p>
                    </div>
                    {isActive && (
                      <button onClick={(e) => { e.stopPropagation(); addToCart(item); }} className="bg-blue-500 hover:bg-white hover:text-blue-950 text-white px-4 py-2.5 md:px-5 md:py-3 rounded-full font-bold text-sm md:text-base flex items-center gap-2 transition-all shadow-lg shadow-blue-500/25 pointer-events-auto shrink-0">
                        <Plus className="w-4 h-4 md:w-5 md:h-5" />
                        <span>Add to Cart</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* الفوتر */}
      <footer id="contact" className="h-screen bg-[#0a0f1a] flex flex-col justify-between p-8 md:p-16 relative overflow-hidden z-30 border-t border-white/5">
        <div className="max-w-7xl w-full mx-auto flex justify-between items-center z-10">
          <span className="text-xl font-black tracking-tighter">NEXUS STORE</span>
          <span className="text-sm uppercase tracking-widest text-slate-400">Secure Checkout</span>
        </div>
        <div className="relative flex items-center justify-center w-full my-auto z-10">
          <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-30 pointer-events-none" src="https://strvid.nyc3.cdn.digitaloceanspaces.com/cloudinary/bg1_jgni8n.mp4" />
          <h2 onClick={() => setCartOpen(true)} className="text-[11vw] font-black tracking-tighter text-black mix-blend-overlay hover:text-blue-500 transition-colors duration-500 cursor-pointer text-center select-none">
            SHOP NOW.
          </h2>
        </div>
        <div className="max-w-7xl w-full mx-auto flex justify-between items-center text-sm text-slate-400 uppercase tracking-widest z-10">
          <p>Global Shipping Available</p>
          <p>© 2026 Nexus Products.</p>
        </div>
      </footer>
    </div>
  );
}