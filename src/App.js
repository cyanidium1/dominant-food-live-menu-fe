import React, { useEffect, useState } from "react";
import "./App.css";
import Admin from "./Admin";
import Home from "./Home";
import { FetchAcceptedOrders, FetchCompletedOrders } from "./orders-api";

function App() {
  const [orders, setOrders] = useState({
    accepted: [],
    ready: [],
  });

  const pathname = window.location.pathname;

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const acceptedData = await FetchAcceptedOrders();

        const completedData = await FetchCompletedOrders();

        setOrders({ accepted: acceptedData || [], ready: completedData || [] });

        console.log({ accepted: acceptedData, ready: completedData });
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();

    // Optional: If you want to fetch new data periodically, uncomment the following lines
    // const interval = setInterval(fetchOrders, 5000); // Fetch every 5 seconds
    // return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  return (
    <div className="bg-black h-screen overflow-hidden">
      {pathname === "/" && <Home orders={orders} />}
      {pathname === "/slashadmin" && (
        <Admin orders={orders} setOrders={setOrders} />
      )}
    </div>
  );
}

export default App;
