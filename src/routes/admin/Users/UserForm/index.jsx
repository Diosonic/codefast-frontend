import { Form, Formik } from "formik";
import React from "react";
import UserService from "../../../../services/user.service";
import { useNavigate } from "react-router-dom";
import AdminButtonsFooter from "../../../../components/admin/AdminButtonsFooter";
import { Row } from "antd";
import TextInput from "../../../../components/TextInput";
import { Col } from "reactstrap";

import "./styles.scss";

export default function AdminUserForm() {
  let navigate = useNavigate();

  async function onSubmit(values) {
    const userService = new UserService();

    await userService
      .create(values)
      .then((res) => {
        navigate("/admin/users");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div>
      <h1>Criando novo usuário</h1>
      <hr />

      <Formik
        enableReinitialize={true}
        initialValues={{ name: "", email: "" }}
        onSubmit={(values) => {
          onSubmit(values);
        }}
      >
        {(props) => {
          return (
            <Form className="form-veiaco">
              <Row className="form-user">
                <Col md="3" lg="3" xl="3">
                  <TextInput
                    type="text"
                    label="Nome"
                    name="name"
                    placeholder="Nome"
                  />
                </Col>

                <Col md="3" lg="3" xl="3">
                  <TextInput
                    type="email"
                    label="E-mail"
                    name="email"
                    fieldName="email"
                  />
                </Col>
              </Row>

              <div className="buttons-container">
                <AdminButtonsFooter submit routerLink={"/admin/users"} />
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}
