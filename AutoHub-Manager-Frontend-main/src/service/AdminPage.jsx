import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ArrowLeft, Users, Briefcase, Download } from 'lucide-react';
import jsPDF from 'jspdf';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import html2canvas from 'html2canvas';

function AdminPage() {
    const [clients, setClients] = useState([]);
    const [vendors, setVendors] = useState([]);
    const [search, setSearch] = useState('');
    const navigate = useNavigate();
    const pdfRef = useRef();

    useEffect(() => {
        const fetchClients = async () => {
            try {
                const response = await axios.get('http://localhost:4000/api/user/client-list');
                setClients(response.data.users);
            } catch (error) {
                console.error('Error fetching clients:', error);
            }
        };

        const fetchVendors = async () => {
            try {
                const response = await axios.get('http://localhost:4000/api/user/vendors');
                setVendors(response.data.vendors);
            } catch (error) {
                console.error('Error fetching vendors:', error);
            }
        };

        fetchClients();
        fetchVendors();
    }, []);

    const filteredClients = clients.filter(client =>
        client.names.toLowerCase().includes(search.toLowerCase()) ||
        client.email.toLowerCase().includes(search.toLowerCase())
    );

    const filteredVendors = vendors.filter(vendor =>
        vendor.businessname.toLowerCase().includes(search.toLowerCase()) ||
        vendor.businessemail.toLowerCase().includes(search.toLowerCase())
    );

    const downloadPDF = () => {
        const input = pdfRef.current;
        html2canvas(input, { scale: 2 }).then(canvas => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const imgWidth = 210; // A4 width in mm
            const imgHeight = (canvas.height * imgWidth) / canvas.width;
            const currentDate = new Date().toLocaleDateString();

            pdf.text(`Admin Dashboard - ${currentDate}`, 10, 10);
            pdf.addImage(imgData, 'PNG', 0, 20, imgWidth, imgHeight);
            pdf.save(`Admin_Dashboard_${currentDate}.pdf`);
        });
    };
    const handleLogout = () => {
        localStorage.removeItem('token'); // Clear the token saved in localStorage
        navigate('/'); // Redirect to the homepage or any other page
    };

    return (
        <div className="max-w-5xl mx-auto p-6 bg-gray-50 rounded-lg shadow-md">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-3xl font-bold">Admin Dashboard</h1>
                <div className="flex gap-4">
                    <button 
                        onClick={downloadPDF} 
                        className="flex items-center bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                    >
                        <Download className="mr-2" /> Download as PDF
                    </button>
                          <button onClick={handleLogout} className="flex items-center cursor-pointer text-gray-500">
                            <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
                            Logout
                          </button>
                </div>
            </div>
            <p className="text-gray-600 mb-4">Manage clients and vendors efficiently</p>

            <div ref={pdfRef} className="bg-white p-4 rounded-lg shadow">
                {/* Statistics Cards */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-white p-4 rounded-lg shadow flex items-center">
                        <Users className="text-blue-500 w-8 h-8 mr-4" />
                        <div>
                            <h2 className="text-xl font-semibold">Total Clients</h2>
                            <p className="text-gray-600">{clients.length}</p>
                        </div>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow flex items-center">
                        <Briefcase className="text-green-500 w-8 h-8 mr-4" />
                        <div>
                            <h2 className="text-xl font-semibold">Total Vendors</h2>
                            <p className="text-gray-600">{vendors.length}</p>
                        </div>
                    </div>
                </div>

                {/* Search Bar */}
                <div className="flex items-center bg-white p-2 rounded-lg shadow mb-6">
                    <Search className="text-gray-500 ml-2" />
                    <input 
                        type="text" 
                        placeholder="Search clients or vendors..." 
                        value={search} 
                        onChange={(e) => setSearch(e.target.value)} 
                        className="ml-2 w-full p-2 outline-none"
                    />
                </div>

                {/* Clients Table */}
                <div className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4 text-blue-600">Clients</h2>
                    <table className="min-w-full bg-white border rounded-lg">
                        <thead>
                            <tr className="bg-blue-100">
                                <th className="py-2 px-4">Name</th>
                                <th className="py-2 px-4">Email</th>
                                <th className="py-2 px-4">Phone</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredClients.map(client => (
                                <tr key={client._id} className="hover:bg-gray-100">
                                    <td className="py-2 px-4 border-b">{client.names}</td>
                                    <td className="py-2 px-4 border-b">{client.email}</td>
                                    <td className="py-2 px-4 border-b">{client.phone}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Vendors Table */}
                <div>
                    <h2 className="text-2xl font-semibold mb-4 text-green-600">Vendors</h2>
                    <table className="min-w-full bg-white border rounded-lg">
                        <thead>
                            <tr className="bg-green-100">
                                <th className="py-2 px-4">Business Name</th>
                                <th className="py-2 px-4">Email</th>
                                <th className="py-2 px-4">Address</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredVendors.map(vendor => (
                                <tr key={vendor._id} className="hover:bg-gray-100">
                                    <td className="py-2 px-4 border-b">{vendor.businessname}</td>
                                    <td className="py-2 px-4 border-b">{vendor.businessemail}</td>
                                    <td className="py-2 px-4 border-b">{vendor.address}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default AdminPage;
