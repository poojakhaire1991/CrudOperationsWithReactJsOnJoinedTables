import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link, NavLink } from 'react-router-dom';
import * as pSold from './AddProductSold'


interface FetchProductSoldDataState {
    ProductSoldList: ProductSoldData[];
    loading: boolean;
}

export class FetchProductSold extends React.Component<RouteComponentProps<{}>, FetchProductSoldDataState> {
    constructor() {
        super();
        this.state = { ProductSoldList: [], loading: true };
        fetch('/ProductSold/Index')
            .then(response => response.json() as Promise<ProductSoldData[]>)
            .then(data => {
                this.setState({ ProductSoldList: data, loading: false });
            });

        // This binding is necessary to make "this" work in the callback  
        this.handleDelete = this.handleDelete.bind(this);
        this.handleEdit = this.handleEdit.bind(this);

    }

    public render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderProductSoldTable(this.state.ProductSoldList);

        return <div>
            <h1>ProductSold Data</h1>
            <p>This component demonstrates fetching ProductSold data from the server.</p>
            <p>
                <Link to="/AddProductSold" > Create New</Link>
            </p>
            {contents}
        </div>;
    }

    // Handle Delete request for an ProductSold
    private handleDelete(id: string) {
        if (!confirm("Do you want to delete Store with Id: " + id))
            return;
        else {
            fetch('/ProductSold/DeleteProductSold/' + id, {
                method: 'delete'
            }).then(data => {
                this.setState(
                    {
                        ProductSoldList: this.state.ProductSoldList.filter((rec) => {
                            return (rec.id != id);
                        })
                    });
            });
        }
    }

    private handleEdit(id: string) {
        this.props.history.push("/ProductSold/UpdateProductSold/" + id);
    }

    // Returns the HTML table to the render() method.  
    private renderProductSoldTable(ProductSoldList: ProductSoldData[]) {
        return <table className='table'>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>CustomerId</th>
                    <th>ProductId</th>
                    <th>StoreId</th>
                    <th>DateSold</th>
                </tr>
            </thead>
            <tbody>
                {ProductSoldList.map(item =>
                    <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.customerId}</td>
                        <td>{item.productId}</td>
                        <td>{item.storeId}</td>
                        <td>{item.dateSold}</td>
                        <td>
                            <button className="action" onClick={id => this.handleEdit(item.id)}>Edit</button>
                            <button className="action" onClick={id => this.handleDelete(item.id)}>Delete</button>
                        </td>
                    </tr>
                )}
            </tbody>
        </table>

    }
}

export class ProductSoldData {
    id: string = "";
    customerName: string = "";
    customerId: string = "";
    productName: string = "";
    productId: string = "";
    storeName: string = "";
    storeId: string = "";
    dateSold: string = "";
}    