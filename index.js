const PORT = 5000;

const express = require('express');
const app = express();

//setting up request logger
const morgan = require('morgan');
app.use(morgan('tiny'));

//json parser
app.use(express.json());

//setting up routers
const {router} = require('./routers/router');
app.use('/api/v1/items', router);

require('dotenv').config();
const {connectDB} = require('./database/connect');
const start = async () => {
    try{
        await connectDB(process.env.MONGO_URI);
        console.log("connected to database");
        app.listen(PORT, () => {
            console.log(`server listening to port ${PORT}`)
        });
    }catch(err){
        console.log("error connecting database");
    }
}
start();