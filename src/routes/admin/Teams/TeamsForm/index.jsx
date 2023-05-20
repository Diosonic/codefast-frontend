import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import TeamService from "../../../../services/team.service";
import { useParams } from "react-router-dom";
import Select from "react-select";
import UserService from "../../../../services/user.service";

export default function TeamForm() {
  const { id } = useParams();
  const [teamValues, setTeamValues] = useState();
  const [userOptions, setUserOptions] = useState([]);
  const [action, setAction] = useState("create");

  const _teamService = new TeamService();
  const _userService = new UserService();

  useEffect(() => {
    async function init() {
      const usersOptions = await _userService.list();
      setUserOptions(usersOptions);

      if (id) {
        setAction("edit");
        const team = await _teamService.read(id);
        setTeamValues(team);

      } else {
        setAction("create");
        setTeamValues({
          name: "",
          checked: false,
          users: [],
        });
      }
    }

    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  async function createTeam(values) {
    debugger;
    if (action === "create") {
      await _teamService
        .create(values)
        .then((res) => {
          debugger;
        })
        .catch((err) => {
          debugger;
          console.log(err);
        });
    } else {
      await _teamService
        .update(values)
        .then((res) => {
          debugger;
        })
        .catch((err) => {});
    }
  }

  return (
    <div>
      <h1>{action === "create" ? "Criando time" : "Editando time"}</h1>
      <hr></hr>

      <Formik
        enableReinitialize={true}
        initialValues={teamValues}
        onSubmit={(values) => {
          debugger;
          createTeam(values);
        }}
      >
        {(props) => {
          return (
            <Form>
              <Field type="text" name="name" />

              <br />

              <label>Credenciado: </label>
              <Field type="checkbox" name="checked" />

              <br />

              <Select
                isMulti
                name="users"
                options={userOptions}
                className="basic-multi-select"
                classNamePrefix="select"
                value={props.values?.users}
                onChange={(ev) => {
                  debugger;
                  props.setFieldValue("users", ev);
                }}
              />

              <button type="submit">Salvar</button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}
