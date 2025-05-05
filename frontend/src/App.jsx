import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React from 'react';
import Login from './components/Login';
import Register from './components/Register';
 import Dashboard from './components/Dashboard';
 import CreateEmployee from './components/CreateEmployee';
 import EditEmployee from './components/EditEmployee';
 
 function App() {
   return (
     <BrowserRouter> 
       <Routes>
         <Route path="/" element={<Register/>} />
          <Route path="/login" element={<Login />} />
         <Route path="/dashboard" element={<Dashboard />} />
         <Route path="/create" element={<CreateEmployee />} />
         <Route path="/edit/:id" element={<EditEmployee />} />
       </Routes>
     </BrowserRouter>
   );
 }
 
 export default App;
 