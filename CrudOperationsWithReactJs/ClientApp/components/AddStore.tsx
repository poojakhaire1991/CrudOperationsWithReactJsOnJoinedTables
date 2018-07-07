import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link, NavLink } from 'react-router-dom';
import { StoreData } from './FetchStore';

interface AddStoreDataState {
    title: string;
    loading: boolean;
    StoreData: StoreData;
}

export class AddStore extends React.Component<RouteComponentProps<{}>, AddStoreDataState> {
    constructor(props: RouteComponentProps<{}> | undefined) {
        super(props);

        this.state = { title: "", loading: true, StoreData: new StoreData };

        var storeid = this.props.match.params["storeid"];

        // This will set state for Edit Store
        if (storeid > 0) {
            debugger;
            fetch('/Store/GetStoreData/' + storeid)
                .then(response => response.json() as Promise<StoreData>)
                .then(data => {
                    this.setState({ title: "Edit", loading: false, StoreData: data });
                });
        }

        // This will set state for Add Store
        else {
            this.state = { title: "Create", loading: false, StoreData: new StoreData };
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
            <h3>Store</h3>
            <hr />
            {contents}
        </div>;
    }

    // This will handle the submit form event.  
    private handleSave(event) {
        debugger;
        event.preventDefault();
        const data = new FormData(event.target);

        // PUT request for Edit Store.
        if (this.state.StoreData.storeId) {
            fetch('/Store/UpdateStore', {
                method: 'PUT',
                body: data,

            }).then((response) => response.json())
                .then((responseJson) => {
                    this.props.history.push("/FetchStore");
                })
        }

        // POST request for Add Store.
        else {
            fetch('/Store/AddStore/' + StoreData, {
                method: 'POST',
                body: data,

            }).then((response) => response.json())
                .then((responseJson) => {
                    this.props.history.push("/FetchStore");
                })
        }
    }

    // This will handle Cancel button click event.  
    private handleCancel(e) {
        e.preventDefault();
        this.props.history.push("/fetchstore");
    }

    // Returns the HTML Form to the render() method.  
    private renderCreateForm() {
        return (
            <form onSubmit={this.handleSave} >
                <div className="form-group row" >
                    <input className="form-control" type="hidden" name="storeId" defaultValue={this.state.StoreData.storeId} />
                </div>
                < div className="form-group row" >
                    <label className=" control-label col-md-12" htmlFor="name">Name</label>
                    <div className="col-md-4">
                        <input className="form-control" type="text" name="name" defaultValue={this.state.StoreData.name} required />
                    </div>
                </div >
                <div className="form-group row">
                    <label className="control-label col-md-12" htmlFor="address">Address</label>
                    <div className="col-md-4">
                        <input className="form-control" type="text" name="address" defaultValue={this.state.StoreData.address} required />
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