import axios from "axios";

export const FetchAcceptedOrders = async () => {
  const data = await axios.get("http://192.168.100.8:3001/accepted-orders");
  return data.data;
};

export const FetchCompletedOrders = async () => {
  const data = await axios.get("http://192.168.100.8:3001/completed-orders");
  return data.data;
};

export const MoveCompletedOrderToAccepted = async (orderNumber) => {
  const data = await axios.post(
    `http://192.168.100.8:3001/accept-order/${orderNumber}`
  );
  return data.data;
};

export const MoveAcceptedOrderToCompleted = async (orderNumber) => {
  const data = await axios.post(
    `http://192.168.100.8:3001/complete-order/${orderNumber}`
  );
  return data.data;
};

export const RequestRemoveCompletedOrder = async (orderNumber) => {
  const data = await axios.delete(
    `http://192.168.100.8:3001/completed-orders/${orderNumber}`
  );
  return data.data;
};

export const RequestRemoveAcceptedOrder = async (orderNumber) => {
  const data = await axios.delete(
    `http://192.168.100.8:3001/accepted-orders/${orderNumber}`
  );
  return data.data;
};
