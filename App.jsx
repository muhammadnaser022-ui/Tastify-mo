import React, { useState } from 'react';

// 1. قاعدة بيانات المنيو (يمكنك تعديل الأسعار والأسماء هنا)
const fullMenu = {
  "Pizza": [
    { id: 1, name: "مارجريتا", price: 210, description: "صلصة طماطم، موتزاريللا، ريحان" },
    { id: 2, name: "بيبروني", price: 295, description: "صلصة طماطم، موتزاريللا، قطع بيبروني" },
    { id: 3, name: "سي فود", price: 380, description: "فواكه البحر الطازجة مع الجبن" }
  ],
  "Pasta": [
    { id: 4, name: "ألفريدو", price: 195, description: "وايت صوص مع قطع الدجاج والمشروم" },
    { id: 5, name: "سي فود باستا", price: 350, description: "مكرونة بجمبري وفواكه البحر" }
  ],
  "Main Dishes": [
    { id: 6, name: "ميكس جريل", price: 600, description: "تشكيلة مشويات تيتو مارينا المميزة" },
    { id: 7, name: "كوردون بلو", price: 350, description: "صدور دجاج محشوة بالجبن والسموكس" }
  ],
  "Dessert": [
    { id: 8, name: "وافل نوتيلا", price: 90, description: "وافل بلجيكي مغطى بشوكولاتة نوتيلا" },
    { id: 9, name: "مولتن كيك", price: 120, description: "كيك الشوكولاتة الذائبة مع الآيس كريم" }
  ]
};

export default function App() {
  const [activeCategory, setActiveCategory] = useState("Pizza");
  const [cart, setCart] = useState({});
  const [customerName, setCustomerName] = useState("");
  const whatsappNumber = "201068999120"; // رقم الواتساب الخاص بك

  // إضافة أو زيادة كمية
  const addToCart = (item) => {
    setCart(prev => ({
      ...prev,
      [item.id]: {
        ...item,
        qty: (prev[item.id]?.qty || 0) + 1
      }
    }));
  };

  // تقليل كمية أو حذف
  const removeFromCart = (itemId) => {
    setCart(prev => {
      const newCart = { ...prev };
      if (newCart[itemId].qty > 1) {
        newCart[itemId].qty -= 1;
      } else {
        delete newCart[itemId];
      }
      return newCart;
    });
  };

  const cartArray = Object.values(cart);
  const totalPrice = cartArray.reduce((sum, item) => sum + (item.price * item.qty), 0);

  const sendOrder = () => {
    if (cartArray.length === 0) return;
    if (!customerName) {
      alert("من فضلك ادخل اسمك أولاً ليتمكن المطعم من معرفة صاحب الطلب");
      return;
    }
    
    const itemsList = cartArray.map(item => `%0A- ${item.name} x${item.qty} (${item.price * item.qty} L.E)`).join('');
    const message = `*طلب جديد من Tastify*%0A------------------%0A*الاسم:* ${customerName}${itemsList}%0A------------------%0A*الإجمالي:* ${totalPrice} L.E%0A%0A(يرجى تأكيد الطلب)`;
    
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
  };

  return (
    <div style={styles.container}>
      <style>{`
        .nav-btn.active { background: #e67e22 !important; color: white !important; border-color: #e67e22 !important; }
        .category-nav::-webkit-scrollbar { display: none; }
        * { box-sizing: border-box; }
      `}</style>

      <header style={styles.header}>
        <h1 style={{ margin: 0, fontSize: '1.8rem' }}>Tastify - Marena</h1>
        <p style={{ opacity: 0.9, marginTop: '5px' }}>Menu 2026 🥂</p>
      </header>

      <nav className="category-nav" style={styles.nav}>
        {Object.keys(fullMenu).map(cat => (
          <button 
            key={cat} 
            className={`nav-btn ${activeCategory === cat ? 'active' : ''}`}
            onClick={() => setActiveCategory(cat)}
            style={styles.navBtn}
          >
            {cat}
          </button>
        ))}
      </nav>

      <main style={styles.list}>
        <input 
          type="text" 
          placeholder="اكتب اسمك هنا قبل الطلب..." 
          style={styles.input}
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
        />
        
        {fullMenu[activeCategory].map((item) => (
          <div key={item.id} style={styles.card}>
            <div style={{ flex: 1, paddingLeft: '10px' }}>
              <h3 style={styles.itemName}>{item.name}</h3>
              <p style={styles.itemDesc}>{item.description}</p>
              <span style={styles.price}>{item.price} L.E</span>
            </div>
            <div style={styles.counter}>
              {cart[item.id] && (
                <>
                  <button onClick={() => removeFromCart(item.id)} style={styles.qtyBtn}>-</button>
                  <span style={{margin: '0 10px', fontWeight: 'bold'}}>{cart[item.id].qty}</span>
                </>
              )}
              <button onClick={() => addToCart(item)} style={styles.addBtn}>+</button>
            </div>
          </div>
        ))}
      </main>

      {totalPrice > 0 && (
        <div style={styles.cartBar}>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '0.8rem' }}>إجمالي السعر:</div>
            <div style
