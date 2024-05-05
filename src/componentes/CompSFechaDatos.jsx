import React, { useState } from "react";
import styled from "styled-components";
import { Modal } from "./CompModalCrud";
import { ContedorBtns, BtnCerrarModal } from './CompModalCrud'
import { TextoPrincipalSession, ContenedorPSesion, BtnSubmit, FormStyled } from "./ComPSesion";
import { useDatos } from "../js/DatosContext";
import { Formik } from 'formik';
import { ContenedorPrincipal } from "./Displays";
const BtnContenedor = styled.button`
    background-color: var(--colorPv3);
    height: 60px;
    min-width: 180px;
    font-size: 24px;
    padding: 10px 20px;
    border-radius: 10px;
    margin-bottom: 50px;
    border:none;
    color: white;
    cursor: pointer;
`;
const TextoInputDate= styled(TextoPrincipalSession)`
    margin: 10px 20px;
    text-align:center;
    
`
const ContenedorInputDate = styled.div`
    margin: 30px 0;
    input{
        font-size: 24px;
        padding: 20px;
    }
`

const DateInput = ({ fechaSeleccionada ,setFechaSeleccionada, id  }) => {
    
    const handleDateChange = (event) => {  
        setFechaSeleccionada(event.target.value);
    };
  
    return (
      <ContenedorInputDate>
        <input
            id={id}
          type="date"
          value={fechaSeleccionada}
          onChange={handleDateChange}
        />
      </ContenedorInputDate>
    );
  };
  
const ModalBtnFecha = ({ switchModalBtnFecha, setswitchModalBtnFecha }) => {
    const {setFechaLimitante, actualizadorDeDatos, fechaLimitante} = useDatos();
    
   console.log(fechaLimitante)
    const handleClickCerrarModal = () => {
        setswitchModalBtnFecha(0);
    };
    const handleSubmit = (values)=>{
        
        setFechaLimitante(values.fechaSeleccionada);
        actualizadorDeDatos();
        setswitchModalBtnFecha(0);
    }
    
    return (
        <Formik
        
            initialValues={{
                fechaSeleccionada: fechaLimitante
            }}
            validate={values => {
                const errors = {};
                if (!values.fechaSeleccionada) {
                    errors.fechaSeleccionada = 'La fecha es obligatoria';
                }
                return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
                handleSubmit(values);
            }}
            >
            {({ values, setFieldValue }) => (
                <Modal switchModal={switchModalBtnFecha}>
                    <ContenedorPSesion>
                        <TextoInputDate>Selecciona la fecha a la que quieres viajar</TextoInputDate>
                        <FormStyled>
                            <ContenedorInputDate>
                                <input
                                    id='fechaSeleccionada'
                                    type="date"
                                    value={values.fechaSeleccionada}
                                    onChange={(event) => setFieldValue('fechaSeleccionada', event.target.value)}
                                />
                            </ContenedorInputDate>
                            <ContedorBtns>
                                <BtnSubmit type="submit">Enviar</BtnSubmit>
                                <BtnCerrarModal type="button" onClick={handleClickCerrarModal}>Cerrar</BtnCerrarModal>
                            </ContedorBtns>
                        </FormStyled>
                    </ContenedorPSesion>
                </Modal>
            )}
            </Formik>


    );
};



export const SeccionBtnFecha = () => {
    const [switchModalBtnFecha, setswitchModalBtnFecha] = useState(0);

    const handleClickAbrirModal = () => {
        setswitchModalBtnFecha(1);
    };

    return (
        <ContenedorPrincipal>
            {switchModalBtnFecha === 1 && <ModalBtnFecha switchModalBtnFecha={switchModalBtnFecha} setswitchModalBtnFecha={setswitchModalBtnFecha} />}
            <BtnContenedor onClick={handleClickAbrirModal}>Filtra por fecha</BtnContenedor>
        </ContenedorPrincipal>
    );
};
