import styled from "styled-components";
import { ContenedorPrincipal } from "./Displays";
import { useDatos } from "../js/DatosContext";
import { useEffect } from "react";
import { useState } from "react";

export const ContenedorCards = styled.div`
    display:grid;
    grid-template-columns: repeat(6, 1fr);
    

    width: 100%;
    padding: 20px 0;
    gap: 20px;

    @media (max-width: 850px) {
        grid-template-columns: repeat(3, 1fr);
    }



`
const CardTStyled = styled(ContenedorPrincipal)`
    
    height: 120px;
    border-radius: 20px;
    overflow: hidden;
    background-color: var(--colorPv2);
    justify-content: space-between;

    @media (max-width: 800px) {
        display: ${props => props.dpNone ? 'none' : ''} ;
    }
    
`
const ContenedorCards2Grid = styled.div`
    display:grid;
    grid-template-columns: repeat(2, 1fr);
    

    width: 100%;
    padding: 20px 0;
    gap: 20px;
    
    @media (min-width: 800px) {
        display: ${props => props.dpNone ? 'none' : ''} ;
    }
   
`
const ContenedorGeneral = styled.div`
    display: flex;
    
    flex-direction: column;
`
const CardTopStyled = styled.div`
    width: 100%;
    height: 60px;
    display:flex;
    justify-content:center;
    align-items:center;
    color: white;
    font-weight: bold;
    
    background-color: var(--colorPv1);
    text-align:center;
`
const CardBottomStyled = styled(CardTopStyled)`
    height: 100%;
    min-height:40px;
    background-color: transparent;

    @media (min-width: 800px) {
        display: ${props => props.dpNone ? 'none' : ''} ;
    }
`
const CardT = ({nombreTarjeta, cantidad, dpNone}) => {
    return(
        <CardTStyled dpNone={dpNone}>
            <CardTopStyled>  {nombreTarjeta} </CardTopStyled>
            <CardBottomStyled> {cantidad} </CardBottomStyled>
        </CardTStyled>
    )
}

export const SCardTarjetas = () => {
    const {cardMeta} =useDatos();
    
    const dataMap = cardMeta?.map((dato) =>{
        let xValue = 0;
        if(dato.deudas.length){
            let largoArreglo = dato.deudas.length;
            if (largoArreglo>= 1){
                xValue = (dato.deudas[largoArreglo-1].saldoalafecha)
            }else{
                return(0); 
            }
            
        }
        let datoFormateado={name: dato.nombre, value:xValue, msi: dato.msi};
    
        return(datoFormateado);
        
    });
    
    const [activos, setActivos] = useState(0);
    const [activosAhorro, setActivosAhorro] = useState(0);
    const [activosMsi, setActivosMsi] = useState(0);
    const [activosRevolvente, setActivosRevolvente] = useState(0);
    const [pasivos, setPasivos] = useState(0);
    const [diff, setDiff] = useState(0);

    const cardOperations = () => {
        let totalActivos = 0;
        let totalActivosMsi = 0;
        let totalActivosAhorro = 0 ;
        let totalPasivos = 0;
        
        dataMap?.forEach(x => {
            console.log('1');
            if (x.value > 0) {
                

                if(x.msi == true ){
                    totalActivosAhorro += x.value;
                    
                    
                }else{
                    totalActivos += x.value;
                }
            
            }
        
             else {
                totalPasivos -= x.value;
                if(x.msi == true){
                    totalActivosMsi -= x.value;
                    
                }
            }
        });

        
    
        setActivos(totalActivos);
        setActivosAhorro(totalActivosAhorro);
        setActivosMsi(totalActivosMsi);
        setPasivos(totalPasivos);
        setDiff(totalActivos - totalPasivos);
        setActivosRevolvente(totalPasivos - totalActivosMsi);
    };
    

    useEffect(() =>{
        cardOperations();
    },[cardMeta])


    return(
        <ContenedorGeneral>
        <ContenedorCards >
            <CardT nombreTarjeta='Activos' cantidad={activos.toFixed(2)}></CardT>
            <CardT nombreTarjeta='Pasivos' cantidad={pasivos.toFixed(2)}></CardT>
            <CardT nombreTarjeta='Deudas'  cantidad={diff.toFixed(2)}></CardT>


            <CardT nombreTarjeta='Saldo Msi'  cantidad={activosMsi.toFixed(2)}></CardT>
            <CardT nombreTarjeta='Saldo revolvente'  cantidad={activosRevolvente.toFixed(2)}></CardT>
            <CardT nombreTarjeta='Ahorro'  cantidad={activosAhorro.toFixed(2)}></CardT>
        </ContenedorCards>

     
      
        </ContenedorGeneral>
    
    )
}
