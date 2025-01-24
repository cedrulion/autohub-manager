import React from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
  Button,
  IconButton,
  Input,
  Textarea,
} from "@material-tailwind/react";
import { UsersIcon } from "@heroicons/react/24/solid";
import { PageTitle, Footer } from "@/widgets/layout";
import { FeatureCard, TeamCard } from "@/widgets/cards";
import { featuresData, teamData, contactData } from "@/data";
import { Link } from "react-router-dom";
import peakpx from '../pic/peakpx.jpg';
import Navigation from '../pages/Navigation'
import Footers from "../pages/Footers";
import Conpanyrelatedinfo from "../service/Companyrelatedinfo";
import Sections from "./Sections";

export function Home() {
  return (
    <div className="font-serif">
      <div className=" relative flex h-screen content-center items-center justify-center pt-16 pb-32 ">
        <img src={peakpx} alt="Background" className="absolute top-0 h-full w-full object-cover" />
        <div className="absolute top-0 h-full w-full bg-black opacity-50" />
        <div className="max-w-8xl container relative mx-auto">
          <Navigation />
          <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
          <div className="flex flex-wrap items-center">
          
            <div className="w-full lg:w-8/12 lg:pl-9">
              <Typography variant="lead" color="white" className="opacity-90 font-bold font-serif">
                Elevate your dealership's performance <br />
                with AutoHub Manager, the all-in-one<br />
                solution for seamless inventory <br />
                management, customer relations, and <br />
                accelerated sales growth.
              </Typography>
              <br /> <br />
              <Link to="/clientlogin" className="w-32 rounded-md text-white font-medium text-sm px-6 py-2.5 text-center border border-blue-900 bg-blue-900 hover:text-white ml-2">
                Customer
              </Link>
              <Link to="/vendorlogin" className="w-32 rounded-md text-white font-medium text-sm px-6 py-2.5 text-center border border-blue-900  hover:text-white ml-2">
                Vendor
              </Link>

            </div>
            
          </div>
          
        </div>
        
      </div>
      <h1 className="font-bold text-3xl text-blue-500  mt-4 ml-8">New Arrivals...</h1>
      <div className=""> <Conpanyrelatedinfo/></div>
      <div className=""><Sections/></div>
      <div className=""><Footers/></div>
      
    </div>
  );
}

export default Home;
