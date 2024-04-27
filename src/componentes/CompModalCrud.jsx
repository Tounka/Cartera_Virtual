import styled from "styled-components";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { TextoPrincipalSession, FormStyled, FieldCampo, BtnSubmit, ContenedorPSesion, FieldSelect } from "./ComPSesion";
import { supabase } from "../supabase/client";

const ModalStyled = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
    background-color: #0000008e;
    width: 100%;
    height: 100%;
    overflow: hidden;
    display: ${props => (props.switchModalAgregarTarjeta === 0 ? 'none' : 'flex')};
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
`;

const OptionStyled = styled.option`
    width: 100%;
    height: 100%;
`;

const Modal = ({ children, switchModalAgregarTarjeta }) => {
    return <ModalStyled switchModalAgregarTarjeta={switchModalAgregarTarjeta}>{children}</ModalStyled>;
};

export const ModalAgregarTarjeta = ({ switchModalAgregarTarjeta, setSwitchModalAgregarTarjeta, userId }) => {
    const handleClickCerrarModal = () => {
        setSwitchModalAgregarTarjeta(0);
    };

    const handleSubmit = async ({ values }) => {
        console.log(values);
    };

    return (
        <Formik
            initialValues={{
                id: userId,
                nombreCard: '',
                creditoCard: '', // Agregamos este campo para manejar el valor seleccionado del tipo de tarjeta
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
                console.log(values);
            }}
        >
            {({ values, setFieldValue }) => ( // Usamos el render prop para obtener accesso a setFieldValue
                <Modal switchModalAgregarTarjeta={switchModalAgregarTarjeta}>
                    <ContenedorPSesion>
                        <TextoPrincipalSession> Agregar Tarjeta </TextoPrincipalSession>
                        <FormStyled>
                            <FieldCampo Texto='Nombre de la tarjeta' ID='nombreCard' Type='text' />
                            <FieldSelect Texto='Tipo de tarjeta' ID='creditoCard' onChange={(e) => setFieldValue('creditoCard', e.target.value)}>
                                <OptionStyled value='true'>Crédito</OptionStyled>
                                <OptionStyled value='false'>Débito</OptionStyled>
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
