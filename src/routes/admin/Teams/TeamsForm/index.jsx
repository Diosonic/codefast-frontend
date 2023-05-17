import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import { Form } from "react-router-dom";
import TextInput from "../../../../components/InputText";
import CheckboxInput from "../../../../components/CheckboxInput";
import TeamService from "../../../../services/team.service";

export default function TeamForm() {
  const [teamValues, setTeamValues] = useState();

  useEffect(() => {
    setTeamValues({
      name: "",
      checked: false,
    });
  }, []);

  async function createTeam(values) {
    debugger;
    const _teamService = new TeamService();
    await _teamService
      .create(values)
      .then((res) => {
        debugger;
      })
      .catch((err) => {
        debugger;
        console.log(err);
      });
  }

  return (
    <div>
      <h1>Criando novo time</h1>
      <hr></hr>

      <Formik
        enableReinitialize={true}
        // validationSchema={veiacoSchema}
        initialValues={teamValues}
        onSubmit={(values) => {
          debugger;
          createTeam(values);
        }}
      >
        {(props) => {
          return (
            <Form className="form-veiaco">
              {JSON.stringify(props.values)}
              <TextInput label="Nome do time" name="name" fieldName="name" />

              <CheckboxInput
                label="Equipe credenciada?"
                name="checked"
                fieldName="checked"
                id="checked"
                onChange={(ev) => {
                  props.setFieldValue("checked", ev.target.checked);
                }}
                checked={props?.values?.checked}
              />

              <button type="submit">Salvar</button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}
