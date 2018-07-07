using System;
using System.Collections.Generic;

namespace CrudOperationsWithReactJs.Models
{
    public partial class Store
    {
        public Store()
        {
            ProductSold = new HashSet<ProductSold>();
        }

        public string StoreId { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }

        public ICollection<ProductSold> ProductSold { get; set; }
    }
}
