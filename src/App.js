import './App.css';
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import Index from './paginas/Index';
import Session from './paginas/Session';
import { useDatos } from './js/DatosContext.js';
import { useEffect, useState } from 'react';
import { supabase } from './supabase/client.js';
import { PaginaTarjetas } from './paginas/PaginaTarjetas.jsx';

const App = () => {
  const navigate = useNavigate();
  const { actualizadorDeUsuario } = useDatos();
  const [isAuthChecked, setIsAuthChecked] = useState(false);

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (!isAuthChecked) {
        if (!session) {
          navigate('/');
          actualizadorDeUsuario();
        } else {
          navigate('/Cartera');
        }
        setIsAuthChecked(true);
      }
    });

    return () => {
      authListener.unsubscribe();
    };
  }, [navigate, actualizadorDeUsuario, isAuthChecked]);

  return (
    <Routes>
      <Route path='/Cartera' element={<Index />} />
      <Route path='/Tarjetas' element={<PaginaTarjetas />} />
      <Route path='/' element={<Session />} />
    </Routes>
  );
};

export default App;
