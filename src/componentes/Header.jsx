import { ContenedorHeader } from "./Displays"

export const Header = ({usuario}) =>{
    return(
        <ContenedorHeader>
            Hola {usuario}
        </ContenedorHeader>
    )
}