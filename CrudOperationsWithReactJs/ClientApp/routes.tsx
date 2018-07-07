import * as React from 'react';
import { Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchCustomer } from './components/FetchCustomer';
import { AddCustomer } from './components/AddCustomer';
import { FetchProduct } from './components/FetchProduct';
import { AddProduct } from './components/AddProduct';
import { FetchStore } from './components/FetchStore';
import { AddStore } from './components/AddStore';
import { FetchProductSold } from './components/FetchProductSold';
import { AddProductSold } from './components/AddProductSold';

export const routes = <Layout>
    <Route exact path='/' component={Home} />
    <Route path='/fetchcustomer' component={FetchCustomer} />
    <Route path='/customer/UpdateCustomer/:custid' component={AddCustomer} />
    <Route path='/addcustomer' component={AddCustomer} />
    <Route path='/fetchproduct' component={FetchProduct} />
    <Route path='/product/UpdateProduct/:productid' component={AddProduct} />
    <Route path='/addproduct' component={AddProduct} />
    <Route path='/fetchstore' component={FetchStore} />
    <Route path='/store/UpdateStore/:storeid' component={AddStore} />
    <Route path='/addstore' component={AddStore} />
    <Route path='/fetchproductsold' component={FetchProductSold} />
    <Route path='/productsold/UpdateProductSold/:productsoldid' component={AddProductSold} />
    <Route path='/addproductsold' component={AddProductSold} />
</Layout>;