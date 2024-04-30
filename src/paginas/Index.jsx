import { DisplayPrincipal } from "../componentes/Displays";
import { Starjetas } from "../componentes/STarjetas";
import { SCardTarjetas } from "../componentes/SCardsTarjetas";
import { Header } from '../componentes/Header';
import {  useNavigate } from "react-router-dom";
import { supabase } from "../supabase/client";
import { useEffect, useState } from "react";
import { ModalAgregarTarjeta } from "../componentes/CompModalCrud.jsx";
import { useDatos } from "../js/DatosContext.js";
const Index = () => {
    const data = useDatos();
    const [user, setUser] = useState(data.userMeta);
    
    const navigate = useNavigate();
    const [switchModalAgregarTarjeta, setSwitchModalAgregarTarjeta] = useState(0);
    
    useEffect(() =>{
        if(!user){
            
                navigate('/');
             
            
           
        }else{
          
        }
    }, [user]);


    
    
    return(
        <>
        <ModalAgregarTarjeta userId={user?.sub} switchModalAgregarTarjeta={switchModalAgregarTarjeta} setSwitchModalAgregarTarjeta={setSwitchModalAgregarTarjeta}  ></ModalAgregarTarjeta>
        <Header usuario = {user?.Nombre}  setSwitchModalAgregarTarjeta={setSwitchModalAgregarTarjeta}/>
        <DisplayPrincipal>
            <SCardTarjetas />
            <Starjetas tarjetas = {data.cardMeta} />
            
        </DisplayPrincipal>
        </>
   
        
    )
  
}

export default Index;