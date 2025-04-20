import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import img from "../../assets/Capture.png";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export default function Register() {
  const navigate =useNavigate()
  const initailValues = {
    name: "",
    email: "",
    password: "",
    age: null,
    phone: "",
  };

  function onSubmit(values) {
    axios.post("https://note-sigma-black.vercel.app/api/v1/users/signUp", values).then((res) => {
        console.log(res.data.msg);
        navigate("/login")
      })
      .catch((err) => {
        console.log(err);
      });
  }

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
        "Invalid paassword"
      ),

    phone: Yup.string()
      .required("phone is required")
      .matches(/^(\+20|0)?1[0125]\d{8}$/, "Invalid phone number"),
  });

  const { values, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: initailValues,
    onSubmit,
    validationSchema,
  });

  return (
    <div className="min-vh-100 register p-3 d-flex justify-content-between align-items-center ">
      <div className="pic">
        <img src={img} className="register-img " alt="LoginPic" />
      </div>
      <h1>Register</h1>
      <Form onSubmit={handleSubmit} className=" form ">
        <h2>* Register *</h2>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            onChange={handleChange}
            onBlur={handleBlur}
            name="name"
            type="text"
            placeholder="Enter your name"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            onChange={handleChange}
            onBlur={handleBlur}
            name="email"
            type="email"
            placeholder="Enter email"
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            onChange={handleChange}
            onBlur={handleBlur}
            name="password"
            type="password"
            placeholder="Password"
          />
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
            name="phone"
            type="text"
            placeholder="Phone"
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}
