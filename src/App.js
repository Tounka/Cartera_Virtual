import './App.css';
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Index from './paginas/Index';
import Session from './paginas/Session';

import {  useDatos} from './js/DatosContext.js';
import { useEffect } from 'react';
import { supabase } from './supabase/client.js';

function App() {
  const navigate = useNavigate();
  const {actualizadorDeUsuario} =useDatos();
  useEffect(()=>{
    supabase.auth.onAuthStateChange((event, session)=>{
      if(!session){
        navigate('/')
        actualizadorDeUsuario();

      }else{
        navigate('/Cartera');
      }
    })

  },[]);

  return (
   
          
            <Routes >
              <Route  path='/Cartera'  element={<Index />} />
              <Route  path= '/' element={<Session/>} />
            </Routes>
          
   
  );
}

export default App;
