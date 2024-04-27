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
    const [user, setUser] = useState(supabase.auth.user());
    const navigate = useNavigate();
    const [switchModalAgregarTarjeta, setSwitchModalAgregarTarjeta] = useState(1);
    useEffect(() =>{
        if(!user){
            
            navigate('/');
        }else{
            console.log(user)
        }
    }, [user]);
  
    return(
        <>
        <ModalAgregarTarjeta userId={user?.id} switchModalAgregarTarjeta={switchModalAgregarTarjeta} setSwitchModalAgregarTarjeta={setSwitchModalAgregarTarjeta} ></ModalAgregarTarjeta>
        <Header usuario = {user?.user_metadata.Nombre}  setSwitchModalAgregarTarjeta={setSwitchModalAgregarTarjeta}/>
        <DisplayPrincipal>
            <SCardTarjetas />
            <Starjetas Data = {data.Tarjetas} />
            
        </DisplayPrincipal>
        </>
   
        
    )
  
}

export default Index;