import { supabase } from "../supabase/client.js"
import { ContenedorHeader } from "./Displays"
import styled from "styled-components"
import { useNavigate } from "react-router-dom"
import { FaCreditCard } from "react-icons/fa";
import { RiLogoutCircleLine } from "react-icons/ri";
import { useDatos } from "../js/DatosContext.js";
export const BotonLogOutStyled = styled.button`
    
    display:flex;
    justify-content:center;
    align-items:center;
    color:white;
    right: 0;
    top: 0;
    width: 20%;
    height: 100%;
    font-size: 18px;

    background-color: var(--colorPv5);
    border:none;
    cursor: pointer;
    user-select: none;
` 


export const Header = ({ setSwitchModalAgregarTarjeta}) =>{
    const navigate = useNavigate();
    const {userMeta} = useDatos();
   
    const handleSingOut = () =>{
        supabase.auth.signOut();
        navigate('/')
    }
    const handleModalAddCard = ()=>{
        setSwitchModalAgregarTarjeta(1);
    } 
    return(
        <ContenedorHeader>
            <BotonLogOutStyled onClick= {() =>handleSingOut() }>       <RiLogoutCircleLine size={32}/> </BotonLogOutStyled>
            <> Hola {userMeta?.Nombre} </>
            <BotonLogOutStyled onClick={() => handleModalAddCard() }>  <FaCreditCard size={32}/>        </BotonLogOutStyled>
        </ContenedorHeader>
    )
}