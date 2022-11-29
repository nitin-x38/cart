"use strict";

const CARTS_MODEL = require("../models/carts");


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

    updateProduct: async function(filter,updateData) {
        try{

            //filter={productId:1004};
            //updateData={ $set:{ productPrice:70} }
            console.log(filter,updateData);
            var data = await CARTS_MODEL.update(filter, updateData,{multi:false});
            console.log(updateData);
            return data;
        }catch(e){
            console.log(e);
            return 0;
        }
    },

    removeProductFromCart: async function(findQuery,deleteData) {
        try{
            console.log(findQuery,deleteData);
            var data = await CARTS_MODEL.deleteMany(findQuery);
            console.log(deleteData);
            return data;
        }catch(e){
            console.log(e);
            return 0;
        }
    },

    addProductToCart: async function(cartData) {
        try {

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
