import React, { useState } from 'react';
import { auth } from '../Config/Config';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from "firebase/auth";

export const Login = (props) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const history = useNavigate();

    const login = (e) => {
        e.preventDefault();

        // Basic validation checks
        if (!email || !password) {
            toast.error('Please fill in all fields.');
            return;
        }

        if (password.length < 6) {
            toast.error('Password should be at least 6 characters.');
            return;
        }

        if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
            toast.error('Please enter a valid email.');
            return;
        }

        signInWithEmailAndPassword(auth, email, password).then(() => {
            toast.success('Login successful!');
            setEmail('');
            setPassword('');
            setError('');
            history('/');
        }).catch(err => {
            // Check for specific errors here
            if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') {
                toast.error('Incorrect email or password.');
            } else {
                toast.error('Login failed.');
            }
            setError(err.message);
        });
    }

    return (
        <div className='container'>
            <br />
            <h2>Login</h2>
            <br />
            <form autoComplete="off" className='form-group' onSubmit={login}>
                <label htmlFor="email">Email</label>
                <input type="email" className='form-control' required
                    onChange={(e) => setEmail(e.target.value)} value={email} />
                <br />
                <label htmlFor="password">Password</label>
                <input type="password" className='form-control' required
                    onChange={(e) => setPassword(e.target.value)} value={password} />
                <br />
                <button type="submit" className='btn btn-success btn-md mybtn'>LOGIN</button>
            </form>
            {error && <span className='error-msg'>{error}</span>}
            <br/>
            <span>Don't have an account? Register
                <Link to="/signup"> Here</Link>
            </span>
        </div>
    )
}
