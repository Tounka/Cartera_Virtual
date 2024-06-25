import { DisplayPrincipal, DisplayPrincipalV2 } from "../componentes/Displays";
import { Starjetas } from "../componentes/STarjetas";
import { SCardTarjetas } from "../componentes/SCardsTarjetas";
import { useEffect, useState } from "react";
import { useDatos } from "../js/DatosContext.js";
import { TitularSTarjetas } from "../componentes/STarjetas";
import { SeccionBtnFecha } from "../componentes/CompSFechaDatos.jsx";
import styled from "styled-components";

const TitularPrincipal = styled(TitularSTarjetas)`
    display:grid;
`
const Index = () => {
    const data = useDatos();
    
    
    const [tarjetasActivos, setTarjetasActivos] = useState();
    const [tarjetasPasivos, setTarjetasPasivos] = useState();
    const {actualizadorDeDatos, actualizadorDeUsuario, setAnimacionEncendida, animacionEncendida} = useDatos();

    useEffect(()=>{
        actualizadorDeDatos();
        actualizadorDeUsuario();

        setTimeout(() => {
            setAnimacionEncendida(false);
        }, 4000);
       
    },[]);

    useEffect(() => {
       
       if(data.cardMeta){
            const tarjetas = data.cardMeta;
            
            const pasivo = tarjetas.filter(tarjeta => {
                if(tarjeta.deudas === undefined || tarjeta.deudas==0){
                     
                    return tarjeta;
                }else{
                const ultimaDeuda = tarjeta.deudas[tarjeta.deudas.length - 1]; // Accede al último elemento del arreglo de deudas
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
   
        <DisplayPrincipalV2>
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
            
       
        </DisplayPrincipalV2>
        
        
        </>
   
        
    )
  
}

export default Index;