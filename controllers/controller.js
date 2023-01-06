const Item = require('../models/item');

const getItems = (req, res) => {
    return res.status(200).send("list of products");
}

const postItem = (req, res) => {
    const {itemName} = req.body;
    return res.status(201).send(`${itemName} posted`);
}

const getSingleItem = (req, res) => {
    const {id} = req.params;
    return res.status(200).send(`${id} product found`);
}

const addToCart = (req, res) => {
    const {itemName} = req.body;
    const {id} = req.params;
    return res.status(201).send(`${itemName} patch for item id ${id}`);
}

module.exports = {
    getItems,
    postItem,
    getSingleItem,
    addToCart
};