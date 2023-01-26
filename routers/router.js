const {
    getItems,
    getAllItem
} = require('../controllers/controller');

const express = require('express');
const router = express.Router();

router.route('/static').get(getItems)
router.route('/').get(getAllItem);

module.exports = {router};