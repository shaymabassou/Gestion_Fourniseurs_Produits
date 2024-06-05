import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './createThirdParty.css';

const CreateThirdParty = () => {
    const navigate = useNavigate();
    const [newThirdParty, setNewThirdParty] = useState({});

    const handleChange = (e) => {
        setNewThirdParty({
            ...newThirdParty,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post('http://localhost:3000/api/thirdparties', newThirdParty);
            navigate('/thirdparty'); // Redirection vers la liste des tiers après création
        } catch (error) {
            console.error('Error creating third party:', error);
        }
    };

    return (
        <div className='container mt-5'>
            <h1 className='mb-4'>Create Third Party</h1>
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
                        <label>Type</label>
                        <input
                            type="text"
                            name="type"
                            onChange={handleChange}
                            required
                            placeholder="Enter type"
                            className="form-control"
                        />
                    </div>
                    <div className="form-control">
                        <label>Address</label>
                        <textarea
                            type="text"
                            name="address"
                            onChange={handleChange}
                            required
                            placeholder="Enter address"
                            className="form-control"
                        ></textarea>
                    </div>
                    <div className="form-control">
                        <label>Slug</label>
                        <input
                            type="text"
                            name="slug"
                            onChange={handleChange}
                            required
                            placeholder="Enter slug"
                            className="form-control"
                        />
                    </div>
                    <button type="submit" className="custom-button">
                        Create Third Party
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateThirdParty;
