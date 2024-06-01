import axios from "axios";

export const FetchAcceptedOrders = async () => {
  const data = await axios.get("http://localhost:3001/accepted-orders");
  return data.data;
};

export const FetchCompletedOrders = async () => {
  const data = await axios.get("http://localhost:3001/completed-orders");
  return data.data;
};

export const MoveAcceptedOrderToCompleted = async (orderNumber) => {
  const data = await axios.post(
    `http://localhost:3001/complete-order/${orderNumber}`
  );
  return data.data;
};

export const RequestRemoveCompletedOrder = async (orderNumber) => {
  const data = await axios.delete(
    `http://localhost:3001/completed-orders/${orderNumber}`
  );
  return data.data;
};

export const RequestRemoveAcceptedOrder = async (orderNumber) => {
  const data = await axios.delete(
    `http://localhost:3001/accepted-orders/${orderNumber}`
  );
  return data.data;
};
