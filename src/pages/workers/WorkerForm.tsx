import React, {ChangeEvent, FormEvent} from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CForm,
  CFormGroup,
  CInput,
  CInvalidFeedback,
  CLabel,
  CRow,
} from '@coreui/react'
import {IWorker} from "./IWorker";


interface IProp {
  handleChange: (event: ChangeEvent<HTMLInputElement>) => any,
  handleSubmit: (event: FormEvent<HTMLFormElement>) => any,
  worker: IWorker
}

class WorkerForm extends React.Component<IProp, {}> {

  constructor(props: Readonly<IProp> | IProp) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event: ChangeEvent<HTMLInputElement>) {
    event.preventDefault();
    this.props.handleChange(event)
  }

  handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    this.props.handleSubmit(event)
  }

  // handleChange(event: ChangeEvent<HTMLInputElement>) {
  //   const target = event.target;
  //   const value = target.value;
  //   const name = target.name;
  //
  //   this.setState(prevState => ({
  //     worker: {                   // object that we want to update
  //       ...prevState.worker,    // keep all other key-value pairs
  //       [name]: value       // update the value of specific key
  //     }
  //   }))
  //
  //   // this.setState({
  //   //   [name]: value
  //   // } as Pick<Worker, keyof Worker>);
  // }

  // handleSubmit(event: FormEvent<HTMLFormElement>) {
  //   event.preventDefault();
  //   console.log(this.state)
  //   workersService
  //     .createWorkers(this.state)
  //     .then((response/*: AxiosResponse<Workers>*/) => {
  //       this.setState(response.data)
  //       console.log(response)
  //     })
  //     .catch((e) => {
  //       console.log(e);
  //     });
  // }

  render() {
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
                              value={this.props.worker.name}
                              onChange={this.handleChange}
                              required />
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
                              value={this.props.worker.identityCardNumber}
                              onChange={this.handleChange}
                              required />
                      <CInvalidFeedback>Houston, we have a problem...</CInvalidFeedback>
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
                              value={this.props.worker.identityExpirationDate}
                              onChange={this.handleChange}
                              required />
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
                              value={this.props.worker.medicalCheckExpirationDate}
                              onChange={this.handleChange}
                              required />
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

export default WorkerForm
