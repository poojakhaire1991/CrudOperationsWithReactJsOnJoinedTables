using System;
using System.Collections.Generic;

namespace CrudOperationsWithReactJs.Models
{
    public partial class Product
    {
        public Product()
        {
            ProductSold = new HashSet<ProductSold>();
        }

        public string ProductId { get; set; }
        public string Name { get; set; }
        public decimal Price { get; set; }

        public ICollection<ProductSold> ProductSold { get; set; }
    }
}
