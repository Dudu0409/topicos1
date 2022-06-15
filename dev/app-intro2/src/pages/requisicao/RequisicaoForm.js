import React, { useState, useEffect } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useForm } from "react-hook-form";
import { Calendar } from "primereact/calendar";
import { AutoComplete } from "primereact/autocomplete";
import SolicitanteSrv from "../solicitante/SolicitanteSrv";
import TipoRequisicaoSrv from "../tipoRequisicao/TipoRequisicaoSrv";

const RequisicaoForm = (props) => {
  const [tiposRequisicoes, setTiposRequisicoes] = useState([]);
  const [solicitantes, setSolicitantes] = useState([]);
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    props.setRequisicao({ ...props.requisicao, [name]: value });
  };

  useEffect(() => {
    onClickAtualizarSolicitante();
    onClickAtualizarTipo();
  }, []);

  const onClickAtualizarSolicitante = () => {
    SolicitanteSrv.listar()
      .then((response) => {
        setSolicitantes(response.data);
      })
      .catch((e) => {});
  };

  const onClickAtualizarTipo = () => {
    TipoRequisicaoSrv.listar()
      .then((response) => {
        setTiposRequisicoes(response.data);
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
  const [filteredTiposRequisicoes, setFilteredTiposRequisicoes] =
    useState(null);
  const [filteredSolicitantes, setFilteredSolicitantes] = useState(null);

  const searchTipoRequisicao = (event) => {
    setTimeout(() => {
      let _filteredTiposRequisicoes;
      if (!event.query.trim().length) {
        _filteredTiposRequisicoes = [...tiposRequisicoes];
      } else {
        _filteredTiposRequisicoes = tiposRequisicoes.filter(
          (tipoRequisicao) => {
            return tipoRequisicao.descricao
              .toLowerCase()
              .startsWith(event.query.toLowerCase());
          }
        );
      }

      setFilteredTiposRequisicoes(_filteredTiposRequisicoes);
    }, 250);
  };
  const searchSolicitante = (event) => {
    setTimeout(() => {
      let _filteredSolicitantes;
      if (!event.query.trim().length) {
        _filteredSolicitantes = [...solicitantes];
      } else {
        _filteredSolicitantes = solicitantes.filter((solicitante) => {
          return solicitante.nome
            .toLowerCase()
            .startsWith(event.query.toLowerCase());
        });
      }

      setFilteredSolicitantes(_filteredSolicitantes);
    }, 250);
  };

  const itemTemplate1 = (item) => {
    return (
      <div>
        <div>{item.descricao}</div>
      </div>
    );
  };
  const itemTemplate2 = (item) => {
    return (
      <div>
        <div>{item.nome}</div>
      </div>
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div style={{ padding: 15 }}>
        <div>
          <h5 style={{ textAlign: "center" }}>Cadastro de Requisições</h5>
          <div className="p-fluid grid formgrid">
            <div className="field col-4 md:col-4">
              <InputText
                name="titulo"
                placeholder="Título..."
                {...register("titulo", {
                  required: { value: true, message: "O título é obrigatório!" },
                  maxLength: {
                    value: 100,
                    message: "O título pode ter no máximo 100 caracteres!",
                  },
                  minLength: {
                    value: 10,
                    message: "O título deve ter no mínimo 10 caracteres!",
                  },
                })}
                defaultValue={props.requisicao.titulo}
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
                placeholder="Descrição..."
                {...register("descricao", {
                  required: {
                    value: true,
                    message: "A descrição é obrigatória!",
                  },
                  maxLength: {
                    value: 100,
                    message: "A descrição pode ter no máximo 100 caracteres!",
                  },
                  minLength: {
                    value: 10,
                    message: "A descrição deve ter no mínimo 10 caracteres!",
                  },
                })}
                defaultValue={props.requisicao.descricao}
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
          <div className="field col-12 md:col-4">
            <Calendar
              name="dataHoraCriada"
              placeholder="Data e Hora de Criação..."
              value={props.requisicao.dataHoraCriada}
              onChange={handleInputChange}
              dateFormat="dd-mm-yy"
              showTime
              showIcon
            />
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
                    message: "O status é obrigatório!",
                  },
                  maxLength: {
                    value: 100,
                    message: "O status pode ter no máximo 100 caracteres!",
                  },
                  minLength: {
                    value: 2,
                    message: "O status deve ter no mínimo 2 caracteres!",
                  },
                })}
                defaultValue={props.requisicao.status}
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
              name="prazoAtendimento"
              placeholder="Prazo de Atendimento..."
              value={props.requisicao.prazoAtendimento}
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
                name="tipoRequisicao"
                value={props.requisicao.tipoRequisicao}
                suggestions={filteredTiposRequisicoes}
                completeMethod={searchTipoRequisicao}
                onChange={handleInputChange}
                field="descricao"
                dropdown
                forceSelection
                itemTemplate={itemTemplate1}
                placeholder="Tipo de Requisição..."
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
                name="solicitante"
                value={props.requisicao.solicitante}
                suggestions={filteredSolicitantes}
                completeMethod={searchSolicitante}
                onChange={handleInputChange}
                field="nome"
                dropdown
                forceSelection
                itemTemplate={itemTemplate2}
                placeholder="Solicitante..."
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
export default RequisicaoForm;
