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

export const BtnCerrarModal = styled(BtnSubmit)`
    background-color: var(--colorRojo);
    @media (max-width: 425px) {
        width: 100px;
        height: 60px;
    }
`;

export const ContedorBtns = styled.div`
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
    justify-content: center;
`;

const OptionStyled = styled.option`
    width: 100%;
    height: 100%;
`;

export const Modal = ({ children, switchModal}) => {
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
            userId: userId,
            credito: values.creditoCard,
            msi: values.msi
        });
        const tarjetaId = result.data[0].id;

        const deudaResult = await supabase.from('deudas').insert({
            id_tarjeta: tarjetaId,
            fecha: new Date(),
            fechadecorte: 1, 
            saldoalafecha: 0
        });
        
        actualizadorDeDatos();
        setSwitchModalAgregarTarjeta(0);
    } catch (error) {
        console.error(error);
    }
};

    const [boolMsi , setBoolMsi] = useState(true);

  
    return (
        <Formik
            initialValues={{
                id: userId,
                nombreCard: '',
                creditoCard: true, // Valor por defecto para crédito
                msi: false, // Valor por defecto para meses sin intereses
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
                            <FieldSelect Texto='Tipo de tarjeta' ID='creditoCard' 
                               onChange={(e) => {
                                setFieldValue('creditoCard', e.target.value);
                                setBoolMsi(!boolMsi);
                                
                            }}
                        >
                                <OptionStyled value={true}>Crédito</OptionStyled>
                                <OptionStyled value={false}>Débito</OptionStyled>
                            </FieldSelect>
                                {boolMsi ? (
                                <FieldSelect Texto='Pago a MSI' ID='msi' onChange={(e) => setFieldValue('msi', e.target.value)}>
                                    <OptionStyled value={false}>No</OptionStyled>
                                    <OptionStyled value={true}>Sí</OptionStyled>
                                </FieldSelect>
                            ) : ''}
                            
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

export const ModalModificarTarjeta = ({ switchModalModificarTarjeta, setSwitchModalModificarTarjeta, nombre, tipo, id, msi }) => {
    const {actualizadorDeDatos, userMeta, cardMeta} = useDatos();
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
            credito: values.creditoCard,
            msi: values.msi
            })
        .match({ id: values.id })
        console.log(data,error)
        actualizadorDeDatos();
        setSwitchModalModificarTarjeta(0);
        
    } catch (error) {
        console.error(error);
    }
};

const handleBorrar = async () => {
    if(textoBtnBorrar === 'Borrar'){
        setTextoBtnBorrar('Seguro?')
    }else if(textoBtnBorrar=== 'Seguro?'){
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
            console.log('12312',cardMeta);
            actualizadorDeDatos();
            console.log(cardMeta);
            setSwitchModalModificarTarjeta(0);
            
        } catch (error) {
            console.error(error);
        }
    }
  
};



    return (
        <Formik
        
            initialValues={{
                id: id,
                nombreCard: nombre,
                creditoCard: tipo, // Agregamos este campo para manejar el valor seleccionado del tipo de tarjeta
                msi: msi
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

                            <FieldSelect Texto='Pago a MSI' ID='msi' onChange={(e) => setFieldValue('msi', e.target.value)}>
        
                              {msi ? (
                                <>
                                    <OptionStyled value={true}>Sí</OptionStyled>
                                    <OptionStyled value={false}>No</OptionStyled>
                                </>
                            ) : (
                                <>
                                   <OptionStyled value={false}>No</OptionStyled>
                                    <OptionStyled value={true}>Sí</OptionStyled>
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

export const ModalAgregarSaldo = ({ switchModalAgregarSaldo, setSwitchModalAgregarSaldo, id,nombre, saldo }) => {
    const getSaldo =  () => {
        
        if(saldo.length ){
            const largoArreglo = saldo.length;
            if (largoArreglo>= 1){
                return(saldo[largoArreglo-1].saldoalafecha);
            }else{
                return(0); 
            }
            
            
    
        }else{
            
            return(0);
            
        }
    }

    const saldoRam = getSaldo();
    const {actualizadorDeDatos} = useDatos();
    
    const handleClickCerrarModal = () => {
        setSwitchModalAgregarSaldo(0);
    };


const handleSubmit = async (values) => {
    
    try {
        const result = await supabase.from('deudas').insert({
            id_tarjeta: values.id,
            fecha: `${new Date().getFullYear()}-${(new Date().getMonth() + 1).toString().padStart(2, '0')}-${new Date().getDate().toString().padStart(2, '0')}`,
            fechadecorte: values.fechadecorte,
            saldoalafecha: values.saldoalafecha
           

        });
        
        console.log(result);
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
                fecha: new Date(),
                fechadecorte: 22,
                saldoalafecha: getSaldo()
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

