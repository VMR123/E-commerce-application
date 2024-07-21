import React, { Component } from 'react';

import { ProductsContextProvider } from './Global/ProductsContext';
import { Home } from './Components/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Signup } from './Components/Signup';
import { Login } from './Components/Login';
import { NotFound } from './Components/NotFound';
import { auth, db } from './Config/Config';
import { collection, doc, getDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

import { CartContextProvider } from './Global/CartContext';
import { Cart } from './Components/Cart';
import { AddProducts } from './Components/AddProducts';
import { Cashout } from './Components/Cashout';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';  // Import Toastify CSS

export class App extends Component {

    state = {
        user: null,
    };

    componentDidMount() {
        // getting user info for navigation bar
        onAuthStateChanged(auth, user => {
            if (user) {
                const userDocRef = doc(db, 'SignedUpUsersData', user.uid);
                getDoc(userDocRef).then(snapshot => {
                    if (snapshot.exists()) {
                        this.setState({
                            user: snapshot.data().Name
                        });
                    }
                });
            } else {
                this.setState({
                    user: null
                });
            }
        });
    }

    render() {
        return (
            <ProductsContextProvider>
                <CartContextProvider>
                    <BrowserRouter>
                        <header style={{ textAlign: 'center', padding: '10px 0' }}>
                            <img src="https://upload.wikimedia.org/wikipedia/en/c/cc/NITK_Emblem.png" alt="Institute Logo" style={{ height: '80px' }} />
                            <h1>E-Commerce Application</h1>
                            <h4>Department of Information Technology</h4>
                            <h5>National Institute of Technology Karnataka</h5>
                            <h6>Implemented by Vishwa Mohan Reddy G (211IT082)</h6>
                        </header>
                        <ToastContainer />
                        <Routes>
                            {/* home */}
                            <Route exact path='/' element={<Home user={this.state.user} />} />
                            {/* signup */}
                            <Route path="/signup" element={<Signup />} />
                            {/* login */}
                            <Route path="/login" element={<Login />} />
                            {/* cart products */}
                            <Route path="/cartproducts" element={<Cart user={this.state.user} />} />
                            {/* add products */}
                            <Route path="/addproducts" element={<AddProducts />} />
                            {/* cashout */}
                            <Route path='/cashout' element={<Cashout user={this.state.user} />} />
                            <Route path='*' element={<NotFound />} />
                        </Routes>
                        <footer style={{ textAlign: 'center', padding: '10px 0', marginTop: '20px', borderTop: '1px solid #ccc' }}>
                            <p>@Vishwa Mohan Reddy G</p>
                        </footer>
                    </BrowserRouter>
                </CartContextProvider>
            </ProductsContextProvider>
        );
    }
}

export default App;
