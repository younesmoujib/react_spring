import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Menu from './Menu';

export default function AddFiliere() {
    const [code, setCode] = useState('');
    const [libelle, setLibelle] = useState('');
   
    const navigate =useNavigate()
  
    const submit = async (e) => {
      e.preventDefault();
  
  
      try {
        const response = await axios.post("http://localhost:8082/api/filieres", {
          code: code,
          libelle:libelle
         
        });
       

        console.log("Réponse de la requête :", response.data);
  
        
       setCode('');
       setLibelle('');
       
  
      } catch (error) {
     
        console.error("Erreur lors de l'envoi de la requête :", error);
      }
    }
  return (
    <>
    <Menu/>
    <div>
      <form className="grid grid-cols-1 m-auto mt-20 space-y-6 w-6/12">
        <input
          type='text'
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
          placeholder='Enter the code'
        />
        <input
          type='text'
          value={libelle}
          onChange={(e) => setLibelle(e.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
          placeholder='Enter the Libelle'
        />
        
        <div className='flex space-x-2 justify-center mt-4'>
          <button onClick={submit} className='bg-blue-600 text-white uppercase font-extrabold mx-6 mt-2 p-2 rounded-md'>Envoyer</button>
          <button onClick={()=>{navigate("/filiere")}} className='bg-red-600 text-white uppercase font-extrabold mx-6 mt-2 p-2 rounded-md'>Annuler</button>
        </div>
      </form>
    </div>
    </>
  )
}
