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

    useEffect(() => {
        const fetchUserData = async () => {
            const user = supabase.auth.user();
            setUserMeta(user.user_metadata);
        };

        fetchUserData();
    }, []);

    // Suponiendo que estos datos se obtienen dinámicamente o se actualizan
    const Tarjetas = [
        [1, 'Nu'],
        [2, 'Nu MSI']
    ];
    const Deudas = [
        { idTarjeta: 1, deuda: [456], fecha: ['2024-04-09 15:30:00'] },
        { idTarjeta: 2, deuda: [2342], fecha: ['2024-04-09 17:30:00'] },
        { idTarjeta: 3, deuda: [3453], fecha: ['2024-04-09 16:30:00'] },
        { idTarjeta: 4, deuda: [341], fecha: ['2024-04-09 12:30:00'] }
    ];

    return (
        <DatosContext.Provider value={{ userMeta, Tarjetas, Deudas }}>
            {children}
        </DatosContext.Provider>
    );
}
