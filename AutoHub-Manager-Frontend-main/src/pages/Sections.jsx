import React from 'react';
import './Footers.css'; 
import { Link } from 'react-router-dom';

const Section = () => {
    return (
        <div>
            <section id="banner" className="section-m1">
                <h4>Bland New</h4>
                <h2>You Are All Welcome </h2>
                <button className="normal">
                <Link to="/clientlogin" className="">
                Find Us Here
                  </Link></button>
            </section>
        </div>
    );
}

export default Section;
