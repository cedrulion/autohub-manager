import React, { useState, useEffect } from 'react';
import './CartItems.css';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import ClientChat from './ClientChart';
import { parseJwt } from './utils';

const Orders = ({ vendorId }) => {
    const [productscart, setProducts] = useState([]);
    const [error, setError] = useState(null);
    const [totalPrice, setTotalPrice] = useState(0);
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    const token = localStorage.getItem("token");
    const decodedToken = parseJwt(token);
    const clientId = decodedToken.clientId;

    useEffect(() => {
        axios.get('http://localhost:4000/api/cart/user', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem("token")
            },
        })
            .then((response) => {
                const filteredProducts = response.data.filter(item => item.paymentStatus !== 'PAID');
                setProducts(filteredProducts);
            })
            .catch((error) => {
                console.error('Error fetching cart items:', error);
                setError(error);
            });
    }, [clientId, token]);

    useEffect(() => {
        let total = 0;
        productscart.forEach(item => {
            const price = parseFloat(item.productId.price);
            total += price * item.quantity;
        });
        setTotalPrice(total);
    }, [productscart]);

    const removeFromCart = (cartItemId) => {
        axios.delete(`http://localhost:4000/api/cart/productcart/${cartItemId}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem("token")
            },
        })
            .then((response) => {
                setProducts(productscart.filter(item => item._id !== cartItemId));
                toast.success('Product removed from cart successfully');
            })
            .catch((error) => {
                console.error('Error removing product from cart:', error);
                setError(error);
                toast.error('Product could not be removed from cart. Please try again later.');
            });
    };

    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('en-US', options);
    };

    const getButtonColor = (status) => {
        return status === 'NEW' ? '#3182ce' : '#e53e3e';
    };

    const handleButtonClick = () => {
        navigate('/PaymentForm', { state: { totalPrice, productscart } });
    };

    return (
        <div className='flex flex-col'>
            <div className='text-right'>
                <ToastContainer />
            </div>
            <div>
                <h1 className="font-bold text-3xl text-blue-500 mb-8 ml-8">Your pending carts</h1>
            </div>

            {productscart.map((item) => (
                <div className='ml-12' key={item._id}>
                    <div className="border rounded-lg overflow-hidden shadow-lg shadow-gray-800 flex mb-4">
                        <img src={item.productId.photo && item.productId.photo.length > 0 ? `http://localhost:4000/${item.productId.photo[0].path}` : 'placeholder.jpg'} alt={item.productId.name} className="w-2/4 h-64 object-cover" />
                        <div className="p-4 w-1/4 grid">
                            <div className="w-3/4 flex flex-row justify-between">
                                <h2 className="text-2xl text-black font-semibold">{item.productId.name}</h2>
                                <button className="btn-buy rounded-full ml-12 text-white text-sm py-1 px-4" style={{ backgroundColor: getButtonColor(item.productId.status) }}>{item.productId.status}</button>
                                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-32" onClick={() => removeFromCart(item._id)}>Remove</button>
                            </div>
                            <p className="text-md mb-2">Quantity: {item.quantity}</p>
                            <p className="text-md mb-2">Price (RWF): {item.productId.price}</p>
                            <p className="text-md mb-2">Gear Box: {item.productId.gearbox}</p>
                            <p className="text-md mb-2">Tank: {item.productId.tank}</p>
                            <p className="text-md mb-2">Added on {formatDate(item.date)}</p>
                        </div>
                        <div className="flex items-center">
                            <span className="mr-2">{item.productId.rating.toFixed(1)}</span>
                            {[...Array(5)].map((_, index) => (
                                <svg
                                    key={index}
                                    className={`h-5 w-5 fill-current ${index < item.productId.rating ? "text-yellow-600" : "text-gray-400"}`}
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <polygon points="10,0 13,7 20,7 15,12 17,20 10,16 3,20 5,12 0,7 7,7" />
                                </svg>
                            ))}
                        </div>
                    </div>
                </div>
            ))}

            <div className='fixed right-0 gap-8 top-32 bottom-0 w-1/4 bg-white'>
                <div className="border rounded-lg overflow-hidden shadow-lg shadow-gray-800 flex mb-4 mt-8">
                    <div className="p-4 w-2/4 grid">
                        <h2 className="text-2xl text-black font-semibold">Total Price</h2>
                        <p className='text-lg mb-2'>Product Name: {productscart.map(item => item.productId.name).join(', ')}</p>
                        <p className="text-lg mb-2">Quantity: {productscart.reduce((acc, item) => acc + item.quantity, 0)}</p>
                        <p className="text-lg mb-2">Total price (RWF): {totalPrice}</p>
                        <button onClick={handleButtonClick} className='bg-blue-900 hover:bg-yellow-800 text-white font-bold py-2 px-4 rounded'>Make payment</button>
                    </div>
                </div>
            </div>
            <div>
                <div className="fixed bottom-8 right-8">
                    <button
                        className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-indigo-500 hover:to-blue-500 text-white font-bold p-4 rounded-full shadow-2xl transition duration-300 ease-in-out transform hover:scale-110"
                        onClick={toggleModal}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.919 8.919 0 01-4.7-1.37l-4.27.9a1 1 0 01-1.18-1.18l.9-4.27A8.92 8.92 0 012 10c0-4.418 3.134-8 7-8s8 3.134 8 8zM9 8a1 1 0 100-2 1 1 0 000 2zm4 0a1 1 0 100-2 1 1 0 000 2zm-8 2a1 1 0 011-1h6a1 1 0 010 2H6a1 1 0 01-1-1z" clipRule="evenodd" />
                        </svg>
                    </button>
                </div>

                {isModalOpen && (
                    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
                        <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:w-full sm:max-w-lg">
                            <div className="flex justify-end p-2">
                                <button
                                    className="text-gray-400 hover:text-gray-600"
                                    onClick={toggleModal}
                                >
                                    <button className="bg-blue-300 text-black hover:text-white hover:bg-red-500 px-2 py-1 rounded mb-4" >X</button>
                                </button>
                            </div>
                            <div className="p-6">
                            <ClientChat vendorId={vendorId} clientId={clientId} />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Orders;
