import { useState, useRef } from 'react';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Maindashboard.css';
import Overview from "./Overview";
import Orders from "./Orders";
import Information from "./Information";


function Dashboard() {
  const navigate = useNavigate();
  const [selectedItem, setSelectedItem] = useState("Overview");
  const mainContentRef = useRef(null);

  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear the token saved in localStorage
    navigate('/'); // Redirect to the homepage or any other page
};

  const handleItemClick = (item) => {
    setSelectedItem(item);
    if (mainContentRef.current) {
      mainContentRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <div className="font-serif container mx-auto ">
      
      <h1 className="text-3xl font-bold text-center text-blue-500 mb-8 ">Autohub Manager</h1>
      <div className="flex justify-between items-center">
        <ul className="lg:flex lg:gap-x-12 mt-4 ml-20">
          <li
            className={`text-2xl font-bold ${selectedItem === 'Overview' ? 'border-b-2 border-black pb-2' : 'text-gray-500'
              }`}
            onClick={() => handleItemClick('Overview')}
          >
            Overview
          </li>
          <li
            className={`text-2xl font-bold ${selectedItem === 'Orders' ? 'border-b-2 border-black pb-2' : 'text-gray-500'
              }`}
            onClick={() => handleItemClick('Orders')}
          >
            Cart
          </li>
          <li
            className={`text-2xl font-bold ${selectedItem === 'Information' ? 'border-b-2 border-black pb-2' : 'text-gray-500'
              }`}
            onClick={() => handleItemClick('Information')}
          >
            Oders
          </li>
        </ul>
        <ul className='text-2xl flex lg:flex lg:flex-1 lg:justify-end font-bold mr-20'>
          <li onClick={handleLogout} className="flex items-center cursor-pointer text-gray-500">
            <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
            Logout
          </li>
        </ul>
      </div>
      
      {/* Your dashboard content goes here */}

      <div className="w-full flex  mt-8">
        <div className="flex flex-wrap -m-4">
          {selectedItem === "Overview" && (
            <Overview />
          )}
          {selectedItem === "Orders" && (
            <Orders />
          )}
          {selectedItem === "Information" && (
            <Information/>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
