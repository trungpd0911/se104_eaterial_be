const { WebSocket } = require('ws');
const tableBookingService = require('../services/tableBookingService');

const actions = {
    BOOK_TABLE: 'BOOK_TABLE',
    CANCEL_TABLE: 'CANCEL_TABLE'
}

// Handle sending messages to all clients
const sendResponse = (wsServer, ws, res) => {
    wsServer.clients.forEach(function (client) {
        if (client.readyState === WebSocket.OPEN && ws.user.id === client.user.id) {
            client.send(JSON.stringify(res.toClient));
        } else if (client.readyState === WebSocket.OPEN && ws.user.id !== client.user.id) {
            client.send(JSON.stringify(res.broadcast));
        }
    });
}

const handleMessage = async function (wsServer, ws, message) {
    try {
        message = JSON.parse(message);
        let res;

        switch (message.action) {
            case actions.BOOK_TABLE:
                res = await tableBookingService.bookTable(ws.user.id, message.table_id, message.booking_time);
                sendResponse(wsServer, ws, res);
                break;

            case actions.CANCEL_TABLE:
                res = await tableBookingService.cancelTable(ws.user.id, message.table_id);
                sendResponse(wsServer, ws, res);
                break;

            default:
                sendResponse(wsServer, ws, JSON.stringify({
                    toClient: {
                        message: 'Invalid action'
                    }
                }));
        }   
    } catch(error) {
        sendResponse(wsServer, ws, JSON.stringify({
            toClient: {
                message: error.message
            }
        }));
    }
}

module.exports = { handleMessage }