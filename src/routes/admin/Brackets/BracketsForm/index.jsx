import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdminButtonsFooter from "../../../../components/admin/AdminButtonsFooter";
import { Button, Row } from "antd";
import TextInput from "../../../../components/TextInput";
import { Col } from "reactstrap";
import RoundService from "../../../../services/round.service";
import SeedService from "../../../../services/seed.service";
import TeamService from "../../../../services/team.service";
import Select from "react-select";
import SeedAndTeamCard from "./SeedAndTeamCard";

import "./styles.scss";

export default function AdminBracketsForm() {
  const { id } = useParams();
  const [action, setAction] = useState("create");
  const [bracketValues, setBracketValues] = useState({});
  const [relationBracket, setRelationBracket] = useState({
    seedId: "",
    team: "",
  });
  const [teamsOptions, setTeamsOptions] = useState([]);

  let navigate = useNavigate();

  const _roundsService = new RoundService();
  const _teamService = new TeamService();
  const _seedService = new SeedService();

  useEffect(() => {
    async function init() {
      const responseTeamService = await _teamService.list();

      setTeamsOptions(responseTeamService);

      if (id) {
        setAction("edit");
        const round = await _roundsService.read(id);
        setBracketValues(round);
      } else {
        setAction("create");
        setBracketValues({
          title: "",
        });
      }
    }

    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  async function onSubmit(values) {
    await _roundsService
      .create(values)
      .then((res) => {
        navigate("/admin/brackets");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async function relationUserAndSeed() {
    await _seedService
      .createRelationSeedsAndTeam({
        seedId: relationBracket.seedId,
        teamId: relationBracket.team.id,
      })
      .then((res) => {
        // navigate("/admin/brackets");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async function onAddSeed() {
    await _seedService
      .create({ round_id: id })
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div>
      <h1>{action === "create" ? "Criando nova rodada" : "Editando rodada"}</h1>
      <hr />

      <Formik
        enableReinitialize={true}
        initialValues={bracketValues}
        onSubmit={(values) => {
          onSubmit(values);
        }}
      >
        {(props) => {
          return (
            <Form className="form-veiaco">
              <Row className="form-user">
                {/* {console.log(props.values)} */}
                <Col md="3" lg="3" xl="3">
                  <TextInput
                    type="text"
                    label="Título"
                    name="title"
                    placeholder="Título"
                  />
                </Col>
                {console.log(props.values)}

                {action === "edit" && (
                  <>
                    <Col md="12" lg="12" xl="12" className="seed-container">
                      <h6>
                        Quantidade de ramo nessa etapa:{" "}
                        {props?.values?.seeds?.length}
                      </h6>

                      <Button htmlType="button" onClick={onAddSeed}>
                        Adicionar ramo
                      </Button>
                    </Col>

                    <hr />

                    <SeedAndTeamCard
                      relationBracket={relationBracket}
                      setRelationBracket={setRelationBracket}
                      values={props?.values}
                      teamsOptions={teamsOptions}
                    />
                  </>
                )}
              </Row>

              <div className="buttons-container">
                <AdminButtonsFooter submit routerLink={"/admin/brackets"} />
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}
