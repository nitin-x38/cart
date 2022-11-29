'use strict';

const Controller = require('./controllers/controller');

module.exports = function (app) {

    app.route('/cart/addProductToCart').post(Controller.addProductToCart);
    app.route('/cart/getUserCart').post(Controller.getUserCart);
    app.route('/cart/removeProductFromCart').post(Controller.removeProductFromCart);

}