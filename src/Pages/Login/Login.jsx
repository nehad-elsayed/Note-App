import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import img from "../../assets/Capture.png";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import Loading from "../../Components/Loading/Loading";

export default function Login() {
  const navigate = useNavigate();
  const [errMsg, setErrMsg] = useState("");
  const [isloading, setIsloading] = useState(false);

  const initailValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("email is invalid or not exist"),
    password: Yup.string().required("Invalid password"),
  });

  const { values, handleBlur, handleChange, handleSubmit, errors, touched } =
    useFormik({
      initialValues: initailValues,
      onSubmit,
      validationSchema,
    });

  function onSubmit(values) {
    setIsloading(true);
    setErrMsg("");
    axios
      .post("https://note-sigma-black.vercel.app/api/v1/users/signIn", values)
      .then((res) => {
        console.log(res.data);
        if ((res.data.msg = "done")) {
          localStorage.setItem("token", res.data.token);
          navigate("/");
        }
      })
      .catch((err) => {
        console.log(err);
        setErrMsg(err);
      })
      .finally(() => {
        setIsloading(false);
      });
  }

  if (isloading) {
    return <Loading />;
  }

  return (
    <div className="min-vh-100 register p-3 d-flex justify-content-between align-items-center ">
      <div className="pic">
        <img src={img} className="register-img " alt="LoginPic" />
      </div>
      <h1>Login</h1>
      <Form onSubmit={handleSubmit} className="form">
        <h2>* Login *</h2>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            onChange={handleChange}
            onBlur={handleBlur}
            isInvalid={errors.email && touched.email}
            name="email"
            type="email"
            placeholder="Enter email"
          />
          <Form.Text className="text-muted">
            Enter your email if you have
          </Form.Text>
          <Form.Control.Feedback type="invalid">
            {errors.email}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            onChange={handleChange}
            onBlur={handleBlur}
            isInvalid={errors.password && touched.password}
            name="password"
            type="password"
            placeholder="Password"
          />
          <Form.Control.Feedback type="invalid">
            {errors.password}
          </Form.Control.Feedback>
        </Form.Group>
        <div className="login-footer d-flex  align-items-center p-2">
          <Button variant="primary" type="submit">
            Login
          </Button>
          <Link to={"/register"} className="p-2 ms-2 font-monospace  fa-bold">
            SignUp
          </Link>
        </div>
      </Form>
    </div>
  );
}
