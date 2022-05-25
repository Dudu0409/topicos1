import React from "react";
const ColaboradorForm = (props) => {
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    props.setColaborador({ ...props.colaborador, [name]: value });
  };

  return (
    <form>
      <div className="form-group">
        <label>Nome</label>
        <input
          className="form-control"
          type="text"
          name="nome"
          value={props.colaborador.nome}
          onChange={handleInputChange}
        />
      </div>
      <div className="form-group">
        <label>Email</label>
        <input
          className="form-control"
          type="text"
          name="email"
          value={props.colaborador.email}
          onChange={handleInputChange}
        />
      </div>
      <div className="form-group">
        <label>Senha</label>
        <input
          className="form-control"
          type="password"
          name="senha"
          value={props.colaborador.senha}
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
export default ColaboradorForm;
