import React from "react";
import moment from "moment";
import { Formik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { registerUser } from "../../../_actions/user_actions";

import { Form, Input, Button, Card, Checkbox } from "antd";

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

function RegisterPage(props) {
  const dispatch = useDispatch();
  return (
    <section className="container py-5">
      <Formik
        initialValues={{
          email: "",
          lastName: "",
          name: "",
          password: "",
          confirmPassword: "",
          policy: false,
        }}
        validationSchema={Yup.object().shape({
          name: Yup.string().required("Name is required"),
          lastName: Yup.string().required("Last Name is required"),
          email: Yup.string()
            .email("Email is invalid")
            .required("Email is required"),
          phoneNumber: Yup.string().required("Phone Number is required"),
          password: Yup.string()
            .min(6, "Password must be at least 6 characters")
            .required("Password is required"),
          confirmPassword: Yup.string()
            .oneOf([Yup.ref("password"), null], "Passwords must match")
            .required("Confirm Password is required"),
          policy: Yup.boolean()
            .equals([true], "Kindly check this to register."),
        })}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            let dataToSubmit = {
              email: values.email,
              password: values.password,
              phonenumber: values.phoneNumber,
              name: values.name,
              lastname: values.lastName,
              policy: values.policy,
              image: `http://gravatar.com/avatar/${moment().unix()}?d=identicon`,
            };

            dispatch(registerUser(dataToSubmit)).then((response) => {
              if (response.payload.success) {
                props.history.push("/login");
              } else {
                alert(response.payload.err.errmsg);
              }
            });

            setSubmitting(false);
          }, 500);
        }}
      >
        {(props) => {
          const {
            values,
            touched,
            errors,
            isSubmitting,
            handleChange,
            handleBlur,
            handleSubmit,
          } = props;
          return (
            <Card title="Registrati">
              <div className="app">
                <Form
                  style={{ minWidth: "375px" }}
                  {...formItemLayout}
                  onSubmit={handleSubmit}
                >
                  <Form.Item
                    required
                    label="Nome"
                    hasFeedback
                    validateStatus={
                      errors.name && touched.name ? "error" : "success"
                    }
                  >
                    <Input
                      id="name"
                      placeholder="Inserisci Nome"
                      type="text"
                      value={values.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={
                        errors.name && touched.name
                          ? "text-input error"
                          : "text-input"
                      }
                    />
                    {errors.name && touched.name && (
                      <div className="input-feedback">{errors.name}</div>
                    )}
                  </Form.Item>

                  <Form.Item
                    required
                    label="Cognome"
                    hasFeedback
                    validateStatus={
                      errors.lastName && touched.lastName ? "error" : "success"
                    }
                  >
                    <Input
                      id="lastName"
                      placeholder="Inserisci Cognome"
                      type="text"
                      value={values.lastName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={
                        errors.lastName && touched.lastName
                          ? "text-input error"
                          : "text-input"
                      }
                    />
                    {errors.lastName && touched.lastName && (
                      <div className="input-feedback">{errors.lastName}</div>
                    )}
                  </Form.Item>

                  <Form.Item
                    required
                    label="Email"
                    hasFeedback
                    validateStatus={
                      errors.email && touched.email ? "error" : "success"
                    }
                  >
                    <Input
                      id="email"
                      placeholder="Inserisci Email"
                      type="email"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={
                        errors.email && touched.email
                          ? "text-input error"
                          : "text-input"
                      }
                    />
                    {errors.email && touched.email && (
                      <div className="input-feedback">{errors.email}</div>
                    )}
                  </Form.Item>

                  <Form.Item
                    required
                    label="Numero di telefono"
                    hasFeedback
                    validateStatus={
                      errors.phoneNumber && touched.phoneNumber
                        ? "error"
                        : "success"
                    }
                  >
                    <Input
                      id="phoneNumber"
                      placeholder="Inserisci Numero di telefono"
                      type="text"
                      value={values.phoneNumber}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={
                        errors.phoneNumber && touched.phoneNumber
                          ? "text-input error"
                          : "text-input"
                      }
                    />
                    {errors.phoneNumber && touched.phoneNumber && (
                      <div className="input-feedback">{errors.phoneNumber}</div>
                    )}
                  </Form.Item>

                  <Form.Item
                    required
                    label="Password"
                    hasFeedback
                    validateStatus={
                      errors.password && touched.password ? "error" : "success"
                    }
                  >
                    <Input
                      id="password"
                      placeholder="Inserisci password"
                      type="password"
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={
                        errors.password && touched.password
                          ? "text-input error"
                          : "text-input"
                      }
                    />
                    {errors.password && touched.password && (
                      <div className="input-feedback">{errors.password}</div>
                    )}
                  </Form.Item>

                  <Form.Item
                    required
                    label="Conferma password"
                    hasFeedback
                    validateStatus={
                      errors.confirmPassword && touched.confirmPassword
                        ? "error"
                        : "success"
                    }
                  >
                    <Input
                      id="confirmPassword"
                      placeholder="Inserisci Conferma password"
                      type="password"
                      value={values.confirmPassword}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={
                        errors.confirmPassword && touched.confirmPassword
                          ? "text-input error"
                          : "text-input"
                      }
                    />
                    {errors.confirmPassword && touched.confirmPassword && (
                      <div className="input-feedback">
                        {errors.confirmPassword}
                      </div>
                    )}
                  </Form.Item>

                  <Form.Item
                    {...tailFormItemLayout}
                  >
                    <div style={{lineHeight:'23px'}}>
                    <Checkbox
                      id="policy"
                      checked={values.policy}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={
                        errors.checkbox && touched.checkbox
                          ? "text-input error"
                          : "text-input"
                      }
                    >
                      Ho letto e acconsento all’utilizzo dei miei dati come descritto nella <a href="https://www.geniusrei.com/privacy-policy/">Privacy Policy</a>
                    </Checkbox>
                    </div>
                    {errors.policy && touched.policy && (
                      <div className="input-feedback">{errors.policy}</div>
                    )}
                  </Form.Item>

                  <Form.Item {...tailFormItemLayout} style={{marginTop:40}}>
                    <Button
                      onClick={handleSubmit}
                      htmlType="submit"
                      type="primary"
                      disabled={isSubmitting}
                    >
                       Registrati
                    </Button>
                  </Form.Item>
                </Form>
              </div>
            </Card>
          );
        }}
      </Formik>
    </section>
  );
}

export default RegisterPage;
