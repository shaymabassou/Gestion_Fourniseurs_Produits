import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './createSupplier.css';

const CreateSupplier = () => {
    const navigate = useNavigate();
    const [newSupplier, setNewSupplier] = useState({});

    const handleChange = (e) => {
        setNewSupplier({
            ...newSupplier,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post('http://localhost:3000/api/suppliers', newSupplier);
            navigate('/supplier');
        } catch (error) {
            console.error('Error creating supplier:', error);
        }
    };

    return (
        <div className='container mt-5'>
            <h1 className='mb-4'>Create Supplier</h1>
            <form onSubmit={handleSubmit}> {/* Ajout de la balise form */}
                <div className='form-group'>
                    <div className="form-control">
                        <label>Name</label>
                        <input
                            type="text"
                            name="name"
                            onChange={handleChange}
                            required
                            placeholder="Enter name"
                            className="form-control" // Ajout de la classe CSS form-control
                        />
                    </div>
                    <div className="form-control">
                        <label>Contact Person</label>
                        <input
                            type="text"
                            name="contactPerson"
                            onChange={handleChange}
                            required
                            placeholder="Enter contact person"
                            className="form-control" // Ajout de la classe CSS form-control
                        />
                    </div>
                    <div className="form-control">
                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            onChange={handleChange}
                            required
                            placeholder="Enter email"
                            className="form-control" // Ajout de la classe CSS form-control
                        />
                    </div>
                    <div className="form-control">
                        <label>Slug</label>
                        <input
                            type="text"
                            name="slug"
                            onChange={handleChange}
                            required
                            placeholder="Enter slug"
                            className="form-control" // Ajout de la classe CSS form-control
                        />
                    </div>
                    <button type="submit" className="custom-button"> Create Supplier </button>
                </div>
            </form> {/* Fermeture de la balise form */}
        </div>
    );
};

export default CreateSupplier;
