import React, { useState, useEffect } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useForm } from "react-hook-form";
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";
import ColaboradorSrv from "../colaborador/ColaboradorSrv";
import AtividadeSrv from "../atividade/AtividadeSrv";

const AndamentoForm = (props) => {
  const [atividade, setAtividade] = useState([]);
  const [colaborador, setColaborador] = useState([]);
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    props.setAndamento({ ...props.andamento, [name]: value });
  };

  useEffect(() => {
    onClickAtualizarColaborador();
    onClickAtualizarAtividade();
  }, []);

  const onClickAtualizarColaborador = () => {
    ColaboradorSrv.listar()
      .then((response) => {
        setColaborador(response.data);
      })
      .catch((e) => {});
  };

  const onClickAtualizarAtividade = () => {
    AtividadeSrv.listar()
      .then((response) => {
        setAtividade(response.data);
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

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div style={{ padding: 15 }}>
        <div>
          <h5 style={{ textAlign: "center" }}>Cadastro de Andamentos</h5>
          <div className="p-fluid grid formgrid">
            <div className="field col-4 md:col-4">
              <div className="field col-12 md:col-4">
                <Calendar
                  name="dataHora"
                  placeholder="Data e Hora..."
                  value={props.andamento.dataHora}
                  onChange={handleInputChange}
                  dateFormat="dd-mm-yy"
                  showTime
                  showIcon
                />
              </div>
              <br />
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
                defaultValue={props.andamento.titulo}
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
                defaultValue={props.andamento.descricao}
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
            <div
              className="field col-4 md:col-4"
              style={{ textAlign: "center" }}
            >
              <Dropdown
                name="atividade"
                placeholder="Atividade..."
                value={props.andamento.atividade}
                options={atividade}
                onChange={handleInputChange}
                optionLabel="titulo"
                optionValue="_id"
                editable
              />
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
                value={props.andamento.colaborador}
                options={colaborador}
                onChange={handleInputChange}
                optionLabel="nome"
                optionValue="_id"
                editable
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
export default AndamentoForm;
