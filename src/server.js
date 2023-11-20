const express = require('express');
const bodyParser = require('body-parser');
const initWebRoutes = require('./routes/web');
const cookieParser = require('cookie-parser');
const routeTableBooking = require('./routes/tableBookingRoutes');
const { WebSocketServer } = require('ws');
const cors = require('cors')
require('dotenv').config();

let app = express();


//config app 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors())


initWebRoutes(app);

let port = process.env.PORT || 3000;

const wsServer = new WebSocketServer({ 
    server: app.listen(port, () => {
        console.log(`App is running at the port ${port}`);
    }), 
    path: '/table-booking'
});

routeTableBooking(wsServer);