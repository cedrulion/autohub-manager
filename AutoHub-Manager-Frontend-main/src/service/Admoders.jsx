import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Feedback from './Feedback';

const AppointmentList = () => {
  const [appointments, setAppointments] = useState([]);
  const [displayQuestionTypePage, setDisplayQuestionTypePage] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:4000/api/cart/all-appointments') // Ensure this endpoint is correct
      .then((response) => {
        setAppointments(response.data);
      })
      .catch((error) => {
        console.error('Error fetching appointments:', error);
      });
  }, []);

  const handleQuestionTypeClick = () => {
    setDisplayQuestionTypePage(true);
  };

  const handleBackToListClick = () => {
    setDisplayQuestionTypePage(false);
  };

  return (
    <div className="font-serif mt-16 container mx-auto px-4 py-8">
      {!displayQuestionTypePage ? (
        <>
          <div className='mt-8 pdf-button-container flex justify-end'>
            <button className="pdf-button -right bg-blue-500 text-xm" onClick={handleQuestionTypeClick}>
              Feedback List 
            </button>
          </div>
          <h1 className="text-3xl font-semibold text-blue-500 mb-4">Appointment List</h1>
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden border:gray-400">
            <thead>
              <tr className="bg-gray-900 text-white font-bold">
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Full Names
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Phone Number
                </th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appointment, index) => (
                <tr key={appointment._id} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white hover:bg-gray-200'}>
                  <td className="px-6 py-4 text-black whitespace-no-wrap">{appointment.user && appointment.user.names}</td>
                  <td className="px-6 py-4 text-black whitespace-no-wrap">{appointment.user && appointment.user.email}</td>
                  <td className="px-6 py-4 text-black whitespace-no-wrap">{new Date(appointment.date).toLocaleString()}</td>
                  <td className="px-6 py-4 text-black whitespace-no-wrap">{appointment.location}</td>
                  <td className="px-6 py-4 text-black whitespace-no-wrap">{appointment.phoneNumber}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : (
        <div>
          <button className="pdf-button -right bg-blue-500 text-xm" onClick={handleBackToListClick}>Appointment List</button>
          <Feedback selectedProduct={selectedProduct} />
        </div>
      )}
    </div>
  );
}

export default AppointmentList;
