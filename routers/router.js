const {
    getItems,
    postItem,
    getSingleItem,
    addToCart
} = require('../controllers/controller');

const express = require('express');
const router = express.Router();

router.route('/').get(getItems).post(postItem);
router.route('/:id').get(getSingleItem).patch(addToCart);

module.exports = {router};