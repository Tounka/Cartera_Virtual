import { ContenedorPrincipal } from "../componentes/Displays";
import { SessionLogIn, SessionLogUp } from "../componentes/ComPSesion";
import {  useState } from "react";


const Index = ({ Data }) => {

    const [switchSeccion, setSwitchSeccion] = useState(0);
    

    


    return (
        <ContenedorPrincipal>
            
            {switchSeccion === 0 ? 
                <SessionLogIn  setSwitchSeccion={setSwitchSeccion} />
                :
                <SessionLogUp  setSwitchSeccion={setSwitchSeccion} />
            }
        </ContenedorPrincipal>
    );
};

export default Index;
