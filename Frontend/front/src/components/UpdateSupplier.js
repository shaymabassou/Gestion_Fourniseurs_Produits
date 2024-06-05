import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './updateSupplier.css';

const UpdateSupplier = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [formData, setFormData] = useState({
        name: '',
        contactPerson: '',
        email: '',
        slug: ''
    });
    const [errors, setErrors] = useState('');

    useEffect(() => {
        const fetchSupplier = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/suppliers/${id}`);
                const supplierData = response.data; 
                setFormData(supplierData); 
            } catch (error) {
                console.error("Error fetching supplier data:", error);
                setErrors('Error fetching supplier data.');
            }
        };
        fetchSupplier();
    }, [id]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:3000/api/suppliers/${id}`, formData);
            navigate('/supplier');
        } catch (error) {
            console.error(error);
            setErrors('An error occurred. Please try again later.');
        }
    };

    return (
        <div className="container mt-5">
            <form onSubmit={handleSubmit}>
                <label>Name</label>
                <input type="text" placeholder="Enter name" name="name" value={formData.name} onChange={handleChange} required />
                <label>Contact Person</label>
                <input type="text" placeholder="Enter contact person" name="contactPerson" value={formData.contactPerson} onChange={handleChange} required />
                <label>Email</label>
                <input type="email" placeholder="Enter email" name="email" value={formData.email} onChange={handleChange} required />
                <label>Slug</label>
                <input type="text" placeholder="Enter slug" name="slug" value={formData.slug} onChange={handleChange} required />
                
                {errors && <p className="error">{errors}</p>}
                <button className="btn-primary" type="submit">Update supplier</button>
            </form>
        </div>
    );
};

export default UpdateSupplier;
