import styled from "styled-components";
import { PieChart, Pie, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { ModalAgregarSaldo, ModalModificarTarjeta } from "./CompModalCrud";
import { useState, useEffect } from "react";
import { useDatos } from "../js/DatosContext";

const ContenedorPie = styled(ResponsiveContainer)`
    min-height: 300px;
    height:auto;
    max-height: 300px;
    *{
        overflow:visible;
    }
`


const PieGraph = ({ tarjetas, titulo }) => {
    
    const [tamanoGrafica, setTamanoGrafica] = useState([80, 40]);

    useEffect(() => {
        const handleResize = () => {
            const nuevoTamanoGrafica = window.innerWidth < 400 ? [70, 0] : [80, 40];
            setTamanoGrafica(nuevoTamanoGrafica);
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const dataMap = tarjetas?.map((dato) => {
        let xValue = 0;
        if (dato.deudas.length > 0) {
            const ultimoSaldo = dato.deudas[dato.deudas.length - 1].saldoalafecha;
            xValue = ultimoSaldo <= 0 ? Math.abs(ultimoSaldo) : ultimoSaldo;
        }
        return { name: dato.nombre, value: xValue };
    }) || [];

    const colorArray = ['#ff7675', '#fd79a8', '#a29bfe', '#00b894', '#fdcb6e'];

    return (
        <ContenedorPie>
            <PieChart>
                <Pie
                    dataKey="value"
                    isAnimationActive={true}
                    data={dataMap}
                    outerRadius={tamanoGrafica[0]}
                    innerRadius={tamanoGrafica[1]}
                    fill="#8884d8"
                    label
                >
                    {dataMap.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={colorArray[index % colorArray.length]} />
                    ))}
                </Pie>
                <Tooltip />
            </PieChart>
        </ContenedorPie>
    );
};

const ContenedorPadre = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items:center;
    @media (max-width: 700px) {
        display:flex;
        width:100%;
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
    grid-template-columns: 3fr 2fr;
    @media (max-width: 500px) {
        grid-template-columns: 1fr 1fr; 
    }

    gap: 20px;

`

const ContenedorPadreTarjetas = styled.div`
    display: flex;
    flex-direction:column;
    justify-content: center;
    gap: 15px;
    width:100%;

`
const ContenedorDerechoPieGr = styled.div`
    display:flex;
    flex-direction:column;
    height:100%;
    width:100%;
`
const ContenedorTarjeta = styled.div`
    width: 100%;
    height: 45px;
    color:white;
    
    font-weight:bold;
    display:flex;
    align-items:center;
    cursor:pointer;
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
        animation-name: ${props => props.animacionEncendida ?  'load': ''};
        width: ${props => props.animacionEncendida ?  '': '100%'};
       
        
        animation-duration: 2s;
        animation-iteration-count: 1; 
        animation-fill-mode:forwards;


    }
    transition: font-size .3s;
    &:hover{
        font-size: 1.1em;
        transition: font-size .3s;
    }
    @media (max-width:600px){
        font-size:16px;
    }
`
const Tarjeta = ({nombre,tipo,id, msi, saldo = 0}) =>{
   const {animacionEncendida} = useDatos();
    const getSaldo =  () => {
        
        if(saldo.length ){
            const largoArreglo = saldo.length;
            if(largoArreglo >= 1){
                return('$' + saldo[largoArreglo-1].saldoalafecha);
            }else{
                return('$' + 0); 
            }
            
            
    
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
            <ModalModificarTarjeta nombreTarjeta={nombre} id={id} msi={msi} tipo={tipo} nombre={nombre} setSwitchModalModificarTarjeta={setSwitchModalModificarTarjeta} switchModalModificarTarjeta={switchModalModificarTarjeta}   ></ModalModificarTarjeta>
            
            <ContenedorTarjeta animacionEncendida={animacionEncendida} onClick={() => handleClickModalModificarTarjeta()} >{nombre}</ContenedorTarjeta>
            <ContenedorTarjeta animacionEncendida={animacionEncendida} onClick={() => handleClickModalAgregarSaldo()} dinero>{getSaldo()}</ContenedorTarjeta>
        </ContenedorPadreTarjeta>
    )
}
export const TitularSTarjetasConMargin = styled.h3`
    color: var(--colorPv2);
    width: 100%;
    text-align:center;
    @media(min-width: 701px){
        display:none;
    }
`
export const TitularSTarjetas = styled.h3`
    color: var(--colorPv2);
    width: 100%;
    text-align:center;
    @media(max-width: 700px){
        display:none;
    }
`

export const Starjetas = ({ tarjetas, titulo }) => {
    const [tarjetasOrdenadas, setTarjetasOrdenadas] = useState([]);

    useEffect(() => {
        if (tarjetas && tarjetas.length > 0) {
            
            const tarjetasOrdenadasCopia = [...tarjetas].sort((a, b) => {
                const saldoA = a.deudas?.[a.deudas.length - 1]?.saldoalafecha || 0;
                const saldoB = b.deudas?.[b.deudas.length - 1]?.saldoalafecha || 0;
                if(titulo == "Activos"){
                    return saldoB - saldoA;
                    
                }else{
                    
                    return saldoA - saldoB;
                }
            });
            setTarjetasOrdenadas(tarjetasOrdenadasCopia);
        }
    }, [tarjetas]); 

    return (
        tarjetasOrdenadas.length > 0 ? (
            <ContenedorPadre>
                <TitularSTarjetasConMargin>{titulo}</TitularSTarjetasConMargin>
                <ContenedorPadreTarjetas>
                    {tarjetasOrdenadas.map((tarjeta) => (
                        <Tarjeta 
                            key={tarjeta.id} 
                            id={tarjeta.id} 
                            msi={tarjeta.msi} 
                            nombre={tarjeta.nombre} 
                            tipo={tarjeta.credito} 
                            saldo={tarjeta.deudas} 
                            limiteCredito={tarjeta.limiteCredito} 
                        />
                    ))}
                </ContenedorPadreTarjetas>

                <ContenedorDerechoPieGr>
                    <TitularSTarjetas>{titulo}</TitularSTarjetas>
                    <PieGraph tarjetas={tarjetas} titulo={titulo} />
                </ContenedorDerechoPieGr>
            </ContenedorPadre>
        ) : (
            <TitularSTarjetas>
                Agrega tarjetas dando click al icono de tarjeta :D
            </TitularSTarjetas>
        )
    );
};