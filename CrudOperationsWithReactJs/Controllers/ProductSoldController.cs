using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using CrudOperationsWithReactJs.Models;
using Microsoft.EntityFrameworkCore;

namespace CrudOperationsWithReactJs.Controllers
{
    public class ProductSoldController : Controller
    {
        MarsOnboardingContext db = new MarsOnboardingContext();
        public IEnumerable<ProductSold> Index()
        {
            using (db)
            {
                var pSold = db.ProductSold.ToList();
                return pSold;
            }

        }

        public int AddProductSold(ProductSold pSold)
        {
            string pId = db.ProductSold.Max(a => a.Id);
            int pId1 = Convert.ToInt32(pId) + 1;
            pSold.Id = Convert.ToString(pId1);
            db.ProductSold.Add(pSold);
            db.SaveChanges();
            return 1;
        }

        public ProductSold GetProductsoldData(string id)
        {
            var pSold = db.ProductSold.Find(id);
            return pSold;
        }

        public int UpdateProductSold(ProductSold pSold)
        {
            db.Entry(pSold).State = EntityState.Modified;
            db.SaveChanges();
            return 1;
        }

        public int DeleteProductSold(ProductSold pSold)
        {
            db.ProductSold.Remove(pSold);
            db.SaveChanges();
            return 1;
        }
    }
}
//        public JsonResult Add(ProductSold prod)
//        {
//            using (db)
//            {
//                db.ProductSolds.Add(prod);
//                db.SaveChanges();
//                return Json(prod, JsonRequestBehavior.AllowGet);
//            }
//        }

//        public JsonResult Edit(int id, ProductSold prod)
//        {
//            using (db)
//            {
//                var prod1 = db.ProductSolds.Find(id);
//                if (prod1 != null)
//                {
//                    db.Entry(prod1).State = EntityState.Detached;
//                }
//                db.Entry(prod).State = EntityState.Modified;
//                db.SaveChanges();
//                return Json(prod, JsonRequestBehavior.AllowGet);
//            }
//        }

//        public JsonResult Delete(int id)
//        {
//            using (db)
//            {
//                ProductSold prod = db.ProductSolds.Find(id);
//                db.ProductSolds.Remove(prod);
//                db.SaveChanges();
//                return Json(prod, JsonRequestBehavior.AllowGet);
//            }
//        }
//    }
//}