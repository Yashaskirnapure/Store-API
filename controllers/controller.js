const { query } = require('express');
const {Item} = require('../models/item');

const getItems = async (req, res) => {
    const query = await Item.find({});
    return res.status(200).json({query, hits : query.length});
};

const getAllItem = async (req, res) => {
    const {featured, company, name, sort, field, numericFilter} = req.query;
    let query = {};

    //filter
    if(featured) query.featured = featured === 'true' ? true : false;
    if(company) query.company = company;
    if(name) query.name = {$regex : name , $options : 'i'};

    //numeric filter
    if(numericFilter){
        const operatorMap = {
            '>' : '$gt',
            '<' : '$lt',
            '>=' : '$gte',
            '<=' : '$lte',
            '=' : '$eq'
        }
        const regex = /\b(>|<|>=|<=|=)\b/g;
        const match = regex.exec(numericFilter);
        let filter = numericFilter.replace(regex, (match) => `-${operatorMap[match]}-`);
        const options = ['price', 'rating'];

        filter = filter.split(',').forEach((item) => {
            const [field, operator, value] = item.split('-');
            console.log(field);
            if(options.includes(field)){
                query[field] = {[operator] : Number(value)};
            }
        });
    }
    
    let items = Item.find(query);

    //sorting
    if(sort){
        const sortList = sort.split(',').join(' ');
        items = items.sort(sortList);
    }else items = items.sort('name');

    //selecting fields
    if(field){
        const selectList = field.split(',').join(' ');
        items = items.select(selectList);
    }else items = items.select('name company');

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page-1)*limit;

    items = items.skip(skip).limit(limit);

    const result = await items;
    return res.status(200).json({result, hits : result.length, page});
};

module.exports = {
    getItems,
    getAllItem
};