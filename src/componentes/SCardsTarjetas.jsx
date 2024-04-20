import styled from "styled-components";
import { ContenedorPrincipal } from "./Displays";

export const ContenedorCards = styled.div`
    display:flex;
    justify-content: space-between;

    width: 100%;
    padding: 20px 0;
    gap: 20px;
`
const CardTStyled = styled(ContenedorPrincipal)`
    
    height: 150px;
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
    return(
        <ContenedorCards>
            <CardT nombreTarjeta='Activos' cantidad='cambiar'></CardT>
            <CardT nombreTarjeta='Pasivos' cantidad='cambiar'></CardT>
            <CardT nombreTarjeta='Deudas'  cantidad='cambiar'></CardT>
        </ContenedorCards>
    )
}