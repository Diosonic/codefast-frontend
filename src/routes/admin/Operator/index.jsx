import { Button, Col, Form, Input, Row } from "antd";
import AdminHeader from "../../../components/admin/AdminHeader";
import {
  EyeTwoTone,
  EyeInvisibleOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Formik } from "formik";
import { useNavigate } from "react-router-dom";

export default function Operator() {
  let navigate = useNavigate();

  function setAuth({ username, password }) {
    debugger;

    if (username === "operatorhackaton" && password === "Un1nass4u") {
      localStorage.setItem("AUTH_OPERATOR", true);
      navigate(`/admin`);
    } else {
      return false;
    }
  }

  return (
    <>
      <AdminHeader title="Login como operador" />

      <Formik
        enableReinitialize={true}
        initialValues={{ username: "", password: "" }}
      >
        {(props) => {
          return (
            <Form>
              <Row className="gap-3">
                <Col md="2" lg="2" xl="2">
                  <Input
                    placeholder="Nome de usuário"
                    prefix={<UserOutlined className="site-form-item-icon" />}
                    name="username"
                    onChange={(ev) => {
                      props.setFieldValue("username", ev.target.value);
                    }}
                  />
                </Col>
                <Col md="2" lg="2" xl="2">
                  <Input.Password
                    placeholder="Senha"
                    name="password"
                    onChange={(ev) => {
                      props.setFieldValue("password", ev.target.value);
                    }}
                    iconRender={(visible) =>
                      visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                    }
                  />
                </Col>
                <Col md="2" lg="2" xl="2">
                  <Row className="gap-2">
                    <Button
                      type="primary"
                      htmlType="submit"
                      onClick={() => {
                        setAuth(props.values);
                      }}
                    >
                      Autenticar
                    </Button>

                    <Button
                      type="default"
                      htmlType="button"
                      onClick={() => {
                        navigate(`/admin`);
                      }}
                    >
                      Voltar
                    </Button>
                  </Row>
                </Col>
              </Row>
            </Form>
          );
        }}
      </Formik>
    </>
  );
}
