import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Menu from './Menu';


export default function UpdateRole() {
    const [values, setValues] = useState({
        name: "",
       

    })
    const { id } = useParams();
    const navigate = useNavigate()

    useEffect(() => {
        axios.get(`http://localhost:8082/api/roles/${id}`)
            .then((result) => {
              
                setValues({
                    name: result.data.name,
                   
                });
            })
            .catch((err) => console.log(err));

    }, [])
   
    const updateRole1 = async (e) => {
      e.preventDefault();
      try {
      
        const response = await axios.put(`http://localhost:8082/api/roles/${id}`, values);
    
      
        navigate('/role');
        
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    };
  return (
    <>
    <Menu/>
    <div>
      <form className="grid grid-cols-1 m-auto mt-20 space-y-6 w-6/12">
        <input
          type='text'
          value={values.name}
          onChange={(e) => setValues({ ...values, name: e.target.value })}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
          placeholder='Enter the name'
        />
        
        <div className='flex space-x-2 justify-center mt-4'>
          <button onClick={updateRole1} className='bg-blue-600 text-white uppercase font-extrabold mx-6 mt-2 p-2 rounded-md'>Update</button>
          <button onClick={()=>{navigate("/role")}} className='bg-red-600 text-white uppercase font-extrabold mx-6 mt-2 p-2 rounded-md'>Annuler</button>
        </div>
      </form>
    </div>
    </>
  )
}
