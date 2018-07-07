import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link, NavLink } from 'react-router-dom';
import { ProductData } from './FetchProduct';

interface AddProductDataState {
    title: string;
    loading: boolean;
    ProductData: ProductData;
}
debugger;
export class AddProduct extends React.Component<RouteComponentProps<{}>, AddProductDataState> {
    constructor(props: RouteComponentProps<{}> | undefined) {
        super(props);

        this.state = { title: "", loading: true, ProductData: new ProductData };

        var productid = this.props.match.params["productid"];

        // This will set state for Edit Product  
        if (productid > 0) {
            debugger;
            fetch('/Product/GetProductData/' + productid)
                .then(response => response.json() as Promise<ProductData>)
                .then(data => {
                    this.setState({ title: "Edit", loading: false, ProductData: data });
                });
        }

        // This will set state for Add Product  
        else {
            this.state = { title: "Create", loading: false, ProductData: new ProductData };
        }

        // This binding is necessary to make "this" work in the callback  
        this.handleSave = this.handleSave.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }

    public render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderCreateForm();

        return <div>
            <h1>{this.state.title}</h1>
            <h3>Product</h3>
            <hr />
            {contents}
        </div>;
    }

    // This will handle the submit form event.  
    private handleSave(event) {
        debugger;
        event.preventDefault();
        const data = new FormData(event.target);

        // PUT request for Edit customer.  
        if (this.state.ProductData.productId) {
            fetch('/Product/UpdateProduct', {
                method: 'PUT',
                body: data,

            }).then((response) => response.json())
                .then((responseJson) => {
                    this.props.history.push("/FetchProduct");
                })
        }

        // POST request for Add Product.
        else {
            fetch('/Product/AddProduct/' + ProductData, {
                method: 'POST',
                body: data,

            }).then((response) => response.json())
                .then((responseJson) => {
                    this.props.history.push("/FetchProduct");
                })
        }
    }

    // This will handle Cancel button click event.  
    private handleCancel(e) {
        e.preventDefault();
        this.props.history.push("/fetchproduct");
    }

    // Returns the HTML Form to the render() method.  
    private renderCreateForm() {
        return (
            <form onSubmit={this.handleSave} >
                <div className="form-group row" >
                    <input className="form-control" type="hidden" name="productId" defaultValue={this.state.ProductData.productId} />
                </div>
                < div className="form-group row" >
                    <label className=" control-label col-md-12" htmlFor="name">Name</label>
                    <div className="col-md-4">
                        <input className="form-control" type="text" name="name" defaultValue={this.state.ProductData.name} required />
                    </div>
                </div >
                <div className="form-group row">
                    <label className="control-label col-md-12" htmlFor="price">Price</label>
                    <div className="col-md-4">
                        <input className="form-control" type="text" name="price" defaultValue={this.state.ProductData.price} required />
                    </div>
                </div >
                <div className="form-group">
                    <button type="submit" className="btn btn-default">Save</button>
                    <button className="btn" onClick={this.handleCancel}>Cancel</button>
                </div >
            </form >
        )
    }
}  