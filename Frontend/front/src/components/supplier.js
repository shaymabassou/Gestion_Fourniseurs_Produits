import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './supplier.css';

const Supplier = () => {
    const [suppliers, setSuppliers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchSuppliers = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/suppliers');
                setSuppliers(response.data);
            } catch (error) {
                console.error('Error fetching suppliers:', error);
            }
        };

        fetchSuppliers();
    }, []);

    const deleteSupplier = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/api/suppliers/${id}`);
            const updatedSuppliers = suppliers.filter(supplier => supplier.id !== id);
            setSuppliers(updatedSuppliers);
        } catch (error) {
            console.error('Something went wrong!', error);
        }
    };

    const filteredSuppliers = suppliers.filter(supplier => {
        const { name, contactPerson, email, slug } = supplier;
        const searchRegex = new RegExp(searchTerm, 'i');
        return searchRegex.test(name) || searchRegex.test(contactPerson) || searchRegex.test(email) || searchRegex.test(slug);
    });

    return (
        <div className='suppliers-table'>
            <h2 className='table-header'>Suppliers</h2>
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search suppliers..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Contact Person</th>
                        <th>Email</th>
                        <th>Slug</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredSuppliers.map((supplier) => (
                        <tr key={supplier._id}>
                            <td className='table-cell'>{supplier.name}</td>
                            <td className='table-cell'>{supplier.contactPerson}</td>
                            <td className='table-cell'>{supplier.email}</td>
                            <td className='table-cell'>{supplier.slug}</td>
                            <td className='table-cell'>
                                <Link to={`/updatesupplier/${supplier.id}`} className='update-btn'>Update</Link>
                                <button onClick={() => deleteSupplier(supplier.id)} className='delete-btn'>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Supplier;
