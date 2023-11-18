const express = require('express');
const bodyParser = require('body-parser');
const initWebRoutes = require('./routes/web');
const cookieParser = require('cookie-parser');
const routeTableBooking = require('./routes/tableBookingRoutes');
const { WebSocketServer, WebSocket } = require('ws');
const cors = require('cors')
require('dotenv').config();

let app = express();


//config app 
app.use(bodyParser.json());
//  xử lý các yêu cầu HTTP gửi dưới dạng JSON 
app.use(bodyParser.urlencoded({ extended: true }));
// xử lý dữ liệu gửi dưới dạng x-www-form-urlencoded
app.use(cookieParser());
// sử dụng cookie parser để đọc cookie từ request
app.use(cors())


initWebRoutes(app);

let port = process.env.PORT || 3000;

const wsServer = new WebSocketServer({ 
    server: app.listen(port, () => {
        console.log(`App is running at the port ${port}`);
    }), 
    path: '/ws'
});

routeTableBooking(wsServer);