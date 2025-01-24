import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserList = () => {
  const [users, setUsers] = useState([]);
  
  useEffect(() => {
   
    axios.get('http://localhost:4000/api/user/client-list')
      .then((response) => {
        setUsers(response.data.users);
       
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
        
      });
  }, []);


  return (
    <div className="font-serif mt-16 container mx-auto px-4 py-8  ">
      <h1 className="text-3xl font-semibold text-blue-500 mb-4 ">Registered Clients</h1>

      {/* {loading ? (
        <p>Loading...</p>
      ) : ( */}
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden border:gray-400">
          <thead>
            <tr className="bg-gray-900 text-white font-bold ">
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Full Names
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Address
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Phone Number
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Email
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white hover:bg-gray-200'}>
                <td className="px-6 py-4 text-black whitespace-no-wrap">{user.names}</td>
                <td className="px-6 py-4 text-black whitespace-no-wrap">{user.address}</td>
                <td className="px-6 py-4 text-black whitespace-no-wrap">{user.phone}</td>
                <td className="px-6 py-4 text-black whitespace-no-wrap">{user.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      {/* )} */}
    </div>
  );
}

export default UserList;
