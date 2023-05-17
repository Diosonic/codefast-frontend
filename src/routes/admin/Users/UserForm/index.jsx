import { Field, Form, Formik } from "formik";
import React from "react";
import UserService from "../../../../services/user.service";
import { useNavigate } from "react-router-dom";

export default function AdminUserForm() {
  let navigate = useNavigate();

  async function onSubmit(values) {
    const userService = new UserService();

    await userService
      .create(values)
      .then((res) => {
        debugger;
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
              <Field type="string" name="name" placeholder="Nome" />
              <Field type="email" name="email" placeholder="Email" />

              <button type="submit">Salvar</button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}
