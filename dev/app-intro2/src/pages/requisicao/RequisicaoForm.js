import React, { useState, useEffect } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useForm } from "react-hook-form";
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";
import SolicitanteSrv from "../solicitante/SolicitanteSrv";
import TipoRequisicaoSrv from "../tipoRequisicao/TipoRequisicaoSrv";

const RequisicaoForm = (props) => {
  const [tipoRequisicao, setTipoRequisicao] = useState([]);
  const [solicitante, setSolicitante] = useState([]);
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
        setSolicitante(response.data);
      })
      .catch((e) => {});
  };

  const onClickAtualizarTipo = () => {
    TipoRequisicaoSrv.listar()
      .then((response) => {
        setTipoRequisicao(response.data);
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
                    value: 10,
                    message: "O status deve ter no mínimo 10 caracteres!",
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
              <Dropdown
                name="tipoRequisicao"
                placeholder="Tipo de Requisição..."
                {...register("tipoRequisicao", {
                  required: {
                    value: true,
                    message: "O Tipo de Requisição é obrigatório",
                  },
                  maxLength: {
                    value: 100,
                    message:
                      "O Tipo de Requisição pode ter no máximo 100 caracteres!",
                  },
                  minLength: {
                    value: 2,
                    message:
                      "O Tipo de Requisição deve ter no mínimo 10 caracteres!",
                  },
                })}
                value={props.requisicao.tipoRequisicao}
                options={tipoRequisicao}
                onChange={handleInputChange}
                optionLabel="descricao"
                optionValue="_id"
                editable
              />
              {errors.tipoRequisicao && (
                <span
                  style={{
                    color: "red",
                    fontSize: 12,
                    textAlign: "left",
                    fontStyle: "italic",
                  }}
                >
                  {errors.tipoRequisicao.message}
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
                name="solicitante"
                placeholder="Solicitante..."
                {...register("solicitante", {
                  required: {
                    value: true,
                    message: "O solicitante é obrigatório",
                  },
                  maxLength: {
                    value: 100,
                    message: "O solicitante pode ter no máximo 100 caracteres!",
                  },
                  minLength: {
                    value: 2,
                    message: "O status deve ter no mínimo 10 caracteres!",
                  },
                })}
                value={props.requisicao.solicitante}
                options={solicitante}
                onChange={handleInputChange}
                optionLabel="nome"
                optionValue="_id"
                editable
              />
              {errors.solicitante && (
                <span
                  style={{
                    color: "red",
                    fontSize: 12,
                    textAlign: "left",
                    fontStyle: "italic",
                  }}
                >
                  {errors.solicitante.message}
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
export default RequisicaoForm;
