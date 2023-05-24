import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdminButtonsFooter from "../../../../components/admin/AdminButtonsFooter";
import { Button, Row } from "antd";
import TextInput from "../../../../components/TextInput";
import { Col } from "reactstrap";
import RoundService from "../../../../services/round.service";
import SeedService from "../../../../services/seed.service";

// import "./styles.scss";

export default function AdminBracketsForm() {
  const { id } = useParams();
  const [action, setAction] = useState("create");
  const [bracketValues, setBracketValues] = useState({});

  let navigate = useNavigate();

  const _roundsService = new RoundService();

  useEffect(() => {
    async function init() {
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

  console.log(bracketValues);

  async function onSubmit(values) {
    console.log(values);
  }

  async function onAddSeed() {
    const _seedService = new SeedService();

    await _seedService
      .create({ round_id: id })
      .then((res) => {
        // navigate("/admin/brackets");
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
              {JSON.stringify(props.values)}
              <Row className="form-user">
                <Col md="3" lg="3" xl="3">
                  <TextInput
                    type="text"
                    label="Título"
                    name="title"
                    placeholder="Título"
                  />
                </Col>brackets

                <Col md="12" lg="12" xl="12">
                  <h2>{props?.values?.seeds?.length}</h2>

                  <Button htmlType="button" onClick={onAddSeed}>Adicionar ramo</Button>
                </Col>
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
