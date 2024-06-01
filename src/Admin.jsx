import React from 'react';
import { Button, Typography, Container, List, ListItem, ListItemText } from '@mui/material';

function Admin({ accepted, ready, setAccepted, setReady }) {
    const moveToReady = (order) => {
        setAccepted((prevAccepted) => prevAccepted.filter(item => item !== order));
        setReady((prevReady) => [...prevReady, order]);
    };

    const moveToAccepted = (order) => {
        setReady((prevReady) => prevReady.filter(item => item !== order));
        setAccepted((prevAccepted) => [...prevAccepted, order]);
    };

    const deleteOrder = (order, type) => {
        if (type === 'accepted') {
            setAccepted((prevAccepted) => prevAccepted.filter(item => item !== order));
        } else if (type === 'ready') {
            setReady((prevReady) => prevReady.filter(item => item !== order));
        }
    };

    return (
        <Container>
            <Typography variant="h4" className="text-center my-4">Admin Page</Typography>
            <div className="flex flex-col">
                <div className="mb-4">
                    <Typography variant="h6">Accepted Orders</Typography>
                    {
                        accepted && <List>
                            {accepted.map(order => (
                                <ListItem key={order} className="flex justify-between items-center">
                                    <ListItemText primary={order} />
                                    <div className="flex space-x-2">
                                        <Button variant="contained" color="primary" size="small" onClick={() => moveToReady(order)}>
                                            Move to Ready
                                        </Button>
                                        <Button variant="contained" color="error" size="small" onClick={() => deleteOrder(order, 'accepted')}>
                                            Delete
                                        </Button>
                                    </div>
                                </ListItem>
                            ))}
                        </List>
                    }
                </div>
                <div>
                    <Typography variant="h6">Ready Orders</Typography>
                    {ready && <List>
                        {ready.map(order => (
                            <ListItem key={order} className="flex justify-between items-center">
                                <ListItemText primary={order} />
                                <div className="flex space-x-2">
                                    <Button variant="contained" color="secondary" size="small" onClick={() => moveToAccepted(order)}>
                                        Move to Accepted
                                    </Button>
                                    <Button variant="contained" color="error" size="small" onClick={() => deleteOrder(order, 'ready')}>
                                        Delete
                                    </Button>
                                </div>
                            </ListItem>
                        ))}
                    </List>}
                </div>
            </div>
        </Container>
    );
}

export default Admin;
