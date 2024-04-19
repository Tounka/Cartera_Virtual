import { DisplayPrincipal } from "../componentes/Displays";
import { Starjetas } from "../componentes/STarjetas";
const Index = ({Data}) => {
    return(
        
        <DisplayPrincipal>
            <Starjetas Data = {Data} />
            
        </DisplayPrincipal>
        
    )
  
}

export default Index;