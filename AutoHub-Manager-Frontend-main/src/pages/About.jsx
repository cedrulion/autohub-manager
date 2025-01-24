import React, { useState } from 'react';
import logo from '../pic/logo.jpg';

const ProfilePage = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [dropdownOpen2, setDropdownOpen2] = useState(false);
    const [feedbackMessage, setFeedbackMessage] = useState('');
    const [formData, setFormData] = useState({
        Name: '',
        email: '',
        message: ''
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Submitting form data:', formData);

        try {
            const response = await fetch("http://localhost:4000/api/feedback/feedback", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const responseData = await response.json();
                console.log('Feedback submitted successfully:', responseData);

                setShowFeedbackMessage(true);
                setFormData({
                    Name: '',
                    email: '',
                    message: ''
                });
            } else {
                console.error('Error submitting feedback:', response.statusText);
                setFeedbackMessage('An error occurred while submitting feedback.');
            }
        } catch (error) {
            console.error('An error occurred:', error);
            setFeedbackMessage('An unexpected error occurred.');
        }
    };

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };
    const toggleDropdown2 = () => {
        setDropdownOpen2(!dropdownOpen2);
    };

    return (
        <div className="font-serif bg-blue-50 min-h-screen">
            <div className="relative flex items-center justify-between p-4 bg-blue-50 text-white">
                <div className="relative">
                    <button
                        className="px-4 py-2 font-semibold text-black rounded-lg focus:outline-none"
                        onClick={toggleDropdown}
                    >
                        Menu
                    </button>
                    {dropdownOpen && (
                        <div className="absolute left-0 mt-2 w-48 bg-white text-black rounded-lg shadow-lg">
                            <a href="/" className="block px-4 py-2 hover:bg-gray-200">Home</a>
                            <a href="/about" className="block px-4 py-2 hover:bg-gray-200">About</a>
                            <a href="/contact" className="block px-4 py-2 hover:bg-gray-200">Contact</a>
                        </div>
                    )}
                </div>
                <div>

                    <div className="relative">

                    </div>
                </div>
            </div>
            <div className="flex justify-center items-center min-h-screen ">
                <div className="shadow-lg rounded-lg p-8 max-w-3xl w-full bg-blue-50">
                    <h1 className="text-3xl font-bold text-center text-blue-500 mb-8">Autohub Manager</h1>
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center space-x-4">
                            <img
                                src={logo}
                                alt="Company Logo"
                                className="w-20 h-20 rounded-full object-cover"
                            />
                            <div>
                                <h1 className="text-2xl font-bold">Akagera Motors</h1>
                                <p className="text-sm text-gray-600">Car selling company</p>
                                <p className="text-sm text-gray-600">Kigali, Rwanda</p>
                            </div>
                        </div>
                        <div>
                            <button
                                onClick={toggleDropdown2}
                                className="bg-white text-blue-500 border border-blue-500 px-4 py-2 rounded-lg mr-2">Quote</button>
                            {dropdownOpen2 && (
                                <form onSubmit={handleSubmit} className="flex flex-col bg-white text-black rounded-lg shadow-lg p-4">
                                    <input
                                        type="text"
                                        placeholder="Name"
                                        className="border border-gray-300 rounded-lg px-2 py-1 mb-2"
                                        value={formData.Name}
                                        onChange={handleChange}
                                        name="Name"
                                    />

                                    <input
                                        type="email"
                                        placeholder="Email"
                                        className="border border-gray-300 rounded-lg px-2 py-1 mb-2"
                                        value={formData.email}
                                        onChange={handleChange}
                                        name="email"
                                    />
                                    <textarea
                                        placeholder="Message"
                                        className="border border-gray-300 rounded-lg px-2 py-1 mb-2"
                                        value={formData.message}
                                        onChange={handleChange}
                                        name="message"
                                    ></textarea>
                                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg">Send</button>
                                </form>
                            )}
                            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">View catalog</button>
                        </div>
                    </div>
                    <div className="mb-4">
                        <p className="text-gray-600 text-sm">5000+ sales</p>
                    </div>
                    <div className="space-y-6">
                        <Card title="Description">
                            <p className="text-gray-700">
                                Established in 1997, is the exclusive distributor for Mahindra, Toyota, Mercedes Benz, MCV, Foton & Fuso. Akagera Motors is responsible for revolutionizing the public transport sector of Rwanda by being the first to offer vehicle financial leasing for medium and large size buses.  </p>
                        </Card>
                        <Card title="Badges">
                            <ul className="list-disc list-inside text-gray-700">
                                <li>Eco-Friendly Badge</li>
                                <li>Quality Assurance Badge</li>
                                <li>Innovation Badge</li>
                                <li>Customer Satisfaction Badge.</li>
                                <li>Safety Badge</li>
                            </ul>
                        </Card>
                        <Card title="Address">
                            <p className="text-gray-700">Kigali, Rwanda</p>
                            <p className="text-gray-700">Kg 122 st</p>
                        </Card>
                        <Card title="Contacts">
                            <p className="text-gray-700">info@akagera.motors</p>
                            <p className="text-gray-700">+250788999992</p>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
};

const Card = ({ title, children }) => (
    <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-2">{title}</h2>
        {children}
    </div>
);

export default ProfilePage;
