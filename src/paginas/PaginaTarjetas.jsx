import styled from "styled-components";
import { useDatos } from "../js/DatosContext";
import { Tarjeta } from "../componentes/CompPaginaTarjeta";
import { DisplayPrincipal } from "../componentes/Displays";
import { Header } from "../componentes/Header";
import { ModalAgregarTarjeta } from "../componentes/CompModalCrud";
import { useState } from "react";


const GridTarjetas = styled.div`
    display:grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    width: 100%;
    height: auto;
  
    @media (max-width: 900px) {
        grid-template-columns: 1fr 1fr;
    }
    @media (max-width: 400px) {
        grid-template-columns: 1fr;
    }
`
const ContenedorTarjeta = styled.div`
display:flex;
    justify-content: center;
    align-items:center;
    width: 100%;
`
export const PaginaTarjetas = () => {
    const data = useDatos();
    const [switchModalAgregarTarjeta, setSwitchModalAgregarTarjeta] = useState(0);
    
    return(
        
        <>
            <ModalAgregarTarjeta userId={data.userMeta?.sub} switchModalAgregarTarjeta={switchModalAgregarTarjeta} setSwitchModalAgregarTarjeta={setSwitchModalAgregarTarjeta}  ></ModalAgregarTarjeta>
            <Header   setSwitchModalAgregarTarjeta={setSwitchModalAgregarTarjeta}/>
            <DisplayPrincipal>
                <GridTarjetas>
                {data.cardMeta.map((card, index) => (
                   <ContenedorTarjeta>
                        <Tarjeta
                            key={index}
                            nombreTarjeta={card.nombre}
                            saldoTarjeta={card.deudas[card.deudas.length - 1].saldoalafecha}
                            limiteCredito={card.limiteCredito}
                            msi={card.msi}
                            credito={card.credito}
                            fechaDeCorte={card.fechaDeCorte}
                        />
                   </ContenedorTarjeta>
           
                ))}
                
                </GridTarjetas>
            </DisplayPrincipal>
        </>

    )
}