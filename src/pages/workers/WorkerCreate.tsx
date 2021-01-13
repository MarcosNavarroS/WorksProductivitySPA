import React, {FormEvent} from 'react'
import workersService from "../../store/workersService";
import WorkerFormHandler from "./WorkerFormHandler";
import {AxiosResponse} from "axios";
import {IWorker} from "./IWorker";

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

class WorkerCreate extends WorkerFormHandler {

  handleSubmit(event: FormEvent<HTMLFormElement>) {

    event.preventDefault();

    let bodyFormData = new FormData();
    bodyFormData.append('identityCardNumber', this.state.worker.identityCardNumber);
    bodyFormData.append('identityExpirationDate', this.state.worker.identityExpirationDate);
    bodyFormData.append('medicalCheckExpirationDate', this.state.worker.medicalCheckExpirationDate);
    bodyFormData.append('name', this.state.worker.name);

    workersService
      .createWorkers(bodyFormData)
      .then((response: AxiosResponse<{worker: IWorker}>) => {
        this.setState((prevState: IState) => ({
          worker: {
            ...prevState.worker,
            workerId: response.data.worker.workerId
          },
          submitted: true
        }))
      })
      .catch((error) => {
        if (error.response) {
          if(error.response.data.status === 400) {
            let errors = error.response.data.errors;
            let newState: any = {};
            Object.keys(this.state.formErrors).forEach((key: any) => {
              newState[key] = ""
            })

            this.setState((prevState: IState) => ({
              formErrors: newState
            }))

            Object.keys(errors).forEach((key: any) => {
              this.setState((prevState: IState) => ({
                formErrors: {                   // object that we want to update
                  ...prevState.formErrors,    // keep all other key-value pairs
                  [key]: errors[key]       // update the value of specific key
                }
              }))
            })
          }
        } else {
          alert("¡Algo ha fallado!")
        }
      });
  }
}

export default WorkerCreate
