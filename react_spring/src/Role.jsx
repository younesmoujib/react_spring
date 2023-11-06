import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Menu from './Menu';

function Role() {
  const [api, setApi] = useState([]);
  const navigate = useNavigate();

  const fetchapi = () => {
    axios.get('http://localhost:8082/api/roles')
    .then(response => {
      setApi(response.data); 
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
  };

  useEffect(() => {
    fetchapi();
  }, []); 

  const deleteRole = (id) => {
    axios.delete(`http://localhost:8082/api/roles/${id}`) 
      .then((res) => {
      
        setApi(api.filter((item) => item.id !== id));
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
    <Menu/>
      <div className='flex justify-center'>
        <button onClick={() => navigate('/addrole')} className='bg-blue-600 text-white uppercase font-extrabold mx-6 mt-2 p-2 rounded-md'>add Role</button>
      </div>
      <div className='flex py-10 justify-center ' >
        <table className='className="min-w-full">'>
          <thead >
            <tr>
      
            <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Name</th>
     
            <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody>
            {api.map((item) => (
              <tr  key={item.id}>
               <td className="border px-6 py-4">{item.name}</td>
               <td className="border px-6 py-4">
                  <button onClick={(e) => deleteRole(item.id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2">
                  Delete
                  </button>
                  <button  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">  <Link to={`/updaterole/${item.id}`}>modify</Link></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Role;
