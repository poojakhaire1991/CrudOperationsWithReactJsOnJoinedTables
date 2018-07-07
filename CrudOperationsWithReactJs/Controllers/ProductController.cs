using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using CrudOperationsWithReactJs.Models;

namespace CrudOperationsWithReactJs.Controllers
{
    public class ProductController : Controller
    {
        MarsOnboardingContext db = new MarsOnboardingContext();
        public IEnumerable<Product> Index()
        {
            var prod = db.Product.ToList();
            return prod;
        }
        public int AddProduct(Product prod)
        {
            string prodId = db.Product.Max(m => m.ProductId);
            int prod1 = Convert.ToInt32(prodId) + 1;
            prod.ProductId = Convert.ToString(prod1);
            db.Product.Add(prod);
            db.SaveChanges();
            return 1;
        }
        public Product GetProductData(string id)
        {
            //int id1 = Convert.ToInt32(id);
            Product prod = db.Product.Find(id);
            return prod;
        }
        public int UpdateProduct(Product prod)
        {
            db.Entry(prod).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
            db.SaveChanges();
            return 1;
        }
        public int DeleteProduct(string id)
        {
            Product prod = db.Product.Find(id);
            ProductSold pSold = db.ProductSold.Find(id);
            db.ProductSold.Remove(pSold);
            db.Product.Remove(prod);
            db.SaveChanges();
            return 1;
        }
    }
}