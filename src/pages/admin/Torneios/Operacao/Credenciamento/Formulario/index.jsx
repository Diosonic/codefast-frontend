import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import EquipeService from "../../../../../../services/equipe.service";

export default function CredenciamentoFormulario() {
  const { id } = useParams();
  const [equipeValues, setEquipeValues] = useState();
  const [userOptions, setUserOptions] = useState([]);
  const [action, setAction] = useState("create");

  let navigate = useNavigate();

  const _equipeService = new EquipeService();

  useEffect(() => {
    async function init() {
      const usersOptions = await _equipeService.read();

      setUserOptions(usersOptions);

      if (id) {
        setAction("edit");
        const equipe = await _equipeService.read(id);
        setEquipeValues(equipe);
      } else {
        setAction("create");
        setEquipeValues({
          name: "",
          seed_id: "",
          checked: false,
          users: [],
        });
      }
    }

    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  async function criarEquipe(values) {
    //   if (action === "create") {
    //     await _teamService
    //       .create(values)
    //       .then((res) => {
    //         navigate("/admin/teams");
    //       })
    //       .catch((err) => {
    //         console.log(err);
    //       });
    //   } else {
    //     await _teamService
    //       .update(values)
    //       .then((res) => {})
    //       .catch((err) => {});
    //   }
  }

  return (
    <div>
      <h1>{action === "create" ? "Criando time" : "Editando time"}</h1>
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
              {/* <TextInput
                    type="text"
                    label="Nome"
                    name="name"
                    placeholder="Nome"
                  /> */}

              {/* <Col md="3" lg="3" xl="3">
                  <Select
                    isMulti
                    name="users"
                    options={userOptions}
                    className="basic-multi-select"
                    classNamePrefix="select"
                    value={props.values?.users}
                    onChange={(ev) => {
                      props.setFieldValue("users", ev);
                    }}
                  />
                </Col> */}

              {/* <AdminButtonsFooter submit routerLink={"/admin/teams"} /> */}
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}
