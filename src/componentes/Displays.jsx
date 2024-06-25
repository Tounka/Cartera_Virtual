import styled from 'styled-components'
import { useDatos } from '../js/DatosContext'
import { useState } from 'react'
import { Header } from './Header'
import { ModalAgregarTarjeta } from './CompModalCrud'

export const DisplayPrincipal = styled.div`
    width: 100%;
    height: auto;
    padding: 10px 20px;
`
export const ContenedorPrincipal =styled.div`
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;

    width: 100%;
    height: 100%;
`

export const DisplayPrincipalV2 = ({children }) =>{
    const data = useDatos();
    const [switchModalAgregarTarjeta, setSwitchModalAgregarTarjeta] = useState(0);

    const {ruta, setRuta} =  useDatos();
    return(
        <>
            <ModalAgregarTarjeta userId={data.userMeta?.sub} switchModalAgregarTarjeta={switchModalAgregarTarjeta} setSwitchModalAgregarTarjeta={setSwitchModalAgregarTarjeta}  ></ModalAgregarTarjeta>
            <Header   setSwitchModalAgregarTarjeta={setSwitchModalAgregarTarjeta} ruta={ruta} setRuta={setRuta}/>
            <DisplayPrincipal>
                {children }
            </DisplayPrincipal>
        </>
    
    );
}


export const ContenedorHeader = styled(DisplayPrincipal)`
    display: flex;
    justify-content:space-between;
    align-items:center;

    border-radius: 0 0 20px 20px;
    height: 80px;
    padding: 0;
    margin-bottom: 20px;
    color: white;
    font-weight:bold;
    font-size: 26px;

    background-color: var(--colorPv1);
    overflow:hidden;
`