import React from "react";
import { Button, Form } from "react-bootstrap";
import "../styles/login.scss";
import Cookie from "../utility/Cookie";

const Login = () => {
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    Cookie.setCookie(
      process.env.SECRET_TOKEN_KEY!,
      user.email + user.password,
      7
    );
    window.location.href = "/";
  };

  return (
    <div className="login-page">
      <div className="form-div">
        <h4>Giriş</h4>
        <Form>
          <Form.Group className="py-3" controlId="formBasicEmail">
            <Form.Control
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              placeholder="E-mail"
            />
          </Form.Group>
          <Form.Group className="py-3" controlId="formBasicPassword">
            <Form.Control
              name="password"
              value={user.password}
              onChange={handleChange}
              type="password"
              placeholder="Şifrə"
            />
          </Form.Group>
          <Button
            size="sm"
            className="text-center"
            variant="primary"
            onClick={(e:any)=>handleSubmit(e)}
>
            Giriş
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Login;
