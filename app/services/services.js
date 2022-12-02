"use strict";

const CARTS_MODEL = require("../models/carts");
const UUID = require("uuid");

var cartServices = {
    
    getUserCart: async function(findQuery, selectQuery, sort, skip, limit) {

        var data = [];
        try {

            data = await CARTS_MODEL
                .find(findQuery, selectQuery)
                .read("secondaryPreferred")
                .sort(sort)
                .limit(limit)
                .skip(skip) 
                .lean();
        } catch (error) {
            console.log(error);
        }

        return data;

    },

    removeProductFromCart: async function(findQuery,deleteData) {
        try{

            //find/update//here
            console.log(findQuery,deleteData);
            var data = await CARTS_MODEL.deleteOne(findQuery);
            console.log(deleteData);
            return data;
        }catch(e){
            console.log(e);
            return 0;
        }
    },

    addProductToCart: async function(cartData) {
        try {

            let cartId=await UUID.v4();
            cartData.cartId=cartId;
            let cartObj = new CARTS_MODEL(cartData);
            let newProduct = await cartObj.save();
            return newProduct;

        } catch (error) {
            console.log(error);
            throw error;
        }
    }
};

module.exports = cartServices;
