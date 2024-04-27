import { useEffect } from "react";
import { useState } from "react";

const useOrders = () => {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    fetch("https://boi-exchange-server.onrender.com/order")
      .then((res) => res.json())
      .then((data) => setOrders(data));
  }, []);

  return [orders, setOrders];
};

export default useOrders;
