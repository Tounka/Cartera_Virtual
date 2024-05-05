import { DisplayPrincipal } from "../componentes/Displays";
import { Starjetas } from "../componentes/STarjetas";
import { SCardTarjetas } from "../componentes/SCardsTarjetas";
import { Header } from '../componentes/Header';
import {  useNavigate } from "react-router-dom";
import { supabase } from "../supabase/client";
import { useEffect, useState } from "react";
import { ModalAgregarTarjeta } from "../componentes/CompModalCrud.jsx";
import { useDatos } from "../js/DatosContext.js";
import { TitularSTarjetas } from "../componentes/STarjetas";
import { SeccionBtnFecha } from "../componentes/CompSFechaDatos.jsx";
import styled from "styled-components";

const TitularPrincipal = styled(TitularSTarjetas)`
    display:grid;
`
const Index = () => {
    const data = useDatos();
    const [user, setUser] = useState(data.userMeta);
    
    const [tarjetasActivos, setTarjetasActivos] = useState();
    const [tarjetasPasivos, setTarjetasPasivos] = useState();
    const navigate = useNavigate();
    const [switchModalAgregarTarjeta, setSwitchModalAgregarTarjeta] = useState(0);
    

    useEffect(() => {
       
       if(data.cardMeta){
            const tarjetas = data.cardMeta;
            
            const pasivo = tarjetas.filter(tarjeta => {
                if(tarjeta.deudas == undefined || tarjeta.deudas==0){
                     
                    return tarjeta;
                }else{
                const ultimaDeuda = tarjeta.deudas[tarjeta.deudas.length - 1]; // Accede al último elemento del arreglo de deudas
                console.log('------------',tarjeta)
                    return ultimaDeuda.saldoalafecha < 0; // Verifica si el saldo de la última deuda es menor o igual a cero
                }
                
                
              });
              const activo = tarjetas.filter(tarjeta => {
                if(tarjeta.deudas == undefined || tarjeta.deudas==0){
                    return tarjeta;
                }else{
                    const ultimaDeuda = tarjeta.deudas[tarjeta.deudas.length - 1]; // Accede al último elemento del arreglo de deudas
                    
                        return ultimaDeuda.saldoalafecha >= 0; // Verifica si el saldo de la última deuda es menor o igual a cero
                    
                    
                }
   
              });

            

            setTarjetasPasivos(pasivo);
            setTarjetasActivos(activo);
            
       }

        
    }, [data]);
    


    
    
    return(
        <>
        <ModalAgregarTarjeta userId={data.userMeta?.sub} switchModalAgregarTarjeta={switchModalAgregarTarjeta} setSwitchModalAgregarTarjeta={setSwitchModalAgregarTarjeta}  ></ModalAgregarTarjeta>
        <Header   setSwitchModalAgregarTarjeta={setSwitchModalAgregarTarjeta}/>
        <DisplayPrincipal>
            <SCardTarjetas />
            {tarjetasPasivos && tarjetasActivos ? ( 
                <>
                          <>
                <Starjetas tarjetas = {tarjetasPasivos} titulo={'Créditos'} />
                <Starjetas tarjetas = {tarjetasActivos} titulo={'Activos'} />
                </>
                    <DisplayPrincipal >
                    <SeccionBtnFecha />
                </DisplayPrincipal>
                </>
          
            ) : <TitularPrincipal>Agrega tarjetas dando click al icono de tarjeta :D</TitularPrincipal>}
            
       
        </DisplayPrincipal>
        
        
        </>
   
        
    )
  
}

export default Index;