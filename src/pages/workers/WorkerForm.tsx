import React, {ChangeEvent, FormEvent, FunctionComponent} from 'react'
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
import workersService from "../../store/workersService";
import {AxiosError, AxiosResponse} from "axios";

interface Worker {
  identityCardNumber: string;
  identityExpirationDate: string;
  medicalCheckExpirationDate: string;
  name: string;
  workerId?: string;
}

interface FormErrors {
  identityCardNumber: string;
  identityExpirationDate: string;
  medicalCheckExpirationDate: string;
  name: string;
}

interface FormProps {
  edit?: boolean;
}

const WorkerForm: FunctionComponent<FormProps> = ({edit = false}) => {
  const [worker, setWorker] = React.useState<Worker>({
    name: "",
    identityCardNumber: "",
    identityExpirationDate: "",
    medicalCheckExpirationDate: ""
  })

  const [formErrors, setFormErrors] = React.useState<FormErrors>({
    name: "",
    identityCardNumber: "",
    identityExpirationDate: "",
    medicalCheckExpirationDate: ""
  })

  const [submitted, setSubmitted] = React.useState(false)

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const name = event.target.name;

    setWorker({
      ...worker,
      [name]: value
    });
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if(!edit) {
      handleCreate()
    }
  }

  const handleCreate = () => {

    let bodyFormData = new FormData();
    bodyFormData.append('identityCardNumber', worker.identityCardNumber);
    bodyFormData.append('identityExpirationDate', worker.identityExpirationDate);
    bodyFormData.append('medicalCheckExpirationDate', worker.medicalCheckExpirationDate);
    bodyFormData.append('name', worker.name);

    workersService
      .createWorkers(bodyFormData)
      .then((response: AxiosResponse<{worker: Worker}>) => {
        setWorker(worker => ({...worker, workerId: response.data.worker.workerId}))
        setSubmitted(true)
      })
      .catch((error: AxiosError) => {
        if (error.response) {
          if(error.response.data.status === 400) {
            let errors = error.response.data.errors;
            handleFormErrors(errors)
          }
        } else {
          alert("¡Algo ha fallado!")
        }
      });
  }

  const handleFormErrors = (errors: any) => {

    resetFormErrors()

    Object.keys(errors).forEach((key: any) => {
      setFormErrors(formErrors => ({
        ...formErrors,
        [key]: errors[key]
      }));
    })
  }

  const resetFormErrors = () => {
    let newState: any = {};
    Object.keys(formErrors).forEach((key: any) => {
      newState[key] = ""
    })

    setFormErrors(newState);
  }

  if (submitted) {
    return <Redirect to={`/trabajadores/${worker.workerId}`} push />
  }
  return (
    <CRow>
      <CCol>
        <CForm action="" method="post" className="form-horizontal" onSubmit={handleSubmit}>
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
                            value={worker.name}
                            onChange={handleChange}
                            invalid={!(!formErrors.name && formErrors.name.length === 0)}/>
                    <CInvalidFeedback>{formErrors.name}</CInvalidFeedback>
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
                            value={worker.identityCardNumber}
                            onChange={handleChange}
                            invalid={!(!formErrors.identityCardNumber && formErrors.identityCardNumber.length === 0)} />
                    <CInvalidFeedback>{formErrors.identityCardNumber}</CInvalidFeedback>
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
                            value={worker.identityExpirationDate}
                            onChange={handleChange}
                            invalid={!(!formErrors.identityExpirationDate && formErrors.identityExpirationDate.length === 0)}/>
                    <CInvalidFeedback>{formErrors.identityExpirationDate}</CInvalidFeedback>
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
                            value={worker.medicalCheckExpirationDate}
                            onChange={handleChange}
                            invalid={!(!formErrors.medicalCheckExpirationDate && formErrors.medicalCheckExpirationDate.length === 0)}/>
                    <CInvalidFeedback>{formErrors.medicalCheckExpirationDate}</CInvalidFeedback>
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

export default WorkerForm
