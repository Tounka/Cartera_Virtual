import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from './paginas/Index';
import { Header } from './componentes/Header';
import { Data } from "../src/js/Datos.js";
function App() {
  return (
    <>
      <Header usuario = {Data[0].Nombre} />
          <BrowserRouter>
            <Routes path= '/'>
              <Route index element={<Index Data = {Data} />} />
            </Routes>
          </BrowserRouter>
    </>
  );
}

export default App;
