import React from 'react';
import { Link } from 'react-router-dom';

export default function Menu() {
    return (
        <div className="bg-gray-200 p-4">
            <ul className="flex space-x-4">
                <li>
                    <Link to="/role" className="text-blue-500 hover:text-blue-700">Role Management</Link>
                </li>
                <li>
                    <Link to="/" className="text-blue-500 hover:text-blue-700">Student Management</Link>
                </li>
                <li>
                    <Link to="/filiere" className="text-blue-500 hover:text-blue-700">Program Management</Link>
                </li>
            </ul>
        </div>
    );
}

