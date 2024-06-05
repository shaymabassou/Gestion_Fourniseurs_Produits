import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateThirdParty = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [thirdParty, setThirdParty] = useState({});
    const [errors, setErrors] = useState('');

    useEffect(() => {
        const fetchThirdParty = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/thirdparties/${id}`);
                const thirdPartyData = response.data;
                setThirdParty(thirdPartyData);
            } catch (error) {
                console.error('Error fetching third party:', error);
                setErrors('Error fetching third party data.');
            }
        };
        fetchThirdParty();
    }, [id]);

    const handleChange = (e) => {
        setThirdParty({
            ...thirdParty,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:3000/api/thirdparties/${id}`, thirdParty);
            navigate('/thirdparty');
        } catch (error) {
            console.error('Error updating third party:', error);
            setErrors('An error occurred. Please try again later.');
        }
    };

    return (
        <div className='container mt-5'>
            <h1 className='mb-4'>Update Third Party</h1>
            <form onSubmit={handleSubmit}>
                <div className='form-group'>
                    <div className="form-control">
                        <label>Name</label>
                        <input
                            type="text"
                            name="name"
                            value={thirdParty.name || ''}
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
                            value={thirdParty.type || ''}
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
                            value={thirdParty.address || ''}
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
                            value={thirdParty.slug || ''}
                            onChange={handleChange}
                            required
                            placeholder="Enter slug"
                            className="form-control"
                        />
                    </div>
                    {errors && <p className="error">{errors}</p>}
                    <button type="submit" className="custom-button">
                        Update Third Party
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UpdateThirdParty;
