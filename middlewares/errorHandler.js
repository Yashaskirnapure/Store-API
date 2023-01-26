const errorHandler = (err, req, res, next) => {
    console.log(err.stack);
    return res.status(500).send('something went wrong, please try again');
}

module.exports = {errorHandler};