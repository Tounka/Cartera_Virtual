import styled from "styled-components";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { useDatos } from "../js/DatosContext";

const TarjetaStyled = styled.div`
    height: 250px;
    width: 400px;
    padding: 10px 20px;
    border-radius: 30px;
    display: flex;
    background-color: ${props => props.bgColor ? props.bgColor : 'var(--colorPv2)' };
    flex-direction: column;
    position: relative;


    @media (max-width: 900px) {
        height: 200px;
        width: 300px;
    }
`;
const ContenedorSeccionTarjeta = styled.div`
    width: 100%;
    height: 100%;
`;
const TextoTarjeta = styled.p`
    font-size: ${props => props.size ? props.size : '14px' };
    font-weight: ${props => props.bold ? 'bold' : 'null' };
    color: ${props => props.color ? props.color : 'white' }; 
    margin: 0;
`;
const ContenedorHorizontal = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;
const ContenedorIntermedioTextoGrafica = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
 
    width: 100%;
    height: 100%;
`;
const ContenedorPie = styled.div`
    height: 120px;
    width:100%;

    @media (max-width: 900px) {
        height: 80px;
        
    }
`
const ContenedorTxt = styled.div`
    height: 100%;
    width: 100%;
    display:flex;
    flex-direction:column;
    justify-content: center;
`

const COLORS = ['#FF6384', '#36A2EB'];

export const Tarjeta = ({ nombreTarjeta, saldoTarjeta, limiteCredito, msi, credito, fechaDeCorte = '22' }) => {
    const {animacionEncendidaTarjetas} = useDatos();
    let nuevoSaldo = saldoTarjeta;
    if(nuevoSaldo <= 0){
        nuevoSaldo = nuevoSaldo * -1;
    }
    
   
    const data = [
        { name: 'Usado', value: nuevoSaldo },
        { name: 'Disponible', value: limiteCredito - nuevoSaldo },
    ];

    const porcentajeUso = ((nuevoSaldo / limiteCredito) * 100).toFixed(2);

    return (
        <TarjetaStyled>
            <TextoTarjeta size='38px' bold>{nombreTarjeta}</TextoTarjeta>

            <ContenedorIntermedioTextoGrafica>
                <ContenedorTxt>
                    <TextoTarjeta size='16px'>{Math.round(nuevoSaldo)} / {limiteCredito}</TextoTarjeta>
                    <TextoTarjeta size='16px'>Fecha de corte: {fechaDeCorte}</TextoTarjeta>
                </ContenedorTxt>
                <ContenedorPie>
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={data}
                                innerRadius={30}
                                outerRadius={40}
                                fill="#8884d8"
                                paddingAngle={5}
                                dataKey="value"
                                isAnimationActive={animacionEncendidaTarjetas}
                                labelLine={false}
                                label={({ cx, cy }) => (
                                    <text
                                        x={cx}
                                        y={cy}
                                        fill="white"
                                        textAnchor="middle"
                                        dominantBaseline="central"
                                    >
                                        {`${porcentajeUso}%`}
                                    </text>
                                )}
                            >
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </ContenedorPie>
            </ContenedorIntermedioTextoGrafica>

            <ContenedorHorizontal>
                <TextoTarjeta size='16px'>{credito ? 'Credito' : 'Debito'}</TextoTarjeta>
                {credito ? <TextoTarjeta size='34px' bold>{msi ? 'MSI' : 'Revolvente'}</TextoTarjeta> : <TextoTarjeta size='24px' bold> {`META Al ${Math.round(porcentajeUso)}%` }</TextoTarjeta> }
                
            </ContenedorHorizontal>
        </TarjetaStyled>
    );
};
