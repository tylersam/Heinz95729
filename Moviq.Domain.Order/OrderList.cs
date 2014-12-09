using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Moviq.Interfaces.Models;

namespace Moviq.Domain.Order
{
    public class OrderList
    {
        public Guid guid { get; set; }
        public ICollection<IOrder> orderList;

        public OrderList(Guid guid)
        {
            this.guid = guid;
            orderList = new List<IOrder>();
        }

        public void addOrder(IOrder o)
        {
            orderList.Add(o);
        }
    }
}
