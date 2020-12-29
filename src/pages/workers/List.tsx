import React from 'react'
import {CBadge, CCard, CCardBody, CCardHeader, CCol, CDataTable, CRow} from "@coreui/react";
import usersData from "../../views/users/UsersData";

const fields = ['Documento identidad','Nombre', 'role', 'status']

const List = () => {
  return (
    <CRow>
      <CCol>
        <CCard accentColor="primary">
          <CCardHeader>
            Listado de trabajadores
          </CCardHeader>
          <CCardBody>
            <CDataTable

            />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default List
