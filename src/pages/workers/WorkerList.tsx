import React from 'react'
import {CCard, CCardBody, CCardHeader, CCol, CDataTable, CRow} from "@coreui/react";
import workersService from "../../store/workersService";
import {AxiosResponse} from "axios";

const dateformat = require("dateformat")

interface Worker {
  identityCardNumber: string;
  identityExpirationDate: string;
  medicalCheckExpirationDate: string;
  name: string;
  workerId: string;
}

interface Workers {
  workers: Array<Worker>;
}

const fields = [
  { key: 'workerId', label: 'Id' },
  { key: 'identityCardNumber', label: 'Numero identidad' },
  { key: 'name', label: 'Nombre' },
  { key: 'identityExpirationDate', label: 'Expiración identidad' },
  { key: 'medicalCheckExpirationDate', label: 'Expiración chequeo medico' },
]

const scopedSlots = {
  'identityExpirationDate': (item: Worker) => {
    return (<td>{dateformat(new Date(item.identityExpirationDate), 'dd/mm/yyyy')}</td>);
  },
  'medicalCheckExpirationDate': (item: Worker) => {
    return (<td>{dateformat(new Date(item.medicalCheckExpirationDate), 'dd/mm/yyyy')}</td>);
  },
}

class WorkerList extends React.Component<{}, Workers> {

  constructor(props: {}) {
    super(props);

    this.state = {
      workers: []
    }

  }

  componentDidMount() {
    workersService
      .getWorkers()
      .then((response: AxiosResponse<Workers>) => {
        this.setState(response.data)
        console.log(response)
      })
      .catch((e) => {
        console.log(e);
      });
  }


  render() {
    return (
      <CRow>
        <CCol>
          <CCard accentColor="primary">
            <CCardHeader>
              Listado de trabajadores
            </CCardHeader>
            <CCardBody>
              <CDataTable
                items={this.state.workers}
                fields={fields}
                scopedSlots={scopedSlots}
              />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    )
  }
}



export default WorkerList
