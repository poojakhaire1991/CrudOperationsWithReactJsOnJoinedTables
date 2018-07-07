import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link, NavLink } from 'react-router-dom';
import { CustomerData } from './FetchCustomer';

interface AddCustomerDataState {
    title: string;
    loading: boolean;
    custData: CustomerData;
}
debugger;
export class AddCustomer extends React.Component<RouteComponentProps<{}>, AddCustomerDataState> {
    constructor(props: RouteComponentProps<{}> | undefined) {
        super(props);

        this.state = { title: "", loading: true, custData: new CustomerData };

        var custid = this.props.match.params["custid"];

        // This will set state for Edit customer  
        if (custid > 0) {
            fetch('/Customer/GetCustomerData/' + custid)
                .then(response => response.json() as Promise<CustomerData>)
                .then(data => {
                    this.setState({ title: "Edit", loading: false, custData: data });
                });
        }

        // This will set state for Add customer  
        else {
            this.state = { title: "Create", loading: false, custData: new CustomerData };
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
            <h3>Customer</h3>
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
        if (this.state.custData.customerId) {
            fetch('/Customer/UpdateCustomer', {
                method: 'PUT',
                body: data,

            }).then((response) => response.json())
                .then((responseJson) => {
                    this.props.history.push("/FetchCustomer");
                })
        }

        // POST request for Add customer.  
        else {
            fetch('/Customer/AddCustomer/' + CustomerData, {
                method: 'POST',
                body: data,

            }).then((response) => response.json())
                .then((responseJson) => {
                    this.props.history.push("/FetchCustomer");
                })
        }
    }

    // This will handle Cancel button click event.  
    private handleCancel(e) {
        e.preventDefault();
        this.props.history.push("/fetchcustomer");
    }

    // Returns the HTML Form to the render() method.  
    private renderCreateForm() {
        return (
            <form onSubmit={this.handleSave} >
                <div className="form-group row" >
                    <input className="form-control" type="hidden" name="customerId" defaultValue={this.state.custData.customerId} />
                </div>
                < div className="form-group row" >
                    <label className=" control-label col-md-12" htmlFor="name">Name</label>
                    <div className="col-md-4">
                        <input className="form-control" type="text" name="name" defaultValue={this.state.custData.name} required />
                    </div>
                </div >
                <div className="form-group row">
                    <label className="control-label col-md-12" htmlFor="address">Address</label>
                    <div className="col-md-4">
                        <input className="form-control" type="text" name="address" defaultValue={this.state.custData.address} required />
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