﻿
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Web;
    using Nancy;
    using Moviq.Helpers;
    using Nancy.TinyIoc;
using Moviq.Interfaces.Services;
using Moviq.Interfaces;
using Moviq.Interfaces.Models;
using Moviq.Domain.Order;
using Moviq.Domain.Cart;

    namespace Moviq.Api
    {
        public class OrderModule : NancyModule
        {
            public OrderModule(IModuleHelpers helper, IOrderDomain orderDomain, IOrderHistoryDomain orderHistoryDomain,
                ICartDomain cartDomain, IProductDomain bookDomain)
            {
                this.Get["/api/order/get", true] = async (args, cancellationToken) =>
                {
                    //identify user and get the order
                    var amount = this.Request.Query.a;
                    var quant = this.Request.Query.q;
                    var currUser = this.Context.CurrentUser;
                    if (currUser != null)
                    {
                        ICustomClaimsIdentity currentUser = AmbientContext.CurrentClaimsPrinciple.ClaimsIdentity;
                        string guid = currentUser.GetAttribute(AmbientContext.UserPrincipalGuidAttributeKey).ToString();

                        IOrder order;                        
                        order = orderDomain.Repo.Get(guid);
                        return helper.ToJson(order);
                    }
                    return helper.ToJson("user not logged in");
                };

                this.Get["/api/orderhistory/get", true] = async (args, cancellationToken) =>
                {
                    //identify user and get the order
                    var amount = this.Request.Query.a;
                    var quant = this.Request.Query.q;
                    var currUser = this.Context.CurrentUser;
                    if (currUser != null)
                    {
                        ICustomClaimsIdentity currentUser = AmbientContext.CurrentClaimsPrinciple.ClaimsIdentity;
                        string guid = currentUser.GetAttribute(AmbientContext.UserPrincipalGuidAttributeKey).ToString();

                        IOrderHistory orderHistory;
                        orderHistory = orderHistoryDomain.Repo.Get(guid);

                        return helper.ToJson(orderHistory);
                    }
                    return helper.ToJson("user not logged in");
                };

                this.Get["/api/orderhistorydetails/get", true] = async (args, cancellationToken) =>
                {
                    //identify user and get the order
                    var amount = this.Request.Query.a;
                    var quant = this.Request.Query.q;
                    var currUser = this.Context.CurrentUser;
                    if (currUser != null)
                    {
                        ICustomClaimsIdentity currentUser = AmbientContext.CurrentClaimsPrinciple.ClaimsIdentity;
                        string guid = currentUser.GetAttribute(AmbientContext.UserPrincipalGuidAttributeKey).ToString();

                        IOrderHistory orderHistory;
                        orderHistory = orderHistoryDomain.Repo.Get(guid);

                        OrderList ordList = getOrderHistoryList(orderHistory, orderDomain, guid);
                        return helper.ToJson(ordList);
                    }
                    return helper.ToJson("user not logged in");
                };

                this.Get["/api/order/add"] = args =>
                {
                    var currUser = this.Context.CurrentUser;
                    IOrder order;
                    IOrderHistory orderHistory;
                    if (currUser != null)
                    {
                        ICustomClaimsIdentity currentUser = AmbientContext.CurrentClaimsPrinciple.ClaimsIdentity;
                        string guid = currentUser.GetAttribute(AmbientContext.UserPrincipalGuidAttributeKey).ToString();

                        orderHistory = orderHistoryDomain.Repo.Get(guid);

                        //if (orderHistory == null)
                        //{
                        //    orderHistory = new OrderHistory(new Guid(guid));
                        //}
                        //var tempOrder = this.Context.Parameters.Order;
                        ICart cart = cartDomain.Repo.Get(this.Request.Query.cartId);

                        CartProducts cartProds = populateProducts(cart, bookDomain, guid);

                        order = new Order(cart, this.Request.Query.cardId, cartProds.totalPrice, cartProds.count);

                        order = orderDomain.Repo.Set(order);

                        orderHistory.addOrder(order.oid);

                        orderHistory = orderHistoryDomain.Repo.Set(orderHistory);

                        return helper.ToJson(order);
                    }
                    return helper.ToJson("user not logged in");
                };

                this.Get["/api/order/charge", true] = async (args, cancellationToken) =>
                {
                    //identify user and get the order
                    var amount = this.Request.Query.a;
                    var desc = this.Request.Query.d;
                    var token = this.Request.Query.t;

                    var currUser = this.Context.CurrentUser;
                    if (currUser != null)
                    {
                        ICustomClaimsIdentity currentUser = AmbientContext.CurrentClaimsPrinciple.ClaimsIdentity;
                        string guid = currentUser.GetAttribute(AmbientContext.UserPrincipalGuidAttributeKey).ToString();

                        Charge charge = new Charge();
                        return charge.BuildStripePostRequest(amount, desc, token);
                    }
                    return helper.ToJson("user not logged in");
                };
            }

            private CartProducts populateProducts(ICart cart, IProductDomain bookDomain, string guid)
            {
                CartProducts cartProds = new CartProducts(new Guid(guid));

                if (cart.prodQuantity.Count != 0)
                {
                    List<string> keys = new List<string>(cart.prodQuantity.Keys);
                    List<IProduct> productList = new List<IProduct>();

                    foreach (string uid in keys)
                    {
                        productList.Add(bookDomain.Repo.Get(uid));
                    }
                    cartProds.populateProducts(productList, cart.prodQuantity);
                }

                return cartProds;
            }

            public OrderList getOrderHistoryList(IOrderHistory oh, IOrderDomain orderDomain, string guid)
            {
                OrderList ordList = new OrderList(new Guid(guid));

                if (oh.orders.Count != 0)
                {
                    List<string> keys = oh.orders.ToList<string>();                    

                    foreach (string oid in keys)
                    {
                        ordList.addOrder(orderDomain.Repo.Get(oid));
                    }                    
                }

                return ordList;
            }
        }
    }
