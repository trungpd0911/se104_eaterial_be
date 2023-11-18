const { WebSocket } = require('ws');
const tableBookingService = require('../services/tableBookingService');

const actions = {
    BOOK_TABLE: 'BOOK_TABLE',
    CANCEL_TABLE: 'CANCEL_TABLE'
}

// Send message to the client that sent request
const sendToClient = (wsServer, ws, res) => {
    wsServer.clients.forEach(function (client) {
        if (client.readyState === WebSocket.OPEN && ws.user.id === client.user.id) {
            client.send(JSON.stringify(res));
        }
    });
}

// Send message to all other clients
const broadcastResponse = (wsServer, ws, res) => {
    wsServer.clients.forEach(function (client) {
        if (client.readyState === WebSocket.OPEN && ws.user.id !== client.user.id) {
            client.send(JSON.stringify(res));
        }
    });
}

// Handle sending messages to all clients
const sendResponse = (wsServer, ws, res) => {
    if (res.toClient) {
        console.log(res.toClient);
        sendToClient(wsServer, ws, res.toClient);
    }
    if (res.broadcast) {
        console.log(res.broadcast);
        broadcastResponse(wsServer, ws, res.broadcast);
    }
}

const handleMessage = async function (wsServer, ws, message) {
    try {
        message = JSON.parse(message);
        let res;

        switch (message.action) {

            case actions.BOOK_TABLE:
                res = await tableBookingService.bookTable(ws.user.id, message.table_id);
                sendResponse(wsServer, ws, res);
                break;

            case actions.CANCEL_TABLE:
                res = await tableBookingService.cancelTable();
                sendResponse(wsServer, ws, res);
                break;

            default:
                sendToClient(wsServer, ws, JSON.stringify({
                    message: 'Invalid action'
                }));
        }   
    } catch(error) {
        console.log(error)
        sendToClient(wsServer, ws, JSON.stringify({
            message: error.message
        }));
    }
}

module.exports = { handleMessage }