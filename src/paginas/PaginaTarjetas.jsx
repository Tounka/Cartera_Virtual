import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDatos } from '../js/DatosContext';
import { Tarjeta } from '../componentes/CompPaginaTarjeta';
import { DisplayPrincipalV2 } from '../componentes/Displays';

const GridTarjetas = styled.div`
    display: grid;
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
`;

const ContenedorTarjeta = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
`;

const Separador = styled.p`
    user-select: none;
    font-size: 34px;
    color: var(--colorPv1);
    font-weight: bold;
    margin: 10px 0;
`
const ContenedorPaginaTarjetas = styled.div`
    display:flex;
    flex-direction: column;
    gap: 20px;
    align-items:center;
`
export const PaginaTarjetas = () => {
    const [cardData, setCardData] = useState(null); // Estado local para almacenar los datos de las tarjetas
    const datos = useDatos(); // Llamada directa a useDatos dentro del componente
    const {setAnimacionEncendidaTarjetas} = useDatos(); 

    useEffect(()=>{
        setTimeout(() => {
            
            setAnimacionEncendidaTarjetas(false);
            console.log('false')
        }, 2500);
    }, [])
    useEffect(() => {
        const fetchData = async () => {
            try {
                const datosObtenidos = await datos; // Asumiendo que useDatos devuelve una promesa
                setCardData(datosObtenidos);
            } catch (error) {
                console.error('Error al obtener datos:', error);
                // Manejo de errores: podrías establecer un estado de error o mostrar un mensaje al usuario
            }
        };

        fetchData();
    }, [datos]);

    // Filtrar tarjetas de crédito y débito una vez que los datos estén disponibles
    const renderTarjetas = () => {
        if (!cardData || !cardData.cardMeta) {
            return null; // Manejar el caso donde no hay datos disponibles o cardMeta no está definido
        }

        const TarjetasCredito = cardData.cardMeta.filter((card) => card.credito);
        const TarjetasDebito = cardData.cardMeta.filter((card) => !card.credito);

        return (
            <ContenedorPaginaTarjetas>
            <Separador>Créditos</Separador>
            <GridTarjetas>
                {TarjetasCredito.map((card, index) => (
                    <ContenedorTarjeta key={index}>
                        <Tarjeta
                            nombreTarjeta={card.nombre}
                            saldoTarjeta={card.deudas[card.deudas.length - 1].saldoalafecha}
                            limiteCredito={card.limiteCredito}
                            msi={card.msi}
                            credito={card.credito}
                            fechaDeCorte={card.deudas[card.deudas.length - 1].fechadecorte}
                        />
                    </ContenedorTarjeta>
                ))}


            </GridTarjetas>

            <Separador>Débitos</Separador>

            <GridTarjetas>
                {TarjetasDebito.map((card, index) => (
                    <ContenedorTarjeta key={index}>
                        <Tarjeta
                            nombreTarjeta={card.nombre}
                            saldoTarjeta={card.deudas[card.deudas.length - 1].saldoalafecha}
                            limiteCredito={card.limiteCredito}
                            msi={card.msi}
                            credito={card.credito}
                            fechaDeCorte={card.deudas[card.deudas.length - 1].fechadecorte}
                        />
                    </ContenedorTarjeta>
                ))}


            </GridTarjetas>
            </ContenedorPaginaTarjetas>

        );
    };

    return (
        <DisplayPrincipalV2>
            {renderTarjetas()}
        </DisplayPrincipalV2>
    );
};

