using System;
using System.Collections.Generic;

namespace CrudOperationsWithReactJs.Models
{
    public partial class Customer
    {
        public Customer()
        {
            ProductSold = new HashSet<ProductSold>();
        }

        public string CustomerId { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }

        public ICollection<ProductSold> ProductSold { get; set; }
    }
}
