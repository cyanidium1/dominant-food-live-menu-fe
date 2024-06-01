import React, { useState } from "react";
import {
  Button,
  Typography,
  Container,
  List,
  ListItem,
  ListItemText,
  Modal,
  Box,
} from "@mui/material";
import {
  MoveAcceptedOrderToCompleted,
  RequestRemoveCompletedOrder,
  RequestRemoveAcceptedOrder,
} from "./orders-api";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

function Admin({ orders, setOrders }) {
  const { accepted, ready } = orders;
  const [open, setOpen] = useState(false);
  const [orderToDelete, setOrderToDelete] = useState(null);
  const [deleteType, setDeleteType] = useState("");

  const handleOpen = (order, type) => {
    setOrderToDelete(order);
    setDeleteType(type);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setOrderToDelete(null);
    setDeleteType("");
  };

  const confirmDelete = async () => {
    if (!orderToDelete) return;

    try {
      if (deleteType === "accepted") {
        await RequestRemoveAcceptedOrder(orderToDelete.orderNumber);
        setOrders((prevOrders) => ({
          accepted: prevOrders.accepted.filter(
            (item) => item.orderNumber !== orderToDelete.orderNumber
          ),
          ready: prevOrders.ready,
        }));
      } else if (deleteType === "ready") {
        await RequestRemoveCompletedOrder(orderToDelete.orderNumber);
        setOrders((prevOrders) => ({
          ready: prevOrders.ready.filter(
            (item) => item.orderNumber !== orderToDelete.orderNumber
          ),
          accepted: prevOrders.accepted,
        }));
      }
      handleClose();
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };

  const moveToReady = async (order) => {
    try {
      await MoveAcceptedOrderToCompleted(order.orderNumber);
      setOrders((prevOrders) => ({
        accepted: prevOrders.accepted.filter(
          (item) => item.orderNumber !== order.orderNumber
        ),
        ready: [...prevOrders.ready, order],
      }));
    } catch (error) {
      console.error("Error moving order to ready:", error);
    }
  };

  const moveToAccepted = (order) => {
    setOrders((prevOrders) => ({
      ready: prevOrders.ready.filter(
        (item) => item.orderNumber !== order.orderNumber
      ),
      accepted: [...prevOrders.accepted, order],
    }));
  };

  return (
    <Container>
      <Typography variant="h4" className="text-center my-4">
        Admin Page
      </Typography>
      <div className="flex flex-col">
        <div className="mb-4">
          <Typography variant="h6">Accepted Orders</Typography>
          {accepted && (
            <List>
              {accepted.map((order) => (
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
                      onClick={() => handleOpen(order, "accepted")}
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
          {ready && (
            <List>
              {ready.map((order) => (
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
                      onClick={() => handleOpen(order, "ready")}
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
      <Modal open={open} onClose={handleClose}>
        <Box sx={modalStyle}>
          <Typography variant="h6" component="h2">
            Confirm Deletion
          </Typography>
          <Typography sx={{ mt: 2 }}>
            Are you sure you want to delete the order?
          </Typography>
          <div className="flex justify-end space-x-2 mt-4">
            <Button variant="contained" color="error" onClick={confirmDelete}>
              Yes
            </Button>
            <Button variant="contained" onClick={handleClose}>
              No
            </Button>
          </div>
        </Box>
      </Modal>
    </Container>
  );
}

export default Admin;
