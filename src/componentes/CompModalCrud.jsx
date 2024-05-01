import styled from "styled-components";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { TextoPrincipalSession, FormStyled, FieldCampo, BtnSubmit, ContenedorPSesion, FieldSelect, DateInput } from "./ComPSesion";
import { supabase } from "../supabase/client";
import { useDatos } from "../js/DatosContext";
import { useState } from "react";

const ModalStyled = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
    background-color: #0000008e;
    width: 100%;
    height: 100%;
    overflow: hidden;
    display: ${props => (props.switchModal === 0 ? 'none' : 'flex')};
    justify-content: center;
    align-items: center;
`;

const BtnCerrarModal = styled(BtnSubmit)`
    background-color: var(--colorRojo);
    @media (max-width: 425px) {
        width: 100px;
        height: 60px;
    }
`;

const ContedorBtns = styled.div`
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
    justify-content: center;
`;

const OptionStyled = styled.option`
    width: 100%;
    height: 100%;
`;

const Modal = ({ children, switchModal}) => {
    return <ModalStyled switchModal={switchModal}>{children}</ModalStyled>;
};

export const ModalAgregarTarjeta = ({ switchModalAgregarTarjeta, setSwitchModalAgregarTarjeta, userId }) => {
    const {actualizadorDeDatos} = useDatos();
    const handleClickCerrarModal = () => {
        setSwitchModalAgregarTarjeta(0);
    };

const handleSubmit = async (values) => {
    
    try {
        const result = await supabase.from('tarjetas').insert({
            nombre: values.nombreCard,
            userId: values.id,
            credito: values.creditoCard
        });
        actualizadorDeDatos();
        setSwitchModalAgregarTarjeta(0);
    } catch (error) {
        console.error(error);
    }
};


    return (
        <Formik
            initialValues={{
                id: userId,
                nombreCard: '',
                creditoCard: true, // Agregamos este campo para manejar el valor seleccionado del tipo de tarjeta
            }}
            validate={values => {
                const errors = {};
                if (!values.nombreCard) {
                    errors.nombreCard = 'El nombre de la tarjeta es obligatorio';
                }
                return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
                handleSubmit(values);
                
            }}
        >
            {({ values, setFieldValue }) => ( // Usamos el render prop para obtener accesso a setFieldValue
                <Modal switchModal={switchModalAgregarTarjeta}>
                    <ContenedorPSesion>
                        <TextoPrincipalSession> Agregar Tarjeta </TextoPrincipalSession>
                        <FormStyled>
                            <FieldCampo  setFieldValue={setFieldValue}   Texto='Nombre de la tarjeta' ID='nombreCard' Type='text' />
                            <FieldSelect Texto='Tipo de tarjeta' ID='creditoCard' onChange={(e) => setFieldValue('creditoCard', e.target.value)}>
                                <OptionStyled value={true}>Crédito</OptionStyled>
                                <OptionStyled value={false}>Débito</OptionStyled>
                            </FieldSelect>
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

export const ModalModificarTarjeta = ({ switchModalModificarTarjeta, setSwitchModalModificarTarjeta, nombre, tipo, id }) => {
    const {actualizadorDeDatos, userMeta} = useDatos();
    const [textoBtnBorrar, setTextoBtnBorrar] = useState('Borrar');
    const handleClickCerrarModal = () => {
        setTextoBtnBorrar('Borrar');
        setSwitchModalModificarTarjeta(0);
    };

const handleSubmit = async (values) => {
    
    try {
        const { data, error } = await supabase
        .from('tarjetas')
        .update({
            nombre: values.nombreCard,
            credito: values.creditoCard
            })
        .match({ id: values.id })
        actualizadorDeDatos();
        setSwitchModalModificarTarjeta(0);
    } catch (error) {
        console.error(error);
    }
};

const handleBorrar = async () => {
    try {
        // 1. Eliminar las deudas asociadas a la tarjeta
        const { data: deudasData, error: deudasError } = await supabase
            .from('deudas')
            .delete()
            .eq('id_tarjeta', id); // Eliminar todas las deudas asociadas a la tarjeta

        if (deudasError) {
            throw deudasError;
        }

        // 2. Eliminar la tarjeta
        const { data, error } = await supabase
            .from('tarjetas')
            .delete()
            .eq('userId', userMeta.sub) // Especifica la igualdad para el usuario
            .eq('id', id); // Especifica la igualdad para el ID de la tarjeta

        if (error) {
            throw error;
        }
        actualizadorDeDatos();
        setSwitchModalModificarTarjeta(0);
        
    } catch (error) {
        console.error(error);
    }
};



    return (
        <Formik
        
            initialValues={{
                id: id,
                nombreCard: nombre,
                creditoCard: tipo, // Agregamos este campo para manejar el valor seleccionado del tipo de tarjeta
            }}
            validate={values => {
                const errors = {};
                if (!values.nombreCard) {
                    errors.nombreCard = 'El nombre de la tarjeta es obligatorio';
                }
                return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
                
                handleSubmit(values);
            }}
        >
            {({ values, setFieldValue }) => ( // Usamos el render prop para obtener accesso a setFieldValue
                <Modal switchModal={switchModalModificarTarjeta}>
                    <ContenedorPSesion>
                        <TextoPrincipalSession> Modifica tu tarjeta </TextoPrincipalSession>
                        <FormStyled>
                            <FieldCampo tipoManejo={'toCapital'} setFieldValue={setFieldValue} Texto='Nombre de la tarjeta' ID='nombreCard' Type='text' />

                            <FieldSelect Texto='Tipo de tarjeta' ID='creditoCard' onChange={(e) => setFieldValue('creditoCard', e.target.value)}>
                            {tipo ? (
                                <>
                                    <OptionStyled value={true}>Crédito</OptionStyled>
                                    <OptionStyled value={false}>Débito</OptionStyled>
                                </>
                            ) : (
                                <>
                                    <OptionStyled value={false}>Débito</OptionStyled>
                                    <OptionStyled value={true}>Crédito</OptionStyled>
                                </>
                            )}
                            </FieldSelect>
                            <ContedorBtns>
                                <BtnCerrarModal type="button" onClick={handleBorrar}>{textoBtnBorrar}</BtnCerrarModal>
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

export const ModalAgregarSaldo = ({ switchModalAgregarSaldo, setSwitchModalAgregarSaldo, id,nombre }) => {
    const {actualizadorDeDatos} = useDatos();
    
    const handleClickCerrarModal = () => {
        setSwitchModalAgregarSaldo(0);
    };


const handleSubmit = async (values) => {
    
    try {
        const result = await supabase.from('deudas').insert({
            id_tarjeta: values.id,
            fecha: values.fecha,
            fechadecorte: values.fechadecorte,
            saldoalafecha: values.saldoalafecha
           

        });
       
        actualizadorDeDatos();
        setSwitchModalAgregarSaldo(0);
    } catch (error) {
        console.error(error);
    }
};


    return (
        <Formik
            initialValues={{
                id: id,
                fecha: new Date,
                fechadecorte: 22,
                saldoalafecha: 0
            }}
            validate={values => {
                const errors = {};
                if (!values.saldoalafecha) {
                    errors.saldoalafecha = 'Agrega un nuevo saldo';
                }
                return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
                
                handleSubmit(values);
                
                
            }}
        >
            {({ values, setFieldValue }) => ( // Usamos el render prop para obtener accesso a setFieldValue
                <Modal switchModal={switchModalAgregarSaldo}>
                    <ContenedorPSesion>
                        <TextoPrincipalSession> {nombre} </TextoPrincipalSession>
                        <FormStyled>
                            <FieldCampo tipoManejo={'noZero'} setFieldValue={setFieldValue} Texto='Saldo' ID='saldoalafecha' Type='number' />
                            <FieldCampo tipoManejo={'noZero'} setFieldValue={setFieldValue} min={1} max={32} Texto='Fecha de corte' ID='fechadecorte' Type='number' />
                            
                       
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

