import { supabase } from "../supabase/client.js";
import { ContenedorHeader } from "./Displays";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { FaCreditCard } from "react-icons/fa";
import { RiLogoutCircleLine } from "react-icons/ri";
import { useDatos } from "../js/DatosContext.js";
import { useState } from "react";

const BotonLogOutStyled = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    width: 20%;
    height: 100%;
    font-size: 18px;
    background-color: var(--colorPv5);
    border: none;
    cursor: pointer;
    user-select: none;

    &:first-of-type {
        right: 0;
    }
`;

const UserNameStyled = styled.div`
    cursor: pointer;
    color: white;
    font-size: 18px;
    font-weight: bold;
    user-select: none;
    font-size: 24px;
`;

export const Header = ({ setSwitchModalAgregarTarjeta, ruta, setRuta }) => {
    const navigate = useNavigate();
    const { userMeta } = useDatos();
    
    
    const handleClickBtnPrincipal = () =>{
        if(ruta === 0){
            setRuta(1);
        }else{
            setRuta(0);
        }
        const rutas = [
            'tarjetas', 'cartera'
        ]
        navigate(`/${rutas[ruta]}`);

    
    }

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        navigate('/');
    }

    const handleModalAddCard = () => {
        setSwitchModalAgregarTarjeta(1);
    } 


    return (
        <ContenedorHeader>
            <BotonLogOutStyled onClick={handleSignOut}>
                <RiLogoutCircleLine size={32}/> 
            </BotonLogOutStyled>
            <UserNameStyled onClick={() =>  handleClickBtnPrincipal()}>
                Hola {userMeta?.Nombre} 
            </UserNameStyled>
            <BotonLogOutStyled onClick={handleModalAddCard}>
                <FaCreditCard size={32}/> 
            </BotonLogOutStyled>
        </ContenedorHeader>
    )
}
