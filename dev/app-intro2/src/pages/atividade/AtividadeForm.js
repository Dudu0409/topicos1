import React, { useState, useEffect } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useForm } from "react-hook-form";
import { Calendar } from "primereact/calendar";
import { AutoComplete } from "primereact/autocomplete";
import ColaboradorSrv from "../colaborador/ColaboradorSrv";
import RequisicaoSrv from "../requisicao/RequisicaoSrv";

const AtividadeForm = (props) => {
  const [requisicoes, setRequisicoes] = useState([]);
  const [colaboradores, setColaboradores] = useState([]);
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    props.setAtividade({ ...props.atividade, [name]: value });
  };

  useEffect(() => {
    onClickAtualizarColaborador();
    onClickAtualizarRequisicao();
  }, []);

  const onClickAtualizarColaborador = () => {
    ColaboradorSrv.listar()
      .then((response) => {
        setColaboradores(response.data);
      })
      .catch((e) => {});
  };

  const onClickAtualizarRequisicao = () => {
    RequisicaoSrv.listar()
      .then((response) => {
        setRequisicoes(response.data);
      })
      .catch((e) => {});
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    props.salvar();
  };

  const [filteredColaboradores, setFilteredColaboradores] = useState(null);
  const [filteredRequisicoes, setFilteredRequisicoes] = useState(null);
  const searchColaborador = (event) => {
    setTimeout(() => {
      let _filteredColaboradores;
      if (!event.query.trim().length) {
        _filteredColaboradores = [...colaboradores];
      } else {
        _filteredColaboradores = colaboradores.filter((colaborador) => {
          return colaborador.nome
            .toLowerCase()
            .startsWith(event.query.toLowerCase());
        });
      }

      setFilteredColaboradores(_filteredColaboradores);
    }, 250);
  };
  const searchRequisicao = (event) => {
    setTimeout(() => {
      let _filteredRequisicoes;
      if (!event.query.trim().length) {
        _filteredRequisicoes = [...requisicoes];
      } else {
        _filteredRequisicoes = requisicoes.filter((requisicao) => {
          return requisicao.titulo
            .toLowerCase()
            .startsWith(event.query.toLowerCase());
        });
      }

      setFilteredRequisicoes(_filteredRequisicoes);
    }, 250);
  };

  const itemTemplate1 = (item) => {
    return (
      <div>
        <div>{item.nome}</div>
      </div>
    );
  };
  const itemTemplate2 = (item) => {
    return (
      <div>
        <div>{item.titulo}</div>
      </div>
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div style={{ padding: 15 }}>
        <div>
          <h5 style={{ textAlign: "center" }}>Cadastro de Atividades</h5>
          <div className="p-fluid grid formgrid">
            <div className="field col-4 md:col-4">
              <InputText
                name="titulo"
                placeholder="T??tulo..."
                {...register("titulo", {
                  required: { value: true, message: "O t??tulo ?? obrigat??rio!" },
                  maxLength: {
                    value: 100,
                    message: "O t??tulo pode ter no m??ximo 100 caracteres!",
                  },
                  minLength: {
                    value: 2,
                    message: "O t??tulo deve ter no m??nimo 2 caracteres!",
                  },
                })}
                defaultValue={props.atividade.titulo}
                onChange={handleInputChange}
              />
              {errors.titulo && (
                <span style={{ color: "red", fontStyle: "italic" }}>
                  {errors.titulo.message}
                </span>
              )}
            </div>
          </div>
          <br />
          <div className="p-fluid grid formgrid">
            <div className="field col-4 md:col-4">
              <InputText
                name="descricao"
                placeholder="Descri????o..."
                {...register("descricao", {
                  required: {
                    value: true,
                    message: "A descri????o ?? obrigat??ria!",
                  },
                  maxLength: {
                    value: 100,
                    message: "A descri????o pode ter no m??ximo 100 caracteres!",
                  },
                  minLength: {
                    value: 10,
                    message: "A descri????o deve ter no m??nimo 10 caracteres!",
                  },
                })}
                defaultValue={props.atividade.descricao}
                onChange={handleInputChange}
              />
              {errors.descricao && (
                <span style={{ color: "red", fontStyle: "italic" }}>
                  {errors.descricao.message}
                </span>
              )}
            </div>
          </div>
          <br />
          <div className="p-fluid grid formgrid">
            <div className="field col-4 md:col-4">
              <InputText
                name="status"
                placeholder="Status..."
                {...register("status", {
                  required: {
                    value: true,
                    message: "O status ?? obrigat??rio!",
                  },
                  maxLength: {
                    value: 100,
                    message: "O status pode ter no m??ximo 100 caracteres!",
                  },
                  minLength: {
                    value: 2,
                    message: "O status deve ter no m??nimo 2 caracteres!",
                  },
                })}
                defaultValue={props.atividade.status}
                onChange={handleInputChange}
              />
              {errors.status && (
                <span style={{ color: "red", fontStyle: "italic" }}>
                  {errors.status.message}
                </span>
              )}
            </div>
          </div>
          <br />
          <div className="field col-12 md:col-4">
            <Calendar
              name="prazo"
              placeholder="Prazo..."
              value={props.atividade.prazo}
              onChange={handleInputChange}
              dateFormat="dd-mm-yy"
              showTime
              showIcon
            />
          </div>
          <br />
          <div className="field col-12 md:col-4">
            <Calendar
              name="agendaInicio"
              placeholder="Data e Hora de In??cio..."
              value={props.atividade.agendaInicio}
              onChange={handleInputChange}
              dateFormat="dd-mm-yy"
              showTime
              showIcon
            />
          </div>
          <br />
          <div className="field col-12 md:col-4">
            <Calendar
              name="dataHoraTermino"
              placeholder="Data e Hora de T??rmino..."
              value={props.atividade.dataHoraTermino}
              onChange={handleInputChange}
              dateFormat="dd-mm-yy"
              showTime
              showIcon
            />
          </div>
          <br />
          <div className="p-fluid grid formgrid">
            <div
              className="field col-4 md:col-4"
              style={{ textAlign: "center" }}
            >
              <AutoComplete
                name="requisicao"
                value={props.atividade.requisicao}
                suggestions={filteredRequisicoes}
                completeMethod={searchRequisicao}
                onChange={handleInputChange}
                field="titulo"
                dropdown
                forceSelection
                itemTemplate={itemTemplate2}
                placeholder="Requisi????o..."
              />
            </div>
          </div>
          <br />
          <div className="p-fluid grid formgrid">
            <div
              className="field col-4 md:col-4"
              style={{ textAlign: "center" }}
            >
              <AutoComplete
                name="colaborador"
                value={props.atividade.colaborador}
                suggestions={filteredColaboradores}
                completeMethod={searchColaborador}
                onChange={handleInputChange}
                field="nome"
                dropdown
                forceSelection
                itemTemplate={itemTemplate1}
                placeholder="Colaborador..."
              />
            </div>
          </div>
          <div style={{ textAlign: "center" }}>
            <Button
              type="submit"
              icon="pi pi-save"
              className="p-button-rounded p-button-info"
              label="Salvar"
            ></Button>
            <span> </span>
            <Button
              type="button"
              icon="pi pi-undo"
              className="p-button-rounded p-button-info"
              label="Cancelar"
              onClick={props.cancelar}
            ></Button>
          </div>
        </div>
      </div>
    </form>
  );
};
export default AtividadeForm;
