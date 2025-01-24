import React from 'react';
import playStoreImage from "../pic/playStoreImage.png";
import paymentGatewaysImage from "../pic/paymentGatewaysImage.jpeg";
import './Footers.css'

const Footer = () => {
    return (
        <div className='bg-gray-200  '>
        <footer className="section-p1 flex flex-wrap justify-between">
            <div className="col mt-4">
                
                <h7 className="text-black font-bold text-lg ">Contact</h7><br />
                <p className="text-black">Address: 99 kigali,kicukiro,street32</p><br />
                <p className="text-black">Phone: +250783842055 / +25073113942</p><br />
                <p className="text-black">Hours: 08:00-23:00, Mon - Sat</p><br />
            </div>
            <div className="col mt-4">
                <h7 className="font-bold text-lg">About</h7><br />
                <a href="#" className="text-black">About us</a><br />
                <a href="#" className="text-black">Delivery Information</a><br />
                <a href="#" className="text-black">Privacy Policy</a><br />
                <a href="#" className="text-black">Terms & Condition</a><br />
                <a href="#" className="text-black">Contact us</a><br />
            </div>
            <div className="col mt-4">
                <h7 className="font-bold text-lg">My Account</h7><br />
                <a href="#" className="text-black">About us</a><br />
                <a href="#" className="text-black">Delivery Information</a><br />
                <a href="#" className="text-black">Privacy Policy</a><br />
                <a href="#" className="text-black">Terms & Condition</a><br />
                <a href="#" className="text-black">Contact us</a><br />
            </div>
            <div className="col install mt-4">
                <h7 className="font-bold text-lg">Install App</h7><br />
                <p className="text-black">From App Store or Google Play</p>
                <div className="row">
                <img src={playStoreImage} alt="Play Store" />
           </div>
                <p className="text-black">Secured Payment Gateways</p>
                <img src={paymentGatewaysImage} alt="Payment Gateways" />
            </div>
            
        </footer>
        
                <p className="text-black text-center">Copyright © 2024, Autohub Manager - All Rights Reserved </p>
        
        </div>
    );
}

export default Footer;
