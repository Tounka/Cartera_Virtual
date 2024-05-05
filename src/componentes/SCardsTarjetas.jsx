import styled from "styled-components";
import { ContenedorPrincipal } from "./Displays";
import { useDatos } from "../js/DatosContext";
import { useEffect } from "react";
import { useState } from "react";

export const ContenedorCards = styled.div`
    display:flex;
    justify-content: space-between;

    width: 100%;
    padding: 20px 0;
    gap: 20px;
`
const CardTStyled = styled(ContenedorPrincipal)`
    
    height: 120px;
    border-radius: 20px;
    overflow: hidden;
    background-color: var(--colorPv2);
    justify-content: space-between;
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
`
const CardT = ({nombreTarjeta, cantidad}) => {
    return(
        <CardTStyled>
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
        let datoFormateado={name: dato.nombre, value:xValue};
        
        return(datoFormateado);
        
    });
    
    const [activos, setActivos] = useState(0);
    const [pasivos, setPasivos] = useState(0);
    const [diff, setDiff] = useState(0);

    const cardOperations = () => {
        let totalActivos = 0;
        let totalPasivos = 0;
    
        dataMap?.forEach(x => {
            if (x.value > 0) {
                totalActivos += x.value;
            } else {
                totalPasivos -= x.value;
            }
        });
    
        setActivos(totalActivos);
        setPasivos(totalPasivos);
        setDiff(totalActivos - totalPasivos);
    };
    

    useEffect(() =>{
        cardOperations();
    },[cardMeta])


    return(
        <ContenedorCards >
            <CardT nombreTarjeta='Activos' cantidad={activos}></CardT>
            <CardT nombreTarjeta='Pasivos' cantidad={pasivos}></CardT>
            <CardT nombreTarjeta='Deudas'  cantidad={diff.toFixed(2)}></CardT>
        </ContenedorCards>
    )
}
