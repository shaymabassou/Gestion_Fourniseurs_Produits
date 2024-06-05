import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ThirdParty = () => {
    const [thirdParties, setThirdParties] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchThirdParties = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/thirdparties');
                setThirdParties(response.data);
            } catch (error) {
                console.error('Error fetching third parties:', error);
            }
        };

        fetchThirdParties();
    }, []);

    const deleteThirdParty = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/api/thirdparties/${id}`);
            const updatedThirdParties = thirdParties.filter(thirdParty => thirdParty.id !== id);
            setThirdParties(updatedThirdParties);
        } catch (error) {
            console.error('Something went wrong!', error);
        }
    };

    const filteredThirdParties = thirdParties.filter(thirdParty => {
        const { name, type, address, slug } = thirdParty;
        const searchRegex = new RegExp(searchTerm, 'i');
        return searchRegex.test(name) || searchRegex.test(type) || searchRegex.test(address) || searchRegex.test(slug);
    });

    return (
        <div className='thirdparties-table'>
            <h2 className='table-header'>Third Parties</h2>
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search third parties..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Address</th>
                        <th>Slug</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredThirdParties.map((thirdParty) => (
                        <tr key={thirdParty.id}>
                            <td className='table-cell'>{thirdParty.name}</td>
                            <td className='table-cell'>{thirdParty.type}</td>
                            <td className='table-cell'>{thirdParty.address}</td>
                            <td className='table-cell'>{thirdParty.slug}</td>
                            <td className='table-cell'>
                                <Link to={`/updatethirdparty/${thirdParty.id}`} className='update-btn'>Update</Link>
                                <button onClick={() => deleteThirdParty(thirdParty.id)} className='delete-btn'>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ThirdParty;

