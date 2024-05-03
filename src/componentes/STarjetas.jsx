import styled from "styled-components";
import { PieChart, Pie, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { ModalAgregarSaldo, ModalModificarTarjeta } from "./CompModalCrud";
import { useState } from "react";
import { useDatos } from "../js/DatosContext";

const ContenedorPie = styled(ResponsiveContainer)`
    min-height: 300px;
    max-height: 300px;
`
const PieGraph = ({tarjetas, titulo}) => {
    


    const dataMap = tarjetas?.map((dato) => {
        
        let xValue = 0;
        if (dato.deudas.length) {
            let largoArreglo = dato.deudas.length;
            xValue = dato.deudas[largoArreglo - 1].saldoalafecha;
            if(xValue <= 0){
                xValue = xValue * -1;
            }
        }
        
        let datoFormateado = { name: dato.nombre, value: xValue };

        return datoFormateado;

    }) || [];


    const colorArray = ['#ff7675', '#fd79a8', '#a29bfe', '#00b894', '#fdcb6e'];;
    return(
        
            

            <ContenedorPie style={{margins: '20px',}} >
            <TitularSTarjetas>{titulo}</TitularSTarjetas>

            <PieChart  >
                <Pie 
                dataKey="value"
                isAnimationActive={true}
                data={dataMap}
            
                outerRadius={100}
                innerRadius={40}
                fill="#8884d8"
                label
                
                >
                    {dataMap.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={colorArray[index % colorArray.length]} />
                    ) )}
                </Pie>

                <Tooltip />
            </PieChart>
            </ContenedorPie>
        
      

    );
}

const ContenedorPadre = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;

    @media (max-width: 700px) {
        display:flex;
        flex-direction:column;
        height: auto;
        overflow:visible;
    }
    padding: 20px 0;
    min-height: 400px;

   
    gap: 20px;
`
const ContenedorPadreTarjeta = styled.div`
    display: grid;
    grid-template-columns: 2fr 1fr;

    gap: 20px;

`

const ContenedorPadreTarjetas = styled.div`
    display: flex;
    flex-direction:column;
    justify-content: center;
    gap: 15px;

`
const ContenedorTarjeta = styled.div`
    width: 100%;
    height: 45px;
    color:white;
    font-weight:bold;
    display:flex;
    align-items:center;
    justify-content:${props => props.dinero ? 'right' : 'center'} ;
    position: relative; 
    padding: ${props => props.dinero ? '0 10px 0 20px' : ''} ; 
   text-align: right;
    
    //overflow:hidden;
    @keyframes load {
    from {
        width: 0%;
    }
    to {
        width: 100%;
    }
    }
    &::before{
        content: '';
        background-color: var(--colorPv5);

        border-top: ${props => props.dinero ? '20px solid transparent' : ''} ; /* Ajusta el tamaño del triángulo cambiando este valor */
        border-bottom: ${props => props.dinero ? '20px solid transparent' : ''} ; /* Ajusta el tamaño del triángulo cambiando este valor */
        border-left: ${props => props.dinero ? '20px solid white' : ''} ; 
        

        width: 0%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;

        z-index: -1;

        animation-name: load;
        animation-duration: 2s;
        animation-iteration-count: 1; 
        animation-fill-mode:forwards;


    }
    transition: font-size .3s;
    &:hover{
        font-size: 1.1em;
        transition: font-size .3s;
    }
`
const Tarjeta = ({nombre,tipo,id, saldo = 0}) =>{
   
    const getSaldo =  () => {
        
        if(saldo.length ){
            const largoArreglo = saldo.length;
            
            return('$' + saldo[largoArreglo-1].saldoalafecha);
            
    
        }else{
            
            return('$' + 0);
            
        }
    }
   
    const [switchModalModificarTarjeta, setSwitchModalModificarTarjeta] = useState(0);
    const [switchModalAgregarSaldo, setSwitchModalAgregarSaldo] = useState(0);
    const handleClickModalModificarTarjeta = ()=>{
        setSwitchModalModificarTarjeta(1);
    }
    const handleClickModalAgregarSaldo = ()=>{
        setSwitchModalAgregarSaldo(1);
    }
    return(
        <ContenedorPadreTarjeta>
            <ModalAgregarSaldo saldo={saldo} id={id} tipo={tipo} nombre={nombre} setSwitchModalAgregarSaldo={setSwitchModalAgregarSaldo} switchModalAgregarSaldo={switchModalAgregarSaldo}  />
            <ModalModificarTarjeta nombreTarjeta={nombre} id={id} tipo={tipo} nombre={nombre} setSwitchModalModificarTarjeta={setSwitchModalModificarTarjeta} switchModalModificarTarjeta={switchModalModificarTarjeta}   ></ModalModificarTarjeta>
            
            <ContenedorTarjeta onClick={() => handleClickModalModificarTarjeta()} >{nombre}</ContenedorTarjeta>
            <ContenedorTarjeta onClick={() => handleClickModalAgregarSaldo()} dinero>{getSaldo()}</ContenedorTarjeta>
        </ContenedorPadreTarjeta>
    )
}
export const TitularSTarjetas = styled.h3`
    color: var(--colorPv2);
    width: 100%;
    text-align:center;
`

export const Starjetas = ({ tarjetas, titulo }) => {
    return (
        tarjetas != '' ?
            <ContenedorPadre>
                <ContenedorPadreTarjetas>
                    {
                        tarjetas && tarjetas.length > 0 ?
                            tarjetas.map((tarjeta) => (
                                <Tarjeta id={tarjeta.id} nombre={tarjeta.nombre} tipo={tarjeta.credito} key={tarjeta.id} saldo={tarjeta.deudas} />
                            ))
                            : <TitularSTarjetas>Agrega tarjetas dando click al icono de tarjeta :D</TitularSTarjetas>
                    }
                </ContenedorPadreTarjetas>
                <PieGraph tarjetas={tarjetas} titulo={titulo} />
            </ContenedorPadre>
            : null
    );
}
