import React, { useState } from 'react';
import axios from 'axios';

const Addingcar = () => {

    const [formData, setFormData] = useState({
        name:'',
        price: '',
        gearbox: '',
        tank: '',
        status: '',
        basicInfo: '',
        region: '',
        color: '',
        moreDetails: '',
        photo: [],
    });



    const [submissionStatus, setSubmissionStatus] = useState(null);


    const handleFileChange = (e) => {
        setFormData({
            ...formData,
            photo: [...e.target.files],
        });
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formDataToSend = new FormData();
        for (const key in formData) {
            if (formData.hasOwnProperty(key)) {
                if (key === 'photo') {
                    for (let i = 0; i < formData[key].length; i++) {
                        formDataToSend.append('photo', formData[key][i]);
                    }
                } else {
                    formDataToSend.append(key, formData[key]);
                }
            }
        }

        try {
            await axios.post('http://localhost:4000/api/prod/addproduct', formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setSubmissionStatus('success');
            alert('Request submitted successfully.');
            // Reset form fields
            setFormData({
                name:'',
                price: '',
                gearbox: '',
                tank: '',
                status: '',
                basicInfo: '',
                region: '',
                color: '',
                moreDetails: '',
                photo: [],
            });
        } catch (error) {
            console.error(error);
            setSubmissionStatus('error');
            alert('Error submitting problem report.');
        }
    };



    return (
        <div className="font-serif flex  bg-gray-300 rounded-lg items-right">

            <div className=" WEWE  bg-blue rounded-lg shadow-md">
                <h2 className="text-xl font-semibold text-blue-500 "> New product  </h2>
                <br />
                {submissionStatus === 'success' ? (
                    <div className="text-green-900 font-semibold">Added successfully.</div>
                ) : submissionStatus === 'error' ? (
                    <div className="text-red-600">Error of adding product .</div>
                ) : null}

                <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <div className=" px-3 mb-4">
                        <label htmlFor="photo" className="block uppercase text-xs font-semibold">
                            <label htmlFor="role" className="block font-bold brown">
                                <span style={{ fontWeight: 'bold' }}>Add photo</span>:
                            </label>
                        </label>
                        <input
                            type="file"
                            id="photo"
                            name="photo"
                            multiple
                            onChange={handleFileChange}
                            className="w-full mt-2 text-gray-800 border rounded-md focus:outline-none focus:ring focus:ring-indigo-300"
                        />

                    </div>
                    <div className="px-3 mb-4">
                        <label htmlFor="name" className="block uppercase text-xs font-semibold">
                            Name:
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Enter your car name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-4 py-2 text-gray-800 border rounded-md focus:outline-none focus:ring focus:ring-indigo-300"
                            required
                        />
                    </div>
                    <div className="px-3 mb-4">
                        <label htmlFor="price" className="block uppercase text-xs font-semibold">
                            Price (RWF):
                        </label>
                        <input
                            type="text"
                            id="price"
                            name="price"
                            placeholder="Enter your price"
                            value={formData.price}
                            onChange={handleChange}
                            className="w-full px-4 py-2 text-gray-800 border rounded-md focus:outline-none focus:ring focus:ring-indigo-300"
                            required
                        />
                    </div>
                    <div className="px-3 mb-4">
                        <label htmlFor="gearbox" className="block uppercase text-xs font-semibold">
                            Gearbox:
                        </label>
                        <input
                            type="text"
                            id="gearbox"
                            name="gearbox"
                            placeholder="Enter your gearbox"
                            value={formData.gearbox}
                            onChange={handleChange}
                            className="w-full px-4 py-2 text-gray-800 border rounded-md focus:outline-none focus:ring focus:ring-indigo-300"
                            required
                        />
                    </div>
                    <div className="px-3 mb-4">
                        <label htmlFor="tank" className="block  uppercase text-xs font-semibold">
                            Tank:
                        </label>
                        <input
                            type="text"
                            id="tank"
                            name="tank"
                            placeholder="Enter your tank"
                            value={formData.tank}
                            onChange={handleChange}
                            className="w-full px-4 py-2 text-gray-800 border rounded-md focus:outline-none focus:ring focus:ring-indigo-300"
                            required
                        />
                    </div>
                    <div className="px-3 mb-4">
                        <label htmlFor="status" className="block  uppercase text-xs font-semibold ">
                            Status:
                        </label>
                        <select
                            id="status"
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            className="border rounded px-4 py-2 w-full"
                        >
                            <option value="">Select status</option>
                            <option value="USED">Used</option>
                            <option value="NEW">New</option>
                        </select>
                    </div>
                    <div className="px-3 mb-4">
                        <label htmlFor="basicInfo" className="block  uppercase text-xs font-semibold">
                            Basic Information:
                        </label>
                        <input
                            type="text"
                            id="basicInfo"
                            name="basicInfo"
                            placeholder="Enter your basic Information"
                            value={formData.basicInfo}
                            onChange={handleChange}
                            className="w-full px-4 py-2 text-gray-800 border rounded-md focus:outline-none focus:ring focus:ring-indigo-300"
                            required
                        />
                    </div>
                    <div className="px-3 mb-4">
                        <label htmlFor="region" className="block  uppercase text-xs font-semibold">
                            Region:
                        </label>
                        <input
                            type="text"
                            id="region"
                            name="region"
                            placeholder="Enter your region"
                            value={formData.region}
                            onChange={handleChange}
                            className="w-full px-4 py-2 text-gray-800 border rounded-md focus:outline-none focus:ring focus:ring-indigo-300"
                            required
                        />
                    </div>
                    <div className="px-3 mb-4">
                        <label htmlFor="color" className="block  uppercase text-xs font-semibold">
                            Color:
                        </label>
                        <input
                            type="text"
                            id="color"
                            name="color"
                            placeholder="Enter car color"
                            value={formData.color}
                            onChange={handleChange}
                            className="w-full px-4 py-2 text-gray-800 border rounded-md focus:outline-none focus:ring focus:ring-indigo-300"
                            required
                        />
                    </div>
                    <div className="px-3 mb-4">
                        <label htmlFor="moreDetails" className="block  uppercase text-xs font-semibold">
                            More details:
                        </label>
                        <input
                            type="text"
                            id="moreDetails"
                            name="moreDetails"
                            placeholder="Enter  more Details"
                            value={formData.moreDetails}
                            onChange={handleChange}
                            className="w-full px-4 py-2 text-gray-800 border rounded-md focus:outline-none focus:ring focus:ring-indigo-300"
                            required
                        />
                    </div>

                    <div className=" px-3">
                        <button
                            type="submit"
                            className="bg-blue-500 uppercase hover:bg-yellow-800 text-white font-bold py-2 px-4 rounded"
                        >
                            Add product
                        </button>
                    </div>
                </form>
            </div>
        </div>

    );

};

export default Addingcar;