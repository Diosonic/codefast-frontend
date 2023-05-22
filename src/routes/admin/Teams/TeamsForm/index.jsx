import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import TeamService from "../../../../services/team.service";
import { useNavigate, useParams } from "react-router-dom";
import UserService from "../../../../services/user.service";
import AdminButtonsFooter from "../../../../components/admin/AdminButtonsFooter";
import TextInput from "../../../../components/TextInput";
import Select from "react-select";
import { Col, Row } from "reactstrap";

export default function TeamForm() {
  const { id } = useParams();
  const [teamValues, setTeamValues] = useState();
  const [userOptions, setUserOptions] = useState([]);
  const [action, setAction] = useState("create");

  let navigate = useNavigate();

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
    if (action === "create") {
      await _teamService
        .create(values)
        .then((res) => {
          navigate("/admin/teams");
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
          createTeam(values);
        }}
      >
        {(props) => {
          return (
            <Form>
              <Row>
                <Col md="3" lg="3" xl="3">
                  <TextInput
                    type="text"
                    label="Nome"
                    name="name"
                    placeholder="Nome"
                  />
                </Col>

                <Col md="3" lg="3" xl="3">
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
                </Col>
              </Row>

              <AdminButtonsFooter submit routerLink={"/admin/teams"} />
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}
