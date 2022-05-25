import React from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
const ColaboradorList = (props) => {
  const paginatorLeft = (
    <Button type="button" icon="pi pi-refresh" className="p-button-text" />
  );
  const paginatorRight = (
    <Button type="button" icon="pi pi-cloud" className="p-button-text" />
  );

  return (
    <div className="App">
      <h4>Listagem de Colaboradores</h4>
      <div style={{ margin: "10px" }}>
        <button
          onClick={props.onClickAtualizar}
          className="btn btn-primary btn-sm"
        >
          <i className="pi pi-refresh" />
        </button>
        <span> </span>
        <button className="btn btn-success btn-sm" onClick={props.inserir}>
          <i className="pi pi-plus-circle" />
        </button>
      </div>

      <div className="card">
        <DataTable
          value={props.colaboradores}
          paginator
          responsiveLayout="scroll"
          paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
          currentPageReportTemplate="Mostrando de {first} a {last} de {totalRecords}"
          rows={5}
          rowsPerPageOptions={[5, 10, 20, 50]}
          paginatorLeft={paginatorLeft}
          paginatorRight={paginatorRight}
          selectionMode="single"
          selection={props.colaborador}
          onSelectionChange={(e) => props.setColaborador(e.value)}
        >
          <Column field="_id" header="Id" sortable></Column>
          <Column field="nome" header="Nome" sortable filter></Column>
          <Column field="email" header="E-mail" sortable filter></Column>
          <Column field="senha" header="Senha" sortable></Column>
          <Column
            header="Operações"
            body={(row) => {
              return (
                <>
                  <button
                    onClick={() => props.editar(row._id)}
                    className="btn btn-warning btn-sm"
                  >
                    <i className="pi pi-pencil"></i>
                  </button>
                  <span> </span>
                  <button
                    onClick={() => props.excluir(row._id)}
                    className="btn btn-danger btn-sm"
                  >
                    <i className="pi pi-trash"></i>
                  </button>
                </>
              );
            }}
          ></Column>
        </DataTable>
      </div>
    </div>
  );
};
export default ColaboradorList;
