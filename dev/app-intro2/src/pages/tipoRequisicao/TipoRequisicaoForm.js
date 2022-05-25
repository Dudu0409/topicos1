import React from "react";
const TipoRequisicaoForm = (props) => {
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    props.setTipoRequisicao({ ...props.tipoRequisicao, [name]: value });
  };

  return (
    <form>
      <div className="form-group">
        <label>Descrição</label>
        <input
          className="form-control"
          type="text"
          name="descricao"
          value={props.tipoRequisicao.descricao}
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
export default TipoRequisicaoForm;
