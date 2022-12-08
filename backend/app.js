const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')


const errorMiddleware = require('./middlewares/errors')


if (process.env.NODE_ENV !== 'PRODUCTION') {
    require('dotenv').config({ path: './config/config.env' })
}


app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(fileUpload());



const products = require('./routes/product');
const auth = require('./routes/auth');
const payment = require('./routes/payment');
const order = require('./routes/order');


app.use('/api/v1', products);
app.use('/api/v1', auth);
app.use('/api/v1', payment);
app.use('/api/v1', order);



app.use(errorMiddleware);

module.exports = app