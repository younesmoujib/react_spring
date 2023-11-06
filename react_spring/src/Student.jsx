import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Menu from './Menu';

export default function Student() {
    const [students, setStudents] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:8082/api/students")
            .then((result) => {
                setStudents(result.data);
            })
            .catch((err) => console.log(err));
    }, []);

    const handleDelete = (id) => {
        axios.delete(`http://localhost:8082/api/students/${id}`)
            .then(() => {
                setStudents(students.filter(student => student.id !== id));
            })
            .catch((err) => console.log(err));
    };

   

    return (
        <>
        <Menu/>
         <div className='flex justify-center'>
        <button onClick={() => navigate('/addstudent')} className='bg-blue-600 text-white uppercase font-extrabold mx-6 mt-2 p-2 rounded-md'>add Student</button>
      </div>
      <div className='flex py-10 justify-center ' >
            <table className="min-w-full">
                <thead>
                    <tr>
                        <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Name</th>
                        <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Email</th>
                        <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                        <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Username</th>
                        <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Filière</th>
                        <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Roles</th>
                        <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map(student => (
                        <tr key={student.id}>
                            <td className="border px-6 py-4">{student.name}</td>
                            <td className="border px-6 py-4">{student.email}</td>
                            <td className="border px-6 py-4">{student.phone}</td>
                            <td className="border px-6 py-4">{student.username}</td>
                            <td className="border px-6 py-4">{student.filiere.libelle}</td>
                            <td className="border px-6 py-4">
                                {student.roles.map(role => (
                                    <span key={role.id}>{role.name}, </span>
                                ))}
                            </td>
                            <td className="border px-6 py-4">
                                <button onClick={() => handleDelete(student.id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2">Delete</button>
                                <button  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">  <Link to={`/updatestudent/${student.id}`}>modify</Link></button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        </>
    );
}
