using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using CrudOperationsWithReactJs.Models;

namespace CrudOperationsWithReactJs.Controllers
{
    public class StoreController : Controller
    {
        MarsOnboardingContext db = new MarsOnboardingContext();
        public IEnumerable<Store> Index()
        {
            var store = db.Store.ToList();
            return store;
        }
        public int AddStore(Store store)
        {
            string storeId = db.Store.Max(m => m.StoreId);
            int store1 = Convert.ToInt32(storeId) + 1;
            store.StoreId = Convert.ToString(store1);
            db.Store.Add(store);
            db.SaveChanges();
            return 1;
        }
        public Store GetStoreData(string id)
        {
            //int id1 = Convert.ToInt32(id);
            Store store = db.Store.Find(id);
            return store;
        }
        public int UpdateStore(Store store)
        {
            db.Entry(store).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
            db.SaveChanges();
            return 1;
        }
        public int DeleteStore(string id)
        {
            Store store = db.Store.Find(id);
            ProductSold pSold = db.ProductSold.Find(id);
            db.ProductSold.Remove(pSold);
            db.Store.Remove(store);
            db.SaveChanges();
            return 1;
        }
    }
}