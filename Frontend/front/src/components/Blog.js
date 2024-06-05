import React, { Component } from 'react';
import { Link, Navigate } from 'react-router-dom';
import './Blog.css';

class Blog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedImage: null,
            isAuthenticated: true
        };
    }

    handleImageClick(imageId) {
        this.setState({ selectedImage: imageId });
    }

    render() {
        const { isAuthenticated } = this.state;

        if (!isAuthenticated) {
            return <Navigate to="/login" />;
        }

        return (
            <div>
                <div className="navbar">
                    <h1>.PARFUMS BASSOU.</h1>
                    <nav>
                        <ul>
                            <li>
                                <Link to='/supplier/create-supplier'>Create Supplier</Link>
                            </li>
                            <li>
                                <Link to='/product/create-product'>Create Product</Link>
                            </li>
                            <li>
                                <Link to='/thirdparty/create-thirdparty'>Create Third Party</Link>
                            </li>
                        </ul>
                    </nav>
                </div>
                <div className="centered-buttons">
                    <Link to='/supplier' className='btn'>List of Suppliers</Link>
                    <Link to='/product' className='btn'>List of Products</Link>
                    <Link to='/thirdparty' className='btn'>List of Third Parties</Link>
                </div>
            </div>
        );
    }
}

export default Blog;

