import styled from "styled-components";
import { PieChart, Pie, Tooltip, ResponsiveContainer, Cell } from "recharts";
const PieGraph = () => {
    const data01 = [
        { name: "Group A", value: 400 },
        { name: "Group B", value: 300 },
        { name: "Group C", value: 300 },
        { name: "Group D", value: 200 },
        { name: "Group E", value: 278 },
        { name: "Group E", value: 278 },
        { name: "Group E", value: 278 },
        { name: "Group F", value: 189 }
      ];

    const colorArray = ['#ff7675', '#fd79a8', '#a29bfe', '#00b894', '#fdcb6e'];;
    return(
        <ResponsiveContainer style={{margins: '20px',}} >
            <PieChart  >
                <Pie 
                dataKey="value"
                isAnimationActive={true}
                data={data01}
              
                outerRadius={80}
                innerRadius={40}
                fill="#8884d8"
                label
                
                >
                    {data01.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={colorArray[index % colorArray.length]} />
                    ) )}
                </Pie>
          
                <Tooltip />
            </PieChart>
        </ResponsiveContainer>

    );
}

const ContenedorPadre = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
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
    height: 40px;
    color:white;
    font-weight:bold;
    display:flex;
    align-items:center;
    justify-content:${props => props.dinero ? 'right' : 'center'} ;
    position: relative; 
    padding: ${props => props.dinero ? '0 10px 0 20px' : ''} ; 
   
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
const Tarjeta = () =>{
    return(
        <ContenedorPadreTarjeta>
            <ContenedorTarjeta>nombre tarjeta</ContenedorTarjeta>
            <ContenedorTarjeta dinero>$665</ContenedorTarjeta>
        </ContenedorPadreTarjeta>
    )
}

export const Starjetas = () =>{
    return(
        <ContenedorPadre>
            <ContenedorPadreTarjetas>
                <Tarjeta></Tarjeta>
                <Tarjeta></Tarjeta>
                <Tarjeta></Tarjeta>
                <Tarjeta></Tarjeta>
            </ContenedorPadreTarjetas>
            <PieGraph />
     
           
        </ContenedorPadre>

    )
}