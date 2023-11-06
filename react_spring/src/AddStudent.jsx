import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Menu from './Menu';

export default function AddStudent() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [selectedRoles, setSelectedRoles] = useState([]);
    const [selectedFiliere, setSelectedFiliere] = useState('');
    const [roles, setRoles] = useState([]);
    const [filieres, setFilieres] = useState([]);
    const navigate = useNavigate();

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
        setSelectedRoles(selectedRoles);
    };

    const submit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:8082/api/students", {
                name: name,
                email: email,
                phone: phone,
                username: username,
                password: password,
                roles: selectedRoles,
                filiere: { id: selectedFiliere }
            });

            console.log("Réponse de la requête :", response.data);

         
            setName('');
            setEmail('');
            setPhone('');
            setPassword('');
            setUserName('');
            setSelectedRoles([]);
            setSelectedFiliere('');
        } catch (error) {
            console.error("Erreur lors de l'envoi de la requête :", error);
        }
    };

    useEffect(() => {
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
    }, []);

    return (
        <>
        <Menu/>
            <div>
                <form className="grid grid-cols-1 m-auto mt-20 space-y-6 w-6/12">
                    <input
                        type='text'
                        value={username}
                        onChange={(e) => setUserName(e.target.value)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                        placeholder='Enter the UserName'
                    />
                    <input
                        type='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                        placeholder='Enter the password'
                    />
                    <input
                        type='text'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                        placeholder='Enter the Full Name'
                    />
                    <input
                        type='text'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                        placeholder='Enter the email'
                    />
                    <input
                        type='text'
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                        placeholder='Enter the phone'
                    />

                    <select
                        value={selectedFiliere}
                        onChange={(e) => setSelectedFiliere(e.target.value)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                    >
                        <option value="">Sélectionner une filière</option>
                        {filieres.map((filiere) => (
                            <option key={filiere.id} value={filiere.id}>
                                {filiere.libelle}
                            </option>
                        ))}
                    </select>
                    <label  className="bg-gray-50  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5" >Add Role </label>
                    <select
                    multiple
                    value={selectedRoles.map(role => role.id.toString())}
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
                        <button onClick={submit} className='bg-blue-600 text-white uppercase font-extrabold mx-6 mt-2 p-2 rounded-md'>Envoyer</button>
                        <button onClick={() => { navigate("/") }} className='bg-red-600 text-white uppercase font-extrabold mx-6 mt-2 p-2 rounded-md'>Annuler</button>
                    </div>
                </form>
            </div>
        </>
    );
}
