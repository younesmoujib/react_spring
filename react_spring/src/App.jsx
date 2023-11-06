import React from "react";
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Role from "./Role";
import AddRole from "./AddRole";
import UpdateRole from "./UpdateRole";
import AddFiliere from "./AddFiliere";
import UpdateFiliere from "./UpdateFiliere";
import Filiere from "./Filiere";
import AddStudent from "./AddStudent";
import Student from "./Student";
import UpdateStudent from "./UpdateStudent";


function App() {
  

  return (
    <>
     
     <BrowserRouter>
	   <Routes>
     <Route exact path="/" element={<Student/>}/>
		<Route exact path="/addstudent" element={<AddStudent/>}/>
    <Route exact path="/updatestudent/:id" element={<UpdateStudent/>}/>
		 <Route exact path="/role" element={<Role/>}/>
		<Route exact path="/addrole" element={<AddRole/>}/>
    <Route exact path="/updaterole/:id" element={<UpdateRole/>}/> 
    <Route exact path="/filiere" element={<Filiere/>}/>
		<Route exact path="/addfiliere" element={<AddFiliere/>}/>
    <Route exact path="/updatefiliere/:id" element={<UpdateFiliere/>}/>
   
	
	  </Routes>
	  </BrowserRouter>
    </>
  )
}

export default App
