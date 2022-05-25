import React from "react";
import { Calendar } from "primereact/calendar";
const RequisicaoForm = (props) => {
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    props.setRequisicao({ ...props.requisicao, [name]: value });
  };

  return (
    <form>
      <div className="form-group">
        <label>Título</label>
        <input
          className="form-control"
          type="text"
          name="titulo"
          value={props.requisicao.titulo}
          onChange={handleInputChange}
        />
        <label>Descrição</label>
        <input
          className="form-control"
          type="text"
          name="descricao"
          value={props.requisicao.descricao}
          onChange={handleInputChange}
        />
        <label>Data de Criação</label>
        <div className="field col-12 md:col-4">
          <Calendar
            name="dataHoraCriada"
            value={props.requisicao.dataHoraCriada}
            onChange={handleInputChange}
            dateFormat="dd-mm-yy"
            showTime
            showIcon
          />
        </div>
        <label>Status</label>
        <input
          className="form-control"
          type="text"
          name="status"
          value={props.requisicao.status}
          onChange={handleInputChange}
        />
        <label>Prazo de Atendimento</label>
        <div className="field col-12 md:col-4">
          <Calendar
            name="prazoAtendimento"
            value={props.requisicao.prazoAtendimento}
            onChange={handleInputChange}
            dateFormat="dd-mm-yy"
            showTime
            showIcon
          />
        </div>
        <label>Tipo da Requisição</label>
        <input
          className="form-control"
          type="text"
          name="tipoRequisicao"
          value={props.requisicao.tipoRequisicao._id}
          onChange={handleInputChange}
        />
        <label>Solicitante</label>
        <input
          className="form-control"
          type="text"
          name="solicitante"
          value={props.requisicao.solicitante._id}
          onChange={handleInputChange}
        />
        <p />
      </div>
      <div className="form-group">
        <div style={{ textAlign: "center" }}>
          <button
            type="button"
            onClick={props.salvar}
            className="btn btn-primary btn-sm"
          >
            <i className="pi pi-save" />
          </button>
          <span> </span>
          <button
            type="button"
            onClick={props.cancelar}
            className="btn btn-primary btn-sm"
          >
            <i className="pi pi-undo" />
          </button>
        </div>
      </div>
    </form>
  );
};
export default RequisicaoForm;
