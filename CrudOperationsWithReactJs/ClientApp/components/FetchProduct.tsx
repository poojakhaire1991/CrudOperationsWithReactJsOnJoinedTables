import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link, NavLink } from 'react-router-dom';
import * as cust from './AddCustomer'

interface FetchProductDataState {
    ProductList: ProductData[];
    loading: boolean;
}

export class FetchProduct extends React.Component<RouteComponentProps<{}>, FetchProductDataState> {
    constructor() {
        super();
        this.state = { ProductList: [], loading: true };
        fetch('/Product/Index')
            .then(response => response.json() as Promise<ProductData[]>)
            .then(data => {
                this.setState({ ProductList: data, loading: false });
            });

        // This binding is necessary to make "this" work in the callback  
        this.handleDelete = this.handleDelete.bind(this);
        this.handleEdit = this.handleEdit.bind(this);

    }

    public render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderProductTable(this.state.ProductList);

        return <div>
            <h1>Product Data</h1>
            <p>This component demonstrates fetching Product data from the server.</p>
            <p>
                <Link to="/AddProduct" > Create New</Link>
            </p>
            {contents}
        </div>;
    }

    // Handle Delete request for an Product
    private handleDelete(id: string) {
        if (!confirm("Do you want to delete Product with Id: " + id))
            return;
        else {
            fetch('/Product/DeleteProduct/' + id, {
                method: 'delete'
            }).then(data => {
                this.setState(
                    {
                        ProductList: this.state.ProductList.filter((rec) => {
                            return (rec.productId != id);
                        })
                    });
            });
        }
    }

    private handleEdit(id: string) {
        this.props.history.push("/Product/UpdateProduct/" + id);
    }

    // Returns the HTML table to the render() method.  
    private renderProductTable(ProductList: ProductData[]) {
        return <table className='table'>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Price</th>
                </tr>
            </thead>
            <tbody>
                {ProductList.map(item =>
                    <tr key={item.productId}>
                        <td>{item.productId}</td>
                        <td>{item.name}</td>
                        <td>{item.price}</td>
                        <td>
                            <button className="action" onClick={id => this.handleEdit(item.productId)}>Edit</button>
                            <button className="action" onClick={id => this.handleDelete(item.productId)}>Delete</button>
                        </td>
                    </tr>
                )}
            </tbody>
        </table>

    }
}

export class ProductData {
    productId: string = "";
    name: string = "";
    price: string = "";
}    