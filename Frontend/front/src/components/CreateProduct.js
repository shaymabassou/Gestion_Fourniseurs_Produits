import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './createProduct.css';

const CreateProduct = () => {
    const navigate = useNavigate();
    const [newProduct, setNewProduct] = useState({});
    const [imageUrl, setImageUrl] = useState('');

    const handleChange = (e) => {
        setNewProduct({
            ...newProduct,
            [e.target.name]: e.target.value,
        });
    };

    const handleImageUrlChange = (e) => {
        setImageUrl(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post('http://localhost:3000/api/products', { ...newProduct, image: imageUrl });
            navigate('/product'); // Redirection vers la liste des produits après création
        } catch (error) {
            console.error('Error creating product:', error);
        }
    };

    return (
        <div className='container mt-5'>
            <h1 className='mb-4'>Create Product</h1>
            <form onSubmit={handleSubmit}>
                <div className='form-group'>
                    <div className="form-control">
                        <label>Name</label>
                        <input
                            type="text"
                            name="name"
                            onChange={handleChange}
                            required
                            placeholder="Enter name"
                            className="form-control"
                        />
                    </div>
                    <div className="form-control">
                        <label>Description</label>
                        <textarea
                            type="text"
                            name="description"
                            onChange={handleChange}
                            required
                            placeholder="Enter description"
                            className="form-control"
                        ></textarea>
                    </div>
                    <div className="form-control">
                        <label>Price</label>
                        <input
                            type="number"
                            name="price"
                            onChange={handleChange}
                            required
                            placeholder="Enter price"
                            className="form-control"
                        />
                    </div>
                    <div className="form-control">
                        <label>Supplier</label>
                        <input
                            type="text"
                            name="supplier"
                            onChange={handleChange}
                            required
                            placeholder="Enter supplier"
                            className="form-control"
                        />
                    </div>
                    <div className="form-control">
                        <label>Image URL</label>
                        <input
                            type="text"
                            name="imageUrl"
                            value={imageUrl}
                            onChange={handleImageUrlChange}
                            required
                            placeholder="Enter image URL"
                            className="form-control"
                        />
                    </div>
                   
                    <button type="submit" className="custom-button">
                        Create Product
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateProduct;
