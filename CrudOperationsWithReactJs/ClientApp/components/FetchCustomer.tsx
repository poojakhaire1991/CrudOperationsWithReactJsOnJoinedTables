import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link, NavLink } from 'react-router-dom';
import * as cust from './AddCustomer'

interface FetchCustomerDataState {
    custList: CustomerData[];
    loading: boolean;
}

export class FetchCustomer extends React.Component<RouteComponentProps<{}>, FetchCustomerDataState> {
    constructor() {
        super();
        this.state = { custList: [], loading: true };
        fetch('/Customer/Index')
            .then(response => response.json() as Promise<CustomerData[]>)
            .then(data => {
                this.setState({ custList: data, loading: false });
            });

        // This binding is necessary to make "this" work in the callback  
        this.handleDelete = this.handleDelete.bind(this);
        this.handleEdit = this.handleEdit.bind(this);

    }

    public render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderCustomerTable(this.state.custList);

        return <div>
            <h1>Customer Data</h1>
            <p>This component demonstrates fetching Customer data from the server.</p>
            <p>
                <Link to="/AddCustomer" > Create New</Link>
            </p>
            {contents}
        </div>;
    }

    // Handle Delete request for an Customer  
    private handleDelete(id: string) {
        if (!confirm("Do you want to delete customer with Id: " + id))
            return;
        else {
            fetch('/Customer/DeleteCustomer/' + id, {
                method: 'delete'
            }).then(data => {
                this.setState(
                    {
                        custList: this.state.custList.filter((rec) => {
                            return (rec.customerId != id);
                        })
                    });
            });
        }
    }

    private handleEdit(id: string) {
        this.props.history.push("/Customer/UpdateCustomer/" + id);
    }

    // Returns the HTML table to the render() method.  
    private renderCustomerTable(custList: CustomerData[]) {
        return <table className='table'>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Address</th>
                </tr>
            </thead>
            <tbody>
                {custList.map(item =>
                    <tr key={item.customerId}>
                        <td>{item.customerId}</td>
                        <td>{item.name}</td>
                        <td>{item.address}</td>
                        <td>
                            <button className="action" onClick={id => this.handleEdit(item.customerId)}>Edit</button>
                            <button className="action" onClick={id => this.handleDelete(item.customerId)}>Delete</button>
                        </td>
                    </tr>
                )}
            </tbody>
        </table>

    }
}

export class CustomerData {
    customerId: string = "";
    name: string = "";
    address: string = "";
}    