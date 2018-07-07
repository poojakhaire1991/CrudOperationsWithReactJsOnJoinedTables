import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link, NavLink } from 'react-router-dom';
import * as cust from './AddStore'

interface FetchStoreDataState {
    StoreList: StoreData[];
    loading: boolean;
}

export class FetchStore extends React.Component<RouteComponentProps<{}>, FetchStoreDataState> {
    constructor() {
        super();
        this.state = { StoreList: [], loading: true };
        fetch('/Store/Index')
            .then(response => response.json() as Promise<StoreData[]>)
            .then(data => {
                this.setState({ StoreList: data, loading: false });
            });

        // This binding is necessary to make "this" work in the callback  
        this.handleDelete = this.handleDelete.bind(this);
        this.handleEdit = this.handleEdit.bind(this);

    }

    public render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderStoreTable(this.state.StoreList);

        return <div>
            <h1>Store Data</h1>
            <p>This component demonstrates fetching Store data from the server.</p>
            <p>
                <Link to="/AddStore" > Create New</Link>
            </p>
            {contents}
        </div>;
    }

    // Handle Delete request for an Store
    private handleDelete(id: string) {
        if (!confirm("Do you want to delete Store with Id: " + id))
            return;
        else {
            fetch('/Store/DeleteStore/' + id, {
                method: 'delete'
            }).then(data => {
                this.setState(
                    {
                        StoreList: this.state.StoreList.filter((rec) => {
                            return (rec.storeId != id);
                        })
                    });
            });
        }
    }

    private handleEdit(id: string) {
        this.props.history.push("/Store/UpdateStore/" + id);
    }

    // Returns the HTML table to the render() method.  
    private renderStoreTable(StoreList: StoreData[]) {
        return <table className='table'>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Address</th>
                </tr>
            </thead>
            <tbody>
                {StoreList.map(item =>
                    <tr key={item.storeId}>
                        <td>{item.storeId}</td>
                        <td>{item.name}</td>
                        <td>{item.address}</td>
                        <td>
                            <button className="action" onClick={id => this.handleEdit(item.storeId)}>Edit</button>
                            <button className="action" onClick={id => this.handleDelete(item.storeId)}>Delete</button>
                        </td>
                    </tr>
                )}
            </tbody>
        </table>

    }
}

export class StoreData {
    storeId: string = "";
    name: string = "";
    address: string = "";
}    