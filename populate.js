require('dotenv').config();

const {connectDB} = require('./database/connect');
const {Item} = require('./models/item');
const Product = require('./products.json');

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        await Item.deleteMany();
        await Item.create(Product);
        console.log("success");
        process.exit(0);
    } catch (error) {
        console.log(error);
        process.exit(0);
    }
}

start();