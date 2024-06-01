import React, { useEffect, useState } from 'react';
import './App.css';
import Fire from './Fire';
import Header from './Header';
import Orders from './Orders';
import Admin from './Admin'; // Импортируем компонент Admin

function App() {

  const [orders, setOrders] = useState({ accepted: ["1", "2", "3"], ready: ["245"] });

  return (
    <div className='bg-black h-screen overflow-hidden'>
      <Header />
      <Orders orders={orders} />
      <Fire />
    </div>
  );
}

export default App;
