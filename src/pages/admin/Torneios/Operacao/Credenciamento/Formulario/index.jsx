import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import EquipeService from "../../../../../../services/equipe.service";

export default function CredenciamentoFormulario() {
  const { id, idEquipe } = useParams();
  const [equipeValues, setEquipeValues] = useState();
  const [action, setAction] = useState("criar");

  const navigate = useNavigate();

  const _equipeService = new EquipeService();

  useEffect(() => {
    async function init() {
      if (idEquipe) {
        setAction("editar");
        const equipe = await _equipeService.read(idEquipe);
        setEquipeValues(equipe);
      } else {
        setAction("criar");
        setEquipeValues({
          nome: "",
          nomeParticipantes: "",
          isCredenciado: false,
          torneioId: id,
        });
      }
    }

    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  async function criarEquipe(values) {
    if (action === "criar") {
      await _equipeService
        .create(values)
        .then((res) => {
          navigate(`/admin/torneio/${id}/credenciamento`);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      await _equipeService
        .update(values)
        .then((res) => {})
        .catch((err) => {});
    }
  }

  return (
    <div>
      <h1>{action === "criar" ? "Criando equipe" : "Editando equipe"}</h1>
      <hr />
      <Formik
        enableReinitialize={true}
        initialValues={equipeValues}
        onSubmit={(values) => {
          criarEquipe(values);
        }}
      >
        {(props) => {
          return (
            <Form>
              <Field type="text" name="nome" placeholder="Nome" />

              <Field
                type="text"
                name="nomeParticipantes"
                placeholder="Nome dos participantes"
              />

              <label>
                <Field type="checkbox" name="isCredenciado" />
                Credenciado
              </label>

              <button type="submit">Enviar</button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}
