import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Menu from './Menu';

export default function UpdateFiliere() {
    const [values, setValues] = useState({
        id:"",
        code: "",
        libelle:""
       

    })
    const { id } = useParams();
    const navigate = useNavigate()

    useEffect(() => {
        axios.get(`http://localhost:8082/api/filieres/${id}`)
            .then((result) => {
              
                setValues({
                    id:result.data.id,
                    code: result.data.code,
                    libelle: result.data.libelle,
                   
                });
            })
            .catch((err) => console.log(err));

    }, [])
    const updateFiliere1 = async (e) => {
        e.preventDefault();
        try {
        
          const response = await axios.put(`http://localhost:8082/api/filieres/${id}`, values);
      
        
          navigate('/filiere');
         ;
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
          value={values.code}
          onChange={(e) => setValues({ ...values, code: e.target.value })}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
          placeholder='Enter the code'
        />
        <input
          type='text'
          value={values.libelle}
          onChange={(e) => setValues({ ...values, libelle: e.target.value })}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
          placeholder='Enter the libelle'
        />
        
        <div className='flex space-x-2 justify-center mt-4'>
          <button onClick={updateFiliere1} className='bg-blue-600 text-white uppercase font-extrabold mx-6 mt-2 p-2 rounded-md'>Update</button>
          <button onClick={()=>{navigate("/filiere")}} className='bg-red-600 text-white uppercase font-extrabold mx-6 mt-2 p-2 rounded-md'>Annuler</button>
        </div>
      </form>
    </div>
    </>
  )
}
