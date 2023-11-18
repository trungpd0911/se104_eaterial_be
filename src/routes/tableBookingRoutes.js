const tableBookingController = require('../controllers/tableBookingController');
const authMiddleware = require('../middlewares/authMiddleware');

const routeTableBooking = (wsServer) => {
    wsServer.on('listening', () => {
        console.log("Listening on the same port as Express Server");
    });
    
    wsServer.on('connection', (ws, req) => {
        authMiddleware.verifyTokenWs(ws, req);
        
        ws.on('open', () => {
            console.log("Connect successfully");
        });

        ws.on('close', () => {  
            console.log("Close connection successfully");
        })

        ws.on('error', (error) => { 
            console.error(error) 
        });

        ws.on('message', function (message) {
            tableBookingController.handleMessage(wsServer, this, message);
        });
    });
}

module.exports = routeTableBooking;