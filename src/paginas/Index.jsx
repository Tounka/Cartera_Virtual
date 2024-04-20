import { DisplayPrincipal } from "../componentes/Displays";
import { Starjetas } from "../componentes/STarjetas";
import { SCardTarjetas } from "../componentes/SCardsTarjetas";
const Index = ({Data}) => {
    return(
        
        <DisplayPrincipal>
            <SCardTarjetas />
            <Starjetas Data = {Data} />
            
        </DisplayPrincipal>
        
    )
  
}

export default Index;