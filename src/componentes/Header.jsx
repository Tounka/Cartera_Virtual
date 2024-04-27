import { supabase } from "../supabase/client.js"
import { ContenedorHeader } from "./Displays"
import styled from "styled-components"
import { useNavigate } from "react-router-dom"
export const BotonLogOutStyled = styled.button`
    
    display:flex;
    justify-content:center;
    align-items:center;
    color:white;
    right: 0;
    top: 0;
    width: 20%;
    height: 100%;
    
    background-color: var(--colorPv5);
    border:none;
    cursor: pointer;
    user-select: none;
` 


export const Header = ({usuario, setSwitchModalAgregarTarjeta}) =>{
    const navigate = useNavigate();
    const handleSingOut = () =>{
        supabase.auth.signOut();
        navigate('/')
    }
    const handleModalAddCard = ()=>{
        setSwitchModalAgregarTarjeta(1);
    } 
    return(
        <ContenedorHeader>
            <BotonLogOutStyled onClick= {() =>handleSingOut() }>Salir</BotonLogOutStyled>
            <> Hola {usuario} </>
            <BotonLogOutStyled onClick={() => handleModalAddCard() }>Actualizar Datos</BotonLogOutStyled>
        </ContenedorHeader>
    )
}