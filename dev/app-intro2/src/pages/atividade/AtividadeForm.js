import React, { useState, useEffect } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useForm } from "react-hook-form";
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";
import ColaboradorSrv from "../colaborador/ColaboradorSrv";
import RequisicaoSrv from "../requisicao/RequisicaoSrv";

const AtividadeForm = (props) => {
  const [requisicao, setRequisicao] = useState([]);
  const [colaborador, setColaborador] = useState([]);
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
        setColaborador(response.data);
      })
      .catch((e) => {});
  };

  const onClickAtualizarRequisicao = () => {
    RequisicaoSrv.listar()
      .then((response) => {
        setRequisicao(response.data);
      })
      .catch((e) => {});
  };

  const {
    register,
    formState: { errors },
  } = useForm();

  return (
    <form>
      <div style={{ padding: 15 }}>
        <div>
          <h5 style={{ textAlign: "center" }}>Cadastro de Atividades</h5>
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
                    message: "O status é obrigatório!",
                  },
                  maxLength: {
                    value: 100,
                    message: "O status pode ter no máximo 100 caracteres!",
                  },
                  minLength: {
                    value: 10,
                    message: "O status deve ter no mínimo 10 caracteres!",
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
              placeholder="Data e Hora de Início..."
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
              placeholder="Data e Hora de Término..."
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
              <Dropdown
                name="requisicao"
                placeholder="Requisição..."
                {...register("requisicao", {
                  required: {
                    value: true,
                    message: "A Requisição é obrigatória!",
                  },
                  maxLength: {
                    value: 100,
                    message: "A Requisição pode ter no máximo 100 caracteres!",
                  },
                  minLength: {
                    value: 2,
                    message: "A Requisição deve ter no mínimo 2 caracteres!",
                  },
                })}
                value={props.atividade.requisicao}
                options={requisicao}
                onChange={handleInputChange}
                optionLabel="titulo"
                optionValue="_id"
                editable
              />
              {errors.requisicao && (
                <span
                  style={{
                    color: "red",
                    fontSize: 12,
                    textAlign: "left",
                    fontStyle: "italic",
                  }}
                >
                  {errors.requisicao.message}
                </span>
              )}
            </div>
          </div>
          <br />
          <div className="p-fluid grid formgrid">
            <div
              className="field col-4 md:col-4"
              style={{ textAlign: "center" }}
            >
              <Dropdown
                name="colaborador"
                placeholder="Colaborador..."
                {...register("colaborador", {
                  required: {
                    value: true,
                    message: "O colaborador é obrigatório!",
                  },
                  maxLength: {
                    value: 100,
                    message: "O colaborador pode ter no máximo 100 caracteres!",
                  },
                  minLength: {
                    value: 2,
                    message: "O colaborador deve ter no mínimo 2 caracteres!",
                  },
                })}
                value={props.atividade.colaborador}
                options={colaborador}
                onChange={handleInputChange}
                optionLabel="nome"
                optionValue="_id"
                editable
              />
              {errors.colaborador && (
                <span
                  style={{
                    color: "red",
                    fontSize: 12,
                    textAlign: "left",
                    fontStyle: "italic",
                  }}
                >
                  {errors.colaborador.message}
                </span>
              )}
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
