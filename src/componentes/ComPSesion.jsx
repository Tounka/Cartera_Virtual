import styled from "styled-components";
import { ContenedorPrincipal } from "./Displays";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useNavigate } from 'react-router-dom';
import {supabase} from "../supabase/client.js"
import { Children } from "react";

export const ContenedorPSesion = styled(ContenedorPrincipal)`
position:relative;
    height: 500px;
    width: 90%;
    max-width: 700px;
    background-color: var(--colorPv1);
    border-radius: 20px 0 20px 0;
    @media (max-width: 700px) {
        
    }
`
export const FormStyled = styled(Form)`
    display:flex;
    justify-content: space-evenly;
    align-items:center;
    flex-direction: column;
    height: 100%;
    width:100%;
`
const ContenedorField = styled.div`
    min-height: 60px;
    
    width: 90%;
    background-color:white;
    border-radius: 20px;
    overflow:hidden;
    display:flex;
    align-items:center;
    text-align:Center;
    
    border: solid 1px black;

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
    background-color: var(--colorGris);
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
`

const SwitchSeccion = styled.div`
    position:absolute;
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
    const handleSubmit = async (values) => {
        try {
      
            const { data, error } = await supabase.auth.signUp(
                {
                email: values.Correo,
                password: values.Password,
                options: {
                    emailRedirectTo: 'http://localhost:3000' 
                }
                },{
                    data: {
                        Nombre: values.Nombre,
                        Apellido: values.Apellido,
                      }
                }
            )
            
            console.log('Inicio de sesión exitoso');

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
               
               
                //if(values.Password == 1234){
                //    console.log('contrasena correcta');
                //    navigate('/Cartera');
                //    console.log('contrasena 3');
                //}
                
                //setSubmitting(false);
            }}
        >
            <ContenedorPSesion>
            <SwitchSeccion onClick={() => handleClickSwitchSeccion()}>Ya tengo cuenta</SwitchSeccion>
            <TextoPrincipalSession > Registrarse </TextoPrincipalSession>
            <FormStyled>
                
                <FieldCampo Texto= 'Correo' ID='Correo' Type='email' />
                <FieldCampo Texto= 'Primer Nombre' ID='Nombre' Type='text' />
                <FieldCampo Texto= 'Apellido' ID='Apellido' Type='text' />
                <FieldCampo Texto= 'Contraseña' ID='Password' Type='password' />
                <BtnSubmit > Enviar </BtnSubmit>
            
            </FormStyled>

            </ContenedorPSesion>
        </Formik>
        
    )
}

export const SessionLogIn = ({setSwitchSeccion }) =>{
    const navigate = useNavigate();
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
            }else{
                navigate('/Cartera');
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
                    <SwitchSeccion onClick={handleClickSwitchSeccion}>Crear cuenta</SwitchSeccion>
                    <TextoPrincipalSession> Inicia sesión </TextoPrincipalSession>
                    <FormStyled>
                        <FieldCampo Texto="Correo" ID="Correo" Type="email" setFieldValue={setFieldValue} />
                        <FieldCampo Texto="Contraseña" ID="Password" Type="password" setFieldValue={setFieldValue} />
                        <BtnSubmit> Enviar </BtnSubmit>
                    </FormStyled>
                </ContenedorPSesion>
            )}
        </Formik>
        
    )
}

