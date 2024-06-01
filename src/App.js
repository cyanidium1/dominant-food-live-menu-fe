import React, { useEffect, useState } from 'react';
import './App.css';
import Fire from './Fire';
import Header from './Header';
import Orders from './Orders';

function App() {
  const [orders, setOrders] = useState({ accepted: ["123", "234", "456"], ready: ["120", "456", "777"] });

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const acceptedResponse = await fetch('http://localhost:3001/orders/accepted-orders');
        const acceptedData = await acceptedResponse.json();

        const completedResponse = await fetch('http://localhost:3001/orders/completed-orders');
        const completedData = await completedResponse.json();

        setOrders({ accepted: acceptedData, ready: completedData });

        console.log({ accepted: acceptedData, ready: completedData })
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();

    // Optional: If you want to fetch new data periodically, uncomment the following lines
    // const interval = setInterval(fetchOrders, 5000); // Fetch every 5 seconds
    // return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  return (
    <div className='bg-black h-screen overflow-hidden'>
      <Header />
      <Orders orders={orders} />
      <Fire />
    </div>
  );
}

export default App;
