const UsuarioList = (props) => {
  return (
    <div>
      <h4>Listagem de Usuários</h4>
      <button
        onClick={props.onClickAtualizar}
        type="button"
        className="btn btn-success btn-sm"
      >
        Atualizar Lista
      </button>
      <button type="button" className="btn btn-primary btn-sm">
        Inserir
      </button>

      <table className="table">
        <thead>
          <tr>
            <th>Index</th>
            <th>Id</th>
            <th>Nome</th>
            <th>Email</th>
            <th>Celular</th>
            <th>Operações</th>
          </tr>
        </thead>
        <tbody>
          {props.usuario.length > 0 ? (
            props.usuario.map((o, index) => (
              <tr key={index}>
                <td>{index}</td>
                <td>{o.id}</td>
                <td>{o.nome}</td>
                <td>{o.email}</td>
                <td>{o.celular}</td>
                <td>
                  <button type="button" className="btn btn-primary">
                    Editar
                  </button>
                  <button
                    onClick={() => props.excluir(o.id)}
                    className="btn btn-danger"
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5}>Nenhum usuário.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
export default UsuarioList;
