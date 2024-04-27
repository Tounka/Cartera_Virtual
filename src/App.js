import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from './paginas/Index';
import Session from './paginas/Session';

import { DatosContextProvider } from './js/DatosContext.js';


function App() {


  return (
    <DatosContextProvider>
          <BrowserRouter>
            <Routes path= '/'>
              <Route  path='Cartera'  element={<Index />} />
              <Route  index  element={<Session/>} />
            </Routes>
          </BrowserRouter>
    </DatosContextProvider>
  );
}

export default App;
