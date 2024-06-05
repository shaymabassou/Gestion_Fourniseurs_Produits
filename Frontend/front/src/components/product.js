import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './product.css';

const Product = () => {
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/products');
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    const deleteProduct = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/api/products/${id}`);
            setProducts(products.filter(product => product.id !== id));
        } catch (error) {
            console.error('Something went wrong!', error);
        }
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className='products-container'>
            <h2 className='table-header'>Products</h2>
            <input 
                type="search"
                className="mr-2"
                aria-label="Search"
                placeholder="Search by name..." 
                value={searchTerm} 
                onChange={handleSearch} 
            />
            <div className="card-container">
                {filteredProducts.map((product) => (
                    <div key={product.id} className="card"  >
    <h3>{product.name}</h3>
    <p><strong>Description:</strong> {product.description}</p>
    <p><strong>Price:</strong> {product.price}</p>
    <p><strong>Supplier:</strong> {product.supplier}</p>
    <img src={product.image} alt={product.name} className="product-image" width="100%" height="auto" />

    <div className="card-actions">
        <Link to={`/updateproduct/${product.id}`} className='update-btn'>Update</Link>
        <button onClick={() => deleteProduct(product.id)} className='delete-btn'>Delete</button>
    </div>


                    </div>
                ))}
            </div>
        </div>
    );
};

export default Product;
