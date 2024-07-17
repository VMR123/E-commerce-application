import React, { createContext } from 'react'
import { db } from '../Config/Config'
import { collection, onSnapshot } from 'firebase/firestore';


export const ProductsContext = createContext();

export class ProductsContextProvider extends React.Component {

    state = {
        products: []
    }

    componentDidMount() {
        const productsRef = collection(db, 'Products');
        onSnapshot(productsRef, snapshot => {
            const prevProducts = this.state.products;
            const changes = snapshot.docChanges(); // use the method directly on the snapshot
            changes.forEach(change => {
                if (change.type === 'added') {
                    prevProducts.push({
                        ProductID: change.doc.id,
                        ProductName: change.doc.data().ProductName,
                        ProductPrice: change.doc.data().ProductPrice,
                        ProductImg: change.doc.data().ProductImg
                    });
                }
                this.setState({
                    products: prevProducts
                });
            });
        });
    }
    
    
    render() {
        return (
            <ProductsContext.Provider value={{ products: [...this.state.products] }}>
                {this.props.children}
            </ProductsContext.Provider>
        )
    }
}

