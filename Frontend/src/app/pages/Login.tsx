import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import "../styles/login.scss";
import Cookie from "../utility/Cookie";
import OperationService from "../api/operationService";
import Toastify from "../utility/Toastify";
import { AxiosError } from "axios";

const Login = () => {
  // User state
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  // Loading state
  const [loading, setLoading] = useState<boolean>(false);
  // Handle change input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle submit form
  const handleSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
    setLoading(true);
    e.preventDefault();

    try {
      const { token } = await OperationService.login(user);
      console.log(process.env.REACT_APP_SECRET_TOKEN_KEY!);
      Cookie.setCookie(process.env.REACT_APP_SECRET_TOKEN_KEY!, token, 7);
      window.location.href = "/";
    } catch (error: any) {
      const err = error as AxiosError;
      Toastify.success(
        (err.response?.data as string) || "Xəta baş verdi!",
        "top-end"
      );
    }

    setLoading(false);
  };

  return (
    <div className="login-page">
      <div className="form-div">
        <h4 className="mb-5 fs-1 fw-5">Maliyyə Sistemi</h4>
        <Form>
          <Form.Group className="pb-3" controlId="formBasicEmail">
            <Form.Control
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              className="w-100"
              placeholder="E-mail və ya istifadəçi adı"
            />
          </Form.Group>
          <Form.Group className="pb-3" controlId="formBasicPassword">
            <Form.Control
              name="password"
              value={user.password}
              className="w-100"
              onChange={handleChange}
              type="password"
              placeholder="Şifrə"
            />
          </Form.Group>
          <Button
            size="sm"
            className="text-center w-100 mb-3"
            variant="primary"
            onClick={handleSubmit}
          >
            {!loading ? (
              "Giriş"
            ) : (
              <i className="fa fa-refresh fa-spin mx-2"></i>
            )}
          </Button>
          <small>
            Şifrəni unutmusunuz? <a href="/">Şifrəni yeniləyin</a>
          </small>
        </Form>
      </div>
    </div>
  );
};

export default Login;
