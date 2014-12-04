﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Moviq.Interfaces;
using Moviq.Interfaces.Models;

namespace Moviq.Domain.Order
{
    public class Order 
    {
        ICart cart;
        IPayment payment;
        IShipping shipDetails;       
    }
}