/*global define, JSON*/
define('controllers/cartController', {
    init: function ($, routes, viewEngine, Cart, cart, user) {
        "use strict";

        // GET /#/cart
        // cart
        routes.get(/^\/#\/cart\/?/i, function (context) {
            
            viewEngine.setView({
                template: 't-cart',
                data: {
                    cart: cart,
                    user: user
                }
            });
        });

    }
});
