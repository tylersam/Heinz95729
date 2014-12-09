﻿/*jslint nomen: true*/
/*global define*/
define('models/payment', {
    init: function (ko, viewEngine) {
        "use strict";

        if (!ko) {
            throw new Error('Argument Exception: ko is required to init the payment module');
        }

        function stripeResponseHandler(status, response, cart) {
            
            if (response.error) {
                var form = $('#payment-form');
                form.find('.payment-errors').text(response.error.message);
                // form.find('button').prop('disabled', false);
            } else {
                var token = response.id;
                console.log("Stripe token: " + token);
                
                $.ajax({
                    url: "/api/order/charge",
                    method: 'GET',
                    data: {
                        t: token,
                        a: cart.total(),
                        d: ""
                    }
                }).done(function (data) {
                    //Data will contain the response object (see example response object at bottom of class
                    console.log("Charge results: " + data);
                    var chargeResults = JSON.parse(data);

                    var chargeSuccess = chargeResults.paid;
                    console.log("Charge success: " + chargeSuccess);
                    if (chargeSuccess) {
                        console.log("Charge successful");
                        var cardId = chargeResults.card.id;
                        createOrder(cart, cardId);
                    } else {

                    }
                    /*
                    var order = chargeResults.order;

                    if (chargeResults.success) {
                        orderSuccessCleanup(order);
                    } else {
                        //Need to handle case where charge was not successful                    
                    }
                    */
                });
                
             

                
            }
        };

        function createOrder(cart, cardId) {
            console.log("Create order function");
            $.ajax({
                url: "/api/order/add",
                data: {
                    cartId: cart.userId,
                    cardId: cardId
                }
            }).done(function (data) {
                var orderResponse = JSON.parse(data);
                console.log("Create order response: " + orderResponse);
                orderSuccessCleanup(cart, orderResponse);
            });
        }
        var orderSuccessCleanup = function (cart, order) {
            //Stripe charge complete, clean the cart and redirect to the confirmation page
            $.ajax({
                url: "/api/cart/clean"
            }).done(function (data) {
                console.log("Clean API call results: " + data);
                cart.clean();

                //window.location.href = '/#/confirmation';
                viewEngine.setView({
                    template: 't-confirmation',
                    data: {
                        order: order
                    }
                });
            });
        }

        var Payment = function(cart) {
            var self = this;

            self.months = ko.observableArray(["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"]);
            self.years = ko.observableArray(["2014", "2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022", "2023"]);

            self.cart = cart;
            self.cardNum = ko.observable();
            self.cvc = ko.observable();
            self.expMonth = ko.observable("MM");
            self.expYear = ko.observable("YYYY");
            self.billingName = ko.observable();
            self.billingAddr1 = ko.observable();
            self.billingAddr2 = ko.observable();
            self.billingCity = ko.observable();
            self.billingState = ko.observable();
            self.billingZip = ko.observable();
            self.billingCountry = ko.observable();

            self.submitPay = function () {
                Stripe.card.createToken({
                    number: self.cardNum(),
                    cvc: self.cvc(),
                    exp_month: self.expMonth(),
                    exp_year: self.expYear()
                }, function (status, response) {
                    stripeResponseHandler(status, response, self.cart);
                });
            };

            self.editCart = function () {
                window.location.href = "/#/cart";
            };

        };

        return Payment;
    }
});

/*
{
    "id": "ch_157YR32eZvKYlo2Cz4E1Nrbt",
    "object": "charge",
    "created": 1418071729,
    "livemode": false,
    "paid": true,
    "amount": 500,
    "currency": "usd",
    "refunded": false,
    "captured": true,
    "refunds": {
        "object": "list",
        "total_count": 0,
        "has_more": false,
        "url": "/v1/charges/ch_157YR32eZvKYlo2Cz4E1Nrbt/refunds",
        "data": [

        ]
    },
  "card": {
      "id": "card_157YR32eZvKYlo2CdIzy1FKw",
      "object": "card",
      "last4": "4242",
      "brand": "Visa",
      "funding": "credit",
      "exp_month": 1,
      "exp_year": 2050,
      "fingerprint": "Xt5EWLLDS7FJjR1c",
      "country": "US",
      "name": null,
      "address_line1": null,
      "address_line2": null,
      "address_city": null,
      "address_state": null,
      "address_zip": null,
      "address_country": null,
      "cvc_check": "pass",
      "address_line1_check": null,
      "address_zip_check": null,
      "dynamic_last4": null,
      "customer": null
  },
  "balance_transaction": "txn_1556di2eZvKYlo2CVImgMpjA",
  "failure_message": null,
  "failure_code": null,
  "amount_refunded": 0,
  "customer": null,
  "invoice": null,
  "description": null,
  "dispute": null,
  "metadata": {
  },
  "statement_description": null,
  "fraud_details": {
      "stripe_report": "unavailable",
      "user_report": null
  },
  "receipt_email": null,
  "receipt_number": null,
  "shipping": null
}
*/