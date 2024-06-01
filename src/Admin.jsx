import React, { useState } from "react";
import {
  Button,
  Typography,
  Container,
  List,
  ListItem,
  ListItemText,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import axios from "axios";

function Admin({ orders, setOrders }) {
  const [open, setOpen] = useState(false);
  const [orderToDelete, setOrderToDelete] = useState(null);

  const handleClickOpen = (order, type) => {
    setOrderToDelete({ order, type });
    setOpen(true);
  };

  const handleClose = () => {
    setOrderToDelete(null);
    setOpen(false);
  };

  const handleDelete = async () => {
    try {
      if (orderToDelete.type === "accepted") {
        await axios.delete(
          `http://localhost:3001/accepted-orders/${orderToDelete.order.orderNumber}`
        );
      } else if (orderToDelete.type === "ready") {
        await axios.delete(
          `http://localhost:3001/completed-orders/${orderToDelete.order.orderNumber}`
        );
      }

      setOrders((prevOrders) => ({
        ...prevOrders,
        [orderToDelete.type]: prevOrders[orderToDelete.type].filter(
          (order) => order !== orderToDelete.order
        ),
      }));

      handleClose();
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };

  const moveToReady = async (order) => {
    try {
      await axios.post(
        `http://localhost:3001/complete-order/${order.orderNumber}`
      );
      setOrders((prevOrders) => ({
        accepted: prevOrders.accepted.filter((item) => item !== order),
        ready: [...prevOrders.ready, order],
      }));
    } catch (error) {
      console.error("Error moving order to ready:", error);
    }
  };

  const moveToAccepted = async (order) => {
    try {
      await axios.post(
        `http://localhost:3001/accept-order/${order.orderNumber}`
      );
      setOrders((prevOrders) => ({
        ready: prevOrders.ready.filter((item) => item !== order),
        accepted: [...prevOrders.accepted, order],
      }));
    } catch (error) {
      console.error("Error moving order to accepted:", error);
    }
  };

  return (
    <Container>
      <Typography variant="h4" className="text-center my-4">
        Admin Page
      </Typography>
      <div className="flex flex-col">
        <div className="mb-4">
          <Typography variant="h6">Accepted Orders</Typography>
          {orders.accepted && (
            <List>
              {orders.accepted.map((order) => (
                <ListItem
                  key={order.orderNumber}
                  className="flex justify-between items-center text-white"
                >
                  <ListItemText primary={order.orderNumber} />
                  <div className="flex space-x-2">
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      onClick={() => moveToReady(order)}
                    >
                      Move to Ready
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      size="small"
                      onClick={() => handleClickOpen(order, "accepted")}
                    >
                      Delete
                    </Button>
                  </div>
                </ListItem>
              ))}
            </List>
          )}
        </div>
        <div>
          <Typography variant="h6">Ready Orders</Typography>
          {orders.ready && (
            <List>
              {orders.ready.map((order) => (
                <ListItem
                  key={order.orderNumber}
                  className="flex justify-between items-center text-white"
                >
                  <ListItemText primary={order.orderNumber} />
                  <div className="flex space-x-2">
                    <Button
                      variant="contained"
                      color="secondary"
                      size="small"
                      onClick={() => moveToAccepted(order)}
                    >
                      Move to Accepted
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      size="small"
                      onClick={() => handleClickOpen(order, "ready")}
                    >
                      Delete
                    </Button>
                  </div>
                </ListItem>
              ))}
            </List>
          )}
        </div>
      </div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{"Confirm Deletion"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete the order{" "}
            {orderToDelete?.order.orderNumber}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            No
          </Button>
          <Button onClick={handleDelete} color="primary" autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default Admin;
