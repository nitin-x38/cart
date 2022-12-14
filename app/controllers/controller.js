'use strict';

const SERVICES = require("../services/services");

var controllers = {

    getUserCart: async function (req, res) {

        let userId = req.body.userId;
        try {
            let findQuery = { userId: userId, status: "ACTIVE" };
            let data = await SERVICES.getUserCart(findQuery, { cartId: 1, userId: 1, productId: 1, status: 1, amount: 1, title: 1 }, {}, 0, 100);

            let total = 0;
            let shipping=0;
            let tax=0;
            let discount=0;
            let finaltotal=0;

            for (let i = 0; i < data.length; i++) {
                let temp = data[i];

                total=total+temp.amount;
            }

            if(total>200){
                shipping = 50;
            }
            if(total>400){
                discount= Math.round(total * (5/100));
            }

            tax=Math.round(total * (18/100));

            finaltotal = total + shipping + tax - discount;


            let dataObj={
                products:data,
                summary:{
                    cartTotal:total,
                    shipping:shipping,
                    tax:tax,
                    discount:discount,
                    finalTotal:finaltotal
                }
            }

            let response = {
                success: 1,
                data: dataObj
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
            let cartData = req.body;
            // let cartId=req.body.cartId;
            let userId = req.body.userId;
            let productId = req.body.productId;
            // let status=req.body.status;
            let amount = req.body.amount;
            let title = req.body.title;

            if (userId == null || userId == undefined || isNaN(userId)) {
                throw new Error("User ID must be filled out.");
            }

            if (productId == null || productId == undefined) {
                throw new Error("Product ID must be filled out.");
            }

            if (amount == null || amount == undefined || isNaN(amount)) {
                throw new Error("Amount must be filled out.");
            }

            if (title == null || title == undefined || title.length == 0) {
                throw new Error("Title must be filled out.");
            }

            //CHECK PRODUCT IN CART
            let findQuery = { userId: userId, productId: productId, status: "ACTIVE" };
            let fdata = await SERVICES.getUserCart(findQuery, { userId: 1, productId: 1 }, {}, 0, 0)
            if (fdata.length > 0) {
                throw new Error("The Product is already exist in a cart.")
            }
            let data = await SERVICES.addProductToCart(cartData);
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
            let cartId=req.body.cartId;
            let userId=req.body.userId; //cartId/userId

         try {

             //check//active cartId
             let findQuery ={cartId:cartId, userId:userId, status:"ACTIVE"};
             //pass cartId
             let data = await SERVICES.removeProductFromCart(findQuery);


             let response = {
                 success: 1,
                 data:data,
                 abc:findQuery,
                 cartId:cartId
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