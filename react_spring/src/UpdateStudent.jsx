import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Menu from './Menu';

export default function UpdateStudent() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [values, setValues] = useState({
        name: '',
        email: '',
        phone: '',
        username: '',
        password: '',
        roles: [],
        filiere:{id:''} 
    });

    const [roles, setRoles] = useState([]);
    const [filieres, setFilieres] = useState([]);

    useEffect(() => {
       
        axios.get(`http://localhost:8082/api/students/${id}`)
            .then((result) => {
                const studentData = result.data;
                setValues({
                    id:studentData.id,
                    name: studentData.name,
                    email: studentData.email,
                    phone: studentData.phone,
                    username: studentData.username,
                    password: studentData.password,
                    roles: studentData.roles,
                    filiere: studentData.filiere.id
                });
            })
            .catch((err) => console.log(err));

      
        axios.get("http://localhost:8082/api/roles")
            .then((result) => {
                setRoles(result.data);
            })
            .catch((err) => console.log(err));

        axios.get("http://localhost:8082/api/filieres")
            .then((result) => {
                setFilieres(result.data);
            })
            .catch((err) => console.log(err));
    }, [id]);

    const handleRoleSelection = (e) => {
        const options = e.target.options;
        const selectedRoles = [];
        for (let i = 0; i < options.length; i++) {
            if (options[i].selected) {
                const selectedRole = roles.find(role => role.id.toString() === options[i].value);
                if (selectedRole) {
                    selectedRoles.push(selectedRole);
                }
            }
        }
        setValues({ ...values, roles: selectedRoles });
    };
    

    const updateStudent1 = async (e) => {
        e.preventDefault();
        try {
            const updatedValues = {
                ...values,
                filiere: { id: values.filiere.id } 
            };
    
            await axios.put(`http://localhost:8082/api/students/${id}`, updatedValues);
            navigate('/');
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
                        value={values.username}
                        onChange={(e) => setValues({ ...values, username: e.target.value })}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                        placeholder='Enter the UserName'
                    />
                    <input
                        type='password'
                        value={values.password}
                        onChange={(e) => setValues({ ...values, password: e.target.value })}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                        placeholder='Enter the password'
                    />
                    <input
                        type='text'
                        value={values.name}
                        onChange={(e) => setValues({ ...values, name: e.target.value })}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                        placeholder='Enter the Full Name'
                    />
                    <input
                        type='text'
                        value={values.email}
                        onChange={(e) => setValues({ ...values, email: e.target.value })}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                        placeholder='Enter the email'
                    />
                    <input
                        type='text'
                        value={values.phone}
                        onChange={(e) => setValues({ ...values, phone: e.target.value })}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                        placeholder='Enter the phone'
                    />

                    <select
                        value={values.filiere.id}
                        onChange={(e) => setValues({ ...values, filiere: { id: e.target.value } })}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                    >
                        <option value="">Sélectionner une filière</option>
                        {filieres.map((filiere) => (
                            <option key={filiere.id} value={filiere.id}>
                                {filiere.libelle}
                            </option>
                        ))}
                    </select>

                    <select
                    multiple
                    value={values.roles.map(role => role.id.toString())}
                        onChange={handleRoleSelection}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                >
                    {roles.map((role) => (
                        <option key={role.id} value={role.id}>
                            {role.name}
                        </option>
                    ))}
                </select>


                    <div className='flex space-x-2 justify-center mt-4'>
                    <button onClick={updateStudent1} className='bg-blue-600 text-white uppercase font-extrabold mx-6 mt-2 p-2 rounded-md'>Update</button>
                   <button onClick={()=>{navigate("/")}} className='bg-red-600 text-white uppercase font-extrabold mx-6 mt-2 p-2 rounded-md'>Annuler</button>
    
                    </div>
                </form>
            </div>
        </>
  )
}
