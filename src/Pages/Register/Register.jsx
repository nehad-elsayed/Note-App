import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import img from "../../assets/Capture.PNG";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import Loading from "../../Components/Loading/Loading";
export default function Register() {
  const navigate = useNavigate();
  const [errMsg, setErrMsg] = useState("");
  const [isloading, setIsloading] = useState(false);

  const initailValues = {
    name: "",
    email: "",
    password: "",
    age: null,
    phone: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .required("name is required")
      .min(3, "name must be at least 3 characters")
      .max(20, "name must be less than 20 character"),
    email: Yup.string()
      .required("email is required")
      .email("email is invalid")
      .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i,
        "Invalid email address"
      ),
    password: Yup.string()
      .required("password is required")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Invalid paassword A valid password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character from the set @$!%*?&."
      ),

    phone: Yup.string()
      .required("phone is required")
      .matches(/^(\+20|0)?1[0125]\d{8}$/, "Invalid phone number A valid Egyptian mobile number must start with either +20, or 0, followed by 1, then one of 0, 1, 2, or 5, and then exactly 8 digits."),
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
      .post("https://note-sigma-black.vercel.app/api/v1/users/signUp", values)
      .then((res) => {
        console.log(res.data.msg);
        navigate("/login");
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
      <h1>Register</h1>
      <Form onSubmit={handleSubmit} className="form">
        <h2>* Register *</h2>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            onChange={handleChange}
            onBlur={handleBlur}
            isInvalid={errors.name && touched.name}
            name="name"
            type="text"
            placeholder="Enter your name"
          />
          <Form.Control.Feedback type="invalid">
            {errors.name}
          </Form.Control.Feedback>
        </Form.Group>
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
            Enter valid email and never share with anyone
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
        <Form.Group className="mb-3" controlId="formBasicAge">
          <Form.Label>Age</Form.Label>
          <Form.Control
            onChange={handleChange}
            onBlur={handleBlur}
            name="age"
            type="number"
            placeholder=""
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPhone">
          <Form.Label>Phone</Form.Label>
          <Form.Control
            onChange={handleChange}
            onBlur={handleBlur}
            isInvalid={errors.phone && touched.phone}
            name="phone"
            type="text"
            placeholder="Phone"
          />
          <Form.Control.Feedback type="invalid">
            {errors.phone}
          </Form.Control.Feedback>
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}
