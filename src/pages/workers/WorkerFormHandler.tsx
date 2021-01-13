import React, {ChangeEvent, FormEvent} from "react";
import {IWorker} from "./IWorker";
import {Redirect} from "react-router-dom";
import {
  CButton,
  CCard,
  CCardBody, CCardFooter,
  CCardHeader,
  CCol,
  CForm,
  CFormGroup,
  CInput,
  CInvalidFeedback,
  CLabel,
  CRow
} from "@coreui/react";

interface IFormErrors {
  identityCardNumber: string;
  identityExpirationDate: string;
  medicalCheckExpirationDate: string;
  name: string;
}

interface IState {
  worker: IWorker,
  formErrors: IFormErrors,
  submitted: boolean
}

abstract class WorkerFormHandler extends React.Component<any, IState>{

  protected constructor(props: Readonly<any> | any) {
    super(props);

    this.state = {
      worker: {
        name: "",
        identityCardNumber: "",
        identityExpirationDate: "",
        medicalCheckExpirationDate: ""
      },
      formErrors: {
        name: "",
        identityCardNumber: "",
        identityExpirationDate: "",
        medicalCheckExpirationDate: ""
      },
      submitted: false
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event: ChangeEvent<HTMLInputElement>) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState((prevState: IState) => ({
      worker: {                   // object that we want to update
        ...prevState.worker,    // keep all other key-value pairs
        [name]: value       // update the value of specific key
      }
    }))
  }

  abstract handleSubmit(event: FormEvent<HTMLFormElement>): any;

  render() {
    if (this.state.submitted) {
      return <Redirect to={`/trabajadores/${this.state.worker.workerId}`} push />
    }
    return (
      <CRow>
        <CCol>
          <CForm action="" method="post" className="form-horizontal" onSubmit={this.handleSubmit}>
            <CCard accentColor="primary">
              <CCardHeader>
                Creación de trabajadores
              </CCardHeader>
              <CCardBody>
                <CRow>
                  <CCol>
                    <CFormGroup>
                      <CLabel htmlFor="name">Nombre</CLabel>
                      <CInput id="name"
                              name="name"
                              placeholder="Introduce el nombre"
                              value={this.state.worker.name}
                              onChange={this.handleChange} invalid={!(!this.state.formErrors.name && this.state.formErrors.name.length === 0)}/>
                      <CInvalidFeedback>{this.state.formErrors.name}</CInvalidFeedback>
                    </CFormGroup>
                  </CCol>
                </CRow>
                <CRow>
                  <CCol>
                    <CFormGroup>
                      <CLabel htmlFor="identityCardNumber">Numero de identidad</CLabel>
                      <CInput id="identityCardNumber"
                              name="identityCardNumber"
                              placeholder="Introduce el numero de identidad"
                              value={this.state.worker.identityCardNumber}
                              onChange={this.handleChange}
                              invalid={!(!this.state.formErrors.identityCardNumber && this.state.formErrors.identityCardNumber.length === 0)} />
                      <CInvalidFeedback>{this.state.formErrors.identityCardNumber}</CInvalidFeedback>
                    </CFormGroup>
                  </CCol>
                </CRow>
                <CRow>
                  <CCol>
                    <CFormGroup>
                      <CLabel htmlFor="identityExpirationDate">Fecha expiración de numero de identidad</CLabel>
                      <CInput type="date"
                              id="identityExpirationDate"
                              name="identityExpirationDate"
                              placeholder="Introduce el numero de identidad"
                              value={this.state.worker.identityExpirationDate}
                              onChange={this.handleChange}
                              invalid={!(!this.state.formErrors.identityExpirationDate && this.state.formErrors.identityExpirationDate.length === 0)}/>
                      <CInvalidFeedback>{this.state.formErrors.identityExpirationDate}</CInvalidFeedback>
                    </CFormGroup>
                  </CCol>
                </CRow>
                <CRow>
                  <CCol>
                    <CFormGroup>
                      <CLabel htmlFor="medicalCheckExpirationDate">Fecha de expiración de chequeo medico</CLabel>
                      <CInput type="date"
                              id="medicalCheckExpirationDate"
                              name="medicalCheckExpirationDate"
                              placeholder="Introduce el numero de identidad"
                              value={this.state.worker.medicalCheckExpirationDate}
                              onChange={this.handleChange}
                              invalid={!(!this.state.formErrors.medicalCheckExpirationDate && this.state.formErrors.medicalCheckExpirationDate.length === 0)}/>
                      <CInvalidFeedback>{this.state.formErrors.medicalCheckExpirationDate}</CInvalidFeedback>
                    </CFormGroup>
                  </CCol>
                </CRow>
              </CCardBody>
              <CCardFooter>
                <CButton type="submit" color="primary">Guardar</CButton>
              </CCardFooter>
            </CCard>
          </CForm>
        </CCol>
      </CRow>
    )
  }

}

export default WorkerFormHandler
