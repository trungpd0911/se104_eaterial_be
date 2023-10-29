const express = require('express');
const bodyParser = require('body-parser');
const initWebRoutes = require('./routes/web');
require('dotenv').config();

let app = express();

//config app 
app.use(bodyParser.json());
//  xử lý các yêu cầu HTTP gửi dưới dạng JSON 
app.use(bodyParser.urlencoded({ extended: true }));
// xử lý dữ liệu gửi dưới dạng x-www-form-urlencoded


initWebRoutes(app);

let port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`App is running at the port ${port}`);
})