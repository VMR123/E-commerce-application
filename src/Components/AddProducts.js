import React, { useState } from 'react';
import { storage, db } from '../Config/Config';
import { addDoc, collection } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

export const AddProducts = () => {

    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState(0);
    const [productImg, setProductImg] = useState(null);
    const [productImgUrl, setProductImgUrl] = useState('');
    const [error, setError] = useState('');

    const types = ['image/png', 'image/jpeg']; // image types
    const navigate = useNavigate(); // initializing the navigate function

    const productImgHandler = (e) => {
        let selectedFile = e.target.files[0];
        if (selectedFile && types.includes(selectedFile.type)) {
            setProductImg(selectedFile);
            setProductImgUrl(''); // clear image URL if file is selected
            setError('');
        } else {
            setProductImg(null);
            setError('Please select a valid image type (jpg or png)');
        }
    }

    const addProduct = async (e) => {
        e.preventDefault();

        let imgUrl = '';

        if (productImg) {
            const storageRef = ref(storage, `product-images/${productImg.name}`);
            const uploadTask = uploadBytesResumable(storageRef, productImg);

            uploadTask.on('state_changed', snapshot => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log(progress);
            },
                err => {
                    setError(err.message);
                },
                async () => {
                    try {
                        imgUrl = await getDownloadURL(storageRef);
                        await saveProduct(imgUrl);
                    } catch (err) {
                        setError(err.message);
                    }
                });
        } else if (productImgUrl) {
            imgUrl = productImgUrl;
            await saveProduct(imgUrl);
        } else {
            setError('Please provide an image file or URL');
        }
    }

    const saveProduct = async (imgUrl) => {
        try {
            await addDoc(collection(db, 'Products'), {
                ProductName: productName,
                ProductPrice: Number(productPrice),
                ProductImg: imgUrl
            });

            setProductName('');
            setProductPrice(0);
            setProductImg(null);
            setProductImgUrl('');
            setError('');
            document.getElementById('file').value = '';

            toast.success('Product added successfully!');
            navigate('/');
        } catch (err) {
            setError(err.message);
        }
    }

    return (
        <div className='container'>
            <br />
            <h2>ADD PRODUCTS</h2>
            <hr />
            <form autoComplete="off" className='form-group' onSubmit={addProduct}>
                <label htmlFor="product-name">Product Name</label>
                <input type="text" className='form-control' required
                    onChange={(e) => setProductName(e.target.value)} value={productName} />
                <br />
                <label htmlFor="product-price">Product Price</label>
                <input type="number" className='form-control' required
                    onChange={(e) => setProductPrice(e.target.value)} value={productPrice} />
                <br />
                <label htmlFor="product-img">Product Image</label>
                <input type="file" className='form-control' id="file"
                    onChange={productImgHandler} />
                <br />
                <label htmlFor="product-img-url">or Image URL</label>
                <input type="url" className='form-control'
                    onChange={(e) => setProductImgUrl(e.target.value)} value={productImgUrl} />
                <br />
                <button type="submit" className='btn btn-success btn-md mybtn'>ADD</button>
            </form>
            {error && <span className='error-msg'>{error}</span>}
        </div>
    )
}
