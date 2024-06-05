import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateProduct = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [product, setProduct] = useState({});
    const [imageUrl, setImageUrl] = useState('');
    const [errors, setErrors] = useState('');

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/products/${id}`);
                const productData = response.data;
                setProduct(productData);
                setImageUrl(productData.imageUrl); // Mettre à jour imageUrl avec l'URL de l'image actuelle du produit
            } catch (error) {
                console.error('Error fetching product:', error);
                setErrors('Error fetching product data.');
            }
        };
        fetchProduct();
    }, [id]);

    const handleChange = (e) => {
        setProduct({
            ...product,
            [e.target.name]: e.target.value,
        });
    };

    const handleImageUrlChange = (e) => {
        setImageUrl(e.target.value);
    };
    
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const updatedProduct = { ...product, image: imageUrl };
            await axios.put(`http://localhost:3000/api/products/${id}`, updatedProduct);
            navigate('/product');
        } catch (error) {
            console.error('Error updating product:', error);
            setErrors('An error occurred. Please try again later.');
        }
    };
    

    return (
        <div className='container mt-5'>
            <h1 className='mb-4'>Update Product</h1>
            <form onSubmit={handleSubmit}>
                <div className='form-group'>
                    <div className="form-control">
                        <label>Name</label>
                        <input
                            type="text"
                            name="name"
                            value={product.name || ''}
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
                            value={product.description || ''}
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
                            value={product.price || ''}
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
                            value={product.supplier || ''}
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
                        value={imageUrl  || ''}
                        onChange={handleImageUrlChange}
                        required
                        placeholder="Enter image URL"
                        className="form-control"  />
                    </div>


                    {errors && <p className="error">{errors}</p>}
                    <button type="submit" className="custom-button">
                        Update Product
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UpdateProduct;



