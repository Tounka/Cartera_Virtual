import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../supabase/client";

const DatosContext = createContext();

export const useDatos = () => {
    const context = useContext(DatosContext);
    if (!context) {
        throw new Error("useDatos debe ser utilizado dentro de un DatosContextProvider");
    }
    return context;
}

export const DatosContextProvider = ({ children }) => {
    const [userMeta, setUserMeta] = useState(null);
    const [cardMeta, setCardMeta] = useState(null);
    const [actDatos, setActDatos] = useState(0);
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const user = supabase.auth.user();
                if (user) {
                    setUserMeta(user.user_metadata);
                    
                }
            } catch (error) {
                console.error("Error al obtener datos de usuario:", error);
            }
            
        };

        fetchUserData();
    }, []);

    const getTarjetas = async () => {
        try {
            const user = supabase.auth.user();
            if (user) {
                const { data: tarjetas, error: tarjetasError } = await supabase
                    .from('tarjetas')
                    .select()
                    .eq('userId', user.id)
                    .order('id', { ascending: true });
    
                if (tarjetasError) {
                    throw tarjetasError;
                }
    
                if (tarjetas && tarjetas.length > 0) {
                    // Obtener las deudas para cada tarjeta
                    const deudasPromises = tarjetas.map(async (tarjeta) => {
                        const { data: deudas, error: deudasError } = await supabase
                            .from('deudas')
                            .select()
                            .eq('id_tarjeta', tarjeta.id)
                            .order('fecha', { ascending: true });
                        if (deudasError) {
                            throw deudasError;
                        }
                        return { ...tarjeta, deudas };
                    });
    
                    const tarjetasConDeudas = await Promise.all(deudasPromises);
    
                    
                    return tarjetasConDeudas;
                }
            }
        } catch (error) {
            console.error("Error al obtener tarjetas:", error);
            return null;
        }
    };
    
    useEffect(() => {
        
        getTarjetas().then(data => {
            setCardMeta(data);
        });
        
      
    }, [actDatos]);
    
    const actualizadorDeDatos = () =>{
        setActDatos(actDatos+1);
    }


    // Suponiendo que estos datos se obtienen dinámicamente o se actualizan
    const [Deudas, setDeudas] = useState([
        { idTarjeta: 1, deuda: [456], fecha: ['2024-04-09 15:30:00'] },
        { idTarjeta: 2, deuda: [2342], fecha: ['2024-04-09 17:30:00'] },
        { idTarjeta: 3, deuda: [3453], fecha: ['2024-04-09 16:30:00'] },
        { idTarjeta: 4, deuda: [341], fecha: ['2024-04-09 12:30:00'] }
    ]);

    return (
        <DatosContext.Provider value={{ userMeta, cardMeta, Deudas, actualizadorDeDatos}}>
            {children}
        </DatosContext.Provider>
    );
}
