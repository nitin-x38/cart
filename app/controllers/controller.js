'use strict';

const products = require("../models/carts");
const { updateProduct } = require("../services/services");
const { deleteProduct } = require("../services/services");
const SERVICES=require("../services/services");

var controllers = {

    getUserCart: async function (req, res) {

        let status = req.body.status;
    try {
        let findQuery = {status:"Active"};
        let data=await SERVICES.getUserCart(findQuery,{cartId:1, userId:1, productId:1, status:1, amount:1, title:1},{},0,100);


        let response = {
            success: 1,
            data: data,
        }

        return res.send(response);

    } catch (e) {
        console.error(e);

        let response = {
            success: 0,
            message: e.message
        }

        return res.send(response);
    }
}, 

    addProductToCart: async function (req, res) {

        try {
            let cartData=req.body;
            let cartId=req.body.cartId;
            let userId=req.body.userId;
            let productId=req.body.productId;
            let status=req.body.status;
            let amount=req.body.amount;
            let title=req.body.title;

            if (cartId == null || cartId == undefined || isNaN(cartId)){
                throw new Error("Cart ID must be filled out.");
            }

            if (userId == null || userId == undefined || isNaN(userId)){
                throw new Error("User ID must be filled out.");
            }

            if (productId == null || productId == undefined){
                throw new Error("Product ID must be filled out.");
            }

            if (status == null || status == undefined || status == "Inactive"){
                throw new Error("Status must be an active .");
            }

            if (amount == null || amount == undefined || isNaN(amount)){
                throw new Error("Amount must be filled out.");
            }

            if (title == null || title == undefined || title.length == 0){
                throw new Error("Title must be filled out.");
            }

            let data=await SERVICES.addProductToCart(cartData);
            let response = {
                success: 1,
                data: data
            }

            return res.send(response);

        } catch (e) {
            console.error(e);

            let response = {
                success: 0,
                message: e.message
            }

            return res.send(response);
        }
    },
    
    removeProductFromCart: async function (req, res) {
        let productId=req.body.productId;
    try {
        let findQuery ={productId:productId};
        let data = await SERVICES.removeProductFromCart(findQuery);
    
    
        let response = {
            success: 1,
            data:data,
            abc:findQuery
        }
    
        return res.send(response);
    
    } catch (e) {
        console.error(e);
    
        let response = {
            success: 0,
            message: e.message
        }
    
        return res.send(response);
    }
},
};

module.exports = controllers;