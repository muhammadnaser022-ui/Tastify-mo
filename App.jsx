import React, { useState } from 'react';

const fullMenu = {
  "Pizza": [
    { id: 1, name: "مارجريتا", price: 210, description: "صلصة طماطم، موتزاريللا، ريحان" },
    { id: 2, name: "بيبروني", price: 295, description: "صلصة طماطم، موتزاريللا، قطع بيبروني" }
  ],
  "Pasta": [
    { id: 4, name: "ألفريدو", price: 195, description: "وايت صوص مع قطع الدجاج والمشروم" }
  ]
};

export default function App() {
  const [activeCategory, setActiveCategory] = useState("Pizza");
  const [cart, setCart] = useState({});
  const [customerName, setCustomerName] = useState("");
  const whatsappNumber = "201068999120";

  const addToCart = (item) => {
    setCart(prev => ({ ...prev, [item.id]: { ...item, qty: (prev[item.id]?.qty || 0) + 1 } }));
  };

  const removeFromCart = (itemId) => {
    setCart(prev => {
      const newCart = { ...prev };
      if (newCart[itemId].qty > 1) newCart[itemId].qty -= 1;
      else delete newCart[itemId];
      return newCart;
    });
  };

  const cartArray = Object.values(cart);
  const totalPrice = cartArray.reduce((sum, item) => sum + (item.price * item.qty), 0);

  const sendOrder = () => {
    if (!customerName) { alert("ادخل اسمك أولاً"); return; }
    const itemsList = cartArray.map(item => `%0A- ${item.name} x${item.qty}`).join('');
    window.open(`https://wa.me/${whatsappNumber}?text=طلب جديد من: ${customerName}${itemsList}%0Aالإجمالي: ${totalPrice} L.E`, '_blank');
  };

  return (
    <div style={{ direction: 'rtl', fontFamily: 'sans-serif', padding: '10px', maxWidth: '500px', margin: '0 auto' }}>
      <header style={{ textAlign: 'center', background: '#2c3e50', color: 'white', padding: '20px', borderRadius: '15px' }}>
        <h1>Tastify - Marena</h1>
      </header>

      <nav style={{ display: 'flex', gap: '10px', padding: '15px 0', overflowX: 'auto' }}>
        {Object.keys(fullMenu).map(cat => (
          <button key={cat} onClick={() => setActiveCategory(cat)} style={{ padding: '10px 20px', borderRadius: '20px', border: '1px solid #ddd', background: activeCategory === cat ? '#e67e22' : '#f8f9fa', color: activeCategory === cat ? 'white' : '#333', whiteSpace: 'nowrap' }}>{cat}</button>
        ))}
      </nav>

      <input type="text" placeholder="اكتب اسمك هنا..." style={{ width: '100%', padding: '12px', marginBottom: '15px', borderRadius: '8px', border: '1px solid #ddd' }} value={customerName} onChange={(e) => setCustomerName(e.target.value)} />

      <div style={{ paddingBottom: '100px' }}>
        {fullMenu[activeCategory].map(item => (
          <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '15px 0', borderBottom: '1px solid #eee' }}>
            <div>
              <div style={{ fontWeight: 'bold' }}>{item.name}</div>
              <div style={{ color: '#e67e22' }}>{item.price} L.E</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              {cart[item.id] && <span>{cart[item.id].qty}</span>}
              <button onClick={() => addToCart(item)} style={{ background: '#f39c12', color: 'white', border: 'none', padding: '5px 15px', borderRadius: '8px', fontSize: '1.2rem' }}>+</button>
            </div>
          </div>
        ))}
      </div>

      {totalPrice > 0 && (
        <div style={{ position: 'fixed', bottom: '20px', left: '50%', transform: 'translateX(-50%)', width: '90%', maxWidth: '400px', background: '#2c3e50', color: 'white', padding: '15px', borderRadius: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 4px 15px rgba(0,0,0,0.3)' }}>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '0.8rem' }}>الإجمالي:</div>
            <div style={{ fontWeight: 'bold' }}>{totalPrice} L.E</div>
          </div>
          <button onClick={sendOrder} style={{ background: '#25d366', color: 'white', border: 'none', padding: '10px 15px', borderRadius: '8px', fontWeight: 'bold' }}>طلب عبر واتساب</button>
        </div>
      )}
    </div>
  );
}
