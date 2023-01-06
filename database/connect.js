const mongoose = require('mongoose');

mongoose.set('strictQuery', false);
const connectDB = (uri) => {
    mongoose.connect(uri);
}

module.exports = {connectDB};