import React, { useContext } from 'react';
import { ProductsContext } from '../Global/ProductsContext';
import { CartContext } from '../Global/CartContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Products = () => {

    const { products } = useContext(ProductsContext);

    const { dispatch } = useContext(CartContext);

    const addToCart = (product) => {
        // Dispatch the action to add the product to the cart
        dispatch({ type: 'ADD_TO_CART', id: product.ProductID, product });

        // Display a toast notification
        toast.success(`added to cart!`);
    }

    return (
        <>
            {products.length !== 0 && <h1 className='title-products'>Products</h1>}
            <div className='products-container'>
                {products.length === 0 && <div>slow internet...no products to display</div>}
                {products.map(product => (
                    <div className='product-card' key={product.ProductID}>
                        <div className='product-img'>
                            <img src={product.ProductImg} alt="not found" />
                        </div>
                        <div className='product-name'>
                            {product.ProductName}
                        </div>
                        <div className='product-price'>
                            Rs {product.ProductPrice}.00
                        </div>
                        <button className='addcart-btn' onClick={() => addToCart(product)}>ADD TO CART</button>
                    </div>
                ))}
            </div>
        </>
    )
}
