const PORT = 5000;

require('express-async-errors');
require('dotenv').config();
const express = require('express');
const morgan = require('morgan');

const app = express();

const {router} = require('./routers/router');
const {connectDB} = require('./database/connect');
const {errorHandler} = require('./middlewares/errorHandler');

app.use(express.json());
app.use(morgan('tiny'));
app.use('/api/v1/items', router);
app.use(errorHandler);

const start = async () => {
    try{
        await connectDB(process.env.MONGO_URI);
        console.log("connected to database");
        app.listen(PORT, () => {
            console.log(`server listening to port ${PORT}`);
        });
    }catch(err){
        console.log("error connecting database");
    }
}
start();