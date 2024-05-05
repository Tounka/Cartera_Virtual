import styled from "styled-components";
import { ContenedorPrincipal } from "./Displays";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useNavigate } from 'react-router-dom';
import {supabase} from "../supabase/client.js"
import { Children, useEffect, useState } from "react";
import { useDatos } from "../js/DatosContext.js";
import { RiLoginCircleLine } from "react-icons/ri";
import { IoPersonAdd } from "react-icons/io5";

export const ContenedorPSesion = styled(ContenedorPrincipal)`
position:relative;
    min-height: 500px;
    height:auto;
    padding: 20px 0;
    width: 90%;
    max-width: 700px;
    background-color: var(--colorPv1);
    border-radius: 20px 0 20px 0;
    @media (max-width: 700px) {
        height: auto;
        padding: 20px 0;
    }
`
export const FormStyled = styled(Form)`
    display:flex;
    justify-content: space-evenly;
    align-items:center;
    flex-direction: column;
    gap:20px;
    height: 100%;
    width:100%;
`
const ContenedorField = styled.div`
    min-height: 60px;
    height:80px;
    max-height:auto;
    width: 90%;
    background-color:white;
    border-radius: 20px;
    overflow:hidden;
    display:flex;
    align-items:center;
    text-align:Center;
    
    

    @media (max-width: 600px){
        flex-direction:column;
    }

    
`
const CField = styled(Field)`
    width: 100%;
    height:100%;
    outline:none;
    
    border-radius: 0 20px 20px 0;
    padding-left: 10px;
    border: none;
    @media (max-width: 600px){
        height: 40px;
    }
` 
const CFieldTexto = styled.label`
    background-color: var(--colorPv4);
    border: none;
    cursor:pointer;
    min-width: 180px;
    padding: 10px;
    height: 100%;
    display: flex;
    text-align:center;
    justify-content:center;
    align-items: center;
    color: white;
    font-size: 24px;
    font-weight: bold;
    @media (max-width: 600px){
        height: 40px;
        width:100%;
    }
`
export const BtnSubmit = styled.button`
    width: 160px;
    height: 60px;
    @media (max-width: 425px){
        width: 100px;
        height: 60px;
    }
    background-color: var(--colorPv5);
    
    border-radius: 20px;
    font-size: 24px;
    color: white;
    border:none;
    cursor:pointer;
`
export const TextoPrincipalSession = styled.p`
    color: white;
    font-size: 28px;
    font-weight: bold;
    margin-top: 40px;
    margin: 15px 0 25px 0;
`

const SwitchSeccion = styled.div`
    position:absolute;
    padding: 10px;
    display:flex;
    justify-content:center;
    align-items:center;
    color:white;
    right: 0;
    top: 0;
    min-width: 20%;
    height: 10%;
    border-radius: 0 0 0 20px;
    background-color: var(--colorPv5);
    cursor: pointer;

`
const SelectStyled = styled.select`
    width: 100%;
    height:100%;
    outline:none;
    min-height: 50px; 
    background-color: white;
    
    color:black;
    border: 1px black;
    display: grid;
    
`

const ContenedorMensajeLogIn = styled.div`

   min-height: 30px;
    width: 100%;
    
    


`
const TextoMensajeLogIn = styled.p`
    @keyframes iniciarMensaje {
        0% {
        transform: translateX(0); /* Sin traslación */
        color: var(--colorRojo); 
    }
    25% {
        transform: translateX(-5px); /* Traslación a la izquierda */
        color: var(--colorRojo); 
    }
    50% {
        transform: translateX(5px); /* Traslación a la derecha */
    }
    75% {
        transform: translateX(-3px); /* Traslación a la izquierda */
    }
    100% {
        transform: translateX(0); /* Sin traslación, vuelve al estado inicial */
        color: white; 
    }
}
    padding: 0 20px;
    text-align:Center;
    animation: iniciarMensaje 1s forwards;
`

export const FieldCampo = ({Texto,ID , Type='text', min, max, setFieldValue, tipoManejo}) => {
    const handleChange = (event) =>{
        
            
                const { name, value } = event.target;
                let newValue = value;
            
                if (tipoManejo === 'noZero') {
                    newValue = value.replace(/^0+/, '');
                } 
                else if(tipoManejo === 'toCapital') {
                    newValue = value.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());
                }
              
            
                setFieldValue(name, newValue);
            
      
         
        

    }
    return(
        <ContenedorField>
            <CFieldTexto htmlFor={ID}>{Texto}</CFieldTexto>
            {min !== undefined && max !== undefined ? (
                <CField onChange={handleChange} min={min} max={max} id={ID} type={Type} name={ID} placeholder={`Ingresa tu ${Texto}`}/>
            ) : (
                <CField onChange={handleChange} id={ID} type={Type} name={ID} placeholder={`Ingresa tu ${Texto}`}/>
            )}
            <ErrorMessage name={ID} component="div" />
        </ContenedorField>
    )
}
export const FieldSelect = ({ Texto, ID, children, onChange }) => {
    return (
        <ContenedorField>
            <CFieldTexto htmlFor={ID}>{Texto}</CFieldTexto>
            <SelectStyled id={ID} onChange={onChange}> // Agregamos el evento onChange para manejar los cambios
                {children}
            </SelectStyled>
        </ContenedorField>
    );
};

export const DateInput = ({ Texto, ID, dateDefault, type}) => {
    return (
      <div>
        <label htmlFor={ID}>{Texto}</label>
        <input 
          type={type} 
          value={dateDefault} 
          
        />
      </div>
    );
  };

  
export const SessionLogUp = ({setUser2,setSwitchSeccion}) =>{
    const navigate = useNavigate();
    

    const [mensajeRevisarCorreo, setMensajeRevisarCorreo] = useState('');
    const handleSubmit = async (values) => {
        try {
      
            const { data, error } = await supabase.auth.signUp(
                {
                email: values.Correo,
                password: values.Password,
                options: {
                    emailRedirectTo: 'https://targety.netlify.app' 
                }
                },{
                    data: {
                        Nombre: values.Nombre,
                        Apellido: values.Apellido,
                      }
                }
            )

            if(error){
                if(mensajeRevisarCorreo){
                    setMensajeRevisarCorreo('');
                    setTimeout(() => {
                        setMensajeRevisarCorreo('Tuvimos un problema, registra bien tu usuario');
                    }, 500);
                    
                }else{
                    
                    setMensajeRevisarCorreo('Tuvimos un problema, registra bien tu usuario');
                }
                
            }else{
                if(mensajeRevisarCorreo){
                    setMensajeRevisarCorreo('');
                    setTimeout(() => {
                        setMensajeRevisarCorreo('Enviamos un correo de confirmación a tu Email');
                    }, 500);
                    
                }else{
                    
                    setMensajeRevisarCorreo('Enviamos un correo de confirmación a tu Email');
                }
            }
   

        } catch (error) {
            console.error('Error al iniciar sesión:', error.message);
            
        }
    };
    const handleClickSwitchSeccion = ()=>{
        setSwitchSeccion(0);
        
    }
    return(
        
        <Formik
            initialValues={{
                Correo: '',
                Nombre: '',
                Apellido: '',
                Password: ''
                
            }}
            validate={(values) => {
                const errors = {};
                // Agrega reglas de validación aquí
                return errors;
            }}
            onSubmit= {(values, { setSubmitting }) => {
                handleSubmit(values);
               
               
           
            }}
        >
        {({ setFieldValue }) => (
            <ContenedorPSesion>
            <SwitchSeccion onClick={() => handleClickSwitchSeccion()}> <RiLoginCircleLine size={24} /> </SwitchSeccion>
            <TextoPrincipalSession > Registrarse </TextoPrincipalSession>
            <FormStyled>
                
                <FieldCampo Texto= 'Correo' ID='Correo' Type='email'setFieldValue={setFieldValue} />
                <FieldCampo Texto= 'Primer Nombre' ID='Nombre' Type='text' setFieldValue={setFieldValue}/>
                <FieldCampo Texto= 'Apellido' ID='Apellido' Type='text' setFieldValue={setFieldValue}/>
                <FieldCampo Texto= 'Contraseña' ID='Password' Type='password' setFieldValue={setFieldValue}/>

                <ContenedorMensajeLogIn> {mensajeRevisarCorreo ? <TextoMensajeLogIn>{mensajeRevisarCorreo}</TextoMensajeLogIn>  : ''}</ContenedorMensajeLogIn>
                
                <BtnSubmit > Enviar </BtnSubmit>
            
            </FormStyled>

            </ContenedorPSesion>
        )}
        </Formik>
        
    )
}

export const SessionLogIn = ({setSwitchSeccion }) =>{
    const navigate = useNavigate();
    const [credencialesIncorrectas, setCredencialesIncorrectas] = useState(false);
    const {userMeta,actualizadorDeUsuario} = useDatos();
    const handleClickSwitchSeccion = ()=>{
        setSwitchSeccion(1);
    }

    const handleSubmit = async (values) => {
        try {
      
            const { data, session, error } = await supabase.auth.signIn(
                {
                email: values.Correo,
                password: values.Password
            
                }
                
            )
            
            
            if(error){
                console.log(error);
                if(credencialesIncorrectas){
                    setCredencialesIncorrectas(false);
                    setTimeout(() => {
                        setCredencialesIncorrectas(true);
                    }, 500);
                }else{
                    setCredencialesIncorrectas(true);
                }
                
                
                
            }else{
                actualizadorDeUsuario();
                setTimeout(()=>{
                    actualizadorDeUsuario();
                }, 500)
                    
                
                    
                
                
            }
            

        } catch (error) {
            console.error('Error al iniciar sesión:', error.message);
            
        }

    };
    return(
        
        <Formik
            initialValues={{
                Correo: '',
                Password: ''
                
            }}
            validate={(values) => {
                const errors = {};
                // Agrega reglas de validación aquí
                return errors;
            }}
            onSubmit= {(values, { setSubmitting }) => {
                handleSubmit(values);
                
               
       
            }}
        >
            {({ setFieldValue }) => (
                <ContenedorPSesion>
                    <SwitchSeccion onClick={handleClickSwitchSeccion}> < IoPersonAdd size={24}/></SwitchSeccion>
                    <TextoPrincipalSession> Inicia sesión </TextoPrincipalSession>
                    <FormStyled>
                        <FieldCampo Texto="Correo" ID="Correo" Type="email" setFieldValue={setFieldValue} />
                        <FieldCampo Texto="Contraseña" ID="Password" Type="password" setFieldValue={setFieldValue} />
                        <ContenedorMensajeLogIn> {credencialesIncorrectas ? <TextoMensajeLogIn>Las credenciales son incorrectas. Por favor, inténtalo de nuevo.</TextoMensajeLogIn>  : ''}</ContenedorMensajeLogIn>
                        <BtnSubmit> Enviar </BtnSubmit>
                    </FormStyled>
                </ContenedorPSesion>
            )}
        </Formik>
        
    )
}

