import { ContenedorPrincipal } from "../componentes/Displays";
import { SessionLogIn, SessionLogUp } from "../componentes/ComPSesion";
import { useEffect, useState } from "react";
import {useNavigate } from 'react-router-dom';
import { supabase } from "../supabase/client.js";

const Index = ({ Data }) => {
    const [user, setUser] = useState(supabase.auth.user());
    
    const [switchSeccion, setSwitchSeccion] = useState(0);
    
    const navigate = useNavigate();
    
    useEffect(() => {

    if(user){
      navigate('/Cartera');
    }
    }, [navigate]);

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
