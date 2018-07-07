using System;
using System.Collections.Generic;

namespace CrudOperationsWithReactJs.Models
{
    public partial class ProductSold
    {
        public string Id { get; set; }
        public string CustomerId { get; set; }
        public string ProductId { get; set; }
        public string StoreId { get; set; }
        public DateTime DateSold { get; set; }

        public Customer Customer { get; set; }
        public Product Product { get; set; }
        public Store Store { get; set; }
    }
}
