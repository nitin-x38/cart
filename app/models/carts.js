'use strict';

var mongoose = require('mongoose');

var carts = mongoose.Schema({
    cartId: {
        type: 'String',
        required: true,
        unique: true
    },
    userId: {
        type: 'Number',
        required: true
    },
    productId: {
        type: 'String',
        required: true
    },
    status: {
        type: 'String',
        required: true,
        default:"ACTIVE"
    },
    amount: {
        type: 'Number',
        required: true
    },
    title:{
        type: "String",
        required:true
    }
});

var connection = mongoose.createConnection('mongodb://localhost:27017/carts', { 
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

module.exports = connection.model('carts', carts, 'carts');