import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link, NavLink } from 'react-router-dom';
import { ProductSoldData } from './FetchProductSold';

interface AddProductSoldDataState {
    title: string;
    loading: boolean;
    ProductSoldData: ProductSoldData;
}
debugger;
export class AddProductSold extends React.Component<RouteComponentProps<{}>, AddProductSoldDataState> {
    constructor(props: RouteComponentProps<{}> | undefined) {
        super(props);

        this.state = { title: "", loading: true, ProductSoldData: new ProductSoldData };

        var productsoldid = this.props.match.params["productsoldid"];

        // This will set state for Edit customer  
        if (productsoldid > 0) {
            fetch('/ProductSold/GetProductSoldData/' + productsoldid)
                .then(response => response.json() as Promise<ProductSoldData>)
                .then(data => {
                    this.setState({ title: "Edit", loading: false, ProductSoldData: data });
                });
        }

        // This will set state for Add ProductSold
        else {
            this.state = { title: "Create", loading: false, ProductSoldData: new ProductSoldData };
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
            <h3>ProductSold</h3>
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
        if (this.state.ProductSoldData.id) {
            fetch('/ProductSold/UpdateProductSold', {
                method: 'PUT',
                body: data,

            }).then((response) => response.json())
                .then((responseJson) => {
                    this.props.history.push("/FetchProductSold");
                })
        }

        // POST request for Add ProductSold.
        else {
            fetch('/ProductSold/AddProductSold/' + ProductSoldData, {
                method: 'POST',
                body: data,

            }).then((response) => response.json())
                .then((responseJson) => {
                    this.props.history.push("/FetchProductSold");
                })
        }
    }

    // This will handle Cancel button click event.  
    private handleCancel(e) {
        e.preventDefault();
        this.props.history.push("/fetchproductsold");
    }

    // Returns the HTML Form to the render() method.  
    private renderCreateForm() {
        return (
            <form onSubmit={this.handleSave} >
                <div className="form-group row" >
                    <input className="form-control" type="hidden" name="id" defaultValue={this.state.ProductSoldData.id} />
                </div>
                < div className="form-group row" >
                    <label className=" control-label col-md-12" htmlFor="customerId">CustomerId</label>
                    <div className="col-md-4">
                        <input className="form-control" type="text" name="customerId" defaultValue={this.state.ProductSoldData.customerId} required />
                    </div>
                </div >
                <div className="form-group row">
                    <label className="control-label col-md-12" htmlFor="productId">ProductId</label>
                    <div className="col-md-4">
                        <input className="form-control" type="text" name="productId" defaultValue={this.state.ProductSoldData.productId} required />
                    </div>
                </div >
                <div className="form-group-row">
                    <label className="control-label col-md-12" htmlFor="storeId">StoreId</label>
                    <div className="col-md-4">
                        <input className="form-control" type="text" name="storeId" defaultValue={this.state.ProductSoldData.storeId} required />
                    </div>
                </div>
                <div className="form-group-row">
                    <label className="control-label col-md-12" htmlFor="dateSold">DateSold</label>
                    <div className="col-md-4">
                        <input className="form-control" type="date" name="dateSold" defaultValue={this.state.ProductSoldData.dateSold} required />
                    </div>
                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-default">Save</button>
                    <button className="btn" onClick={this.handleCancel}>Cancel</button>
                </div >
            </form >
        )
    }
}  