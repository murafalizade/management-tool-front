import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import "../styles/login.scss";
import Cookie from "../utility/Cookie";
import OperationService from "../api/operationService";
import Toastify from "../utility/Toastify";
import { AxiosError } from "axios";

const AddUser = () => {
  // User state
  const [user, setUser] = useState({
    email: "",
    password: "",
    passwordConfirm: "",
    role: "",
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

  // Handle change select
    const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setUser((prevState) => ({
        ...prevState,
        [name]: value,
        }));
    };



  // Toastify
  const toast = new Toastify();

  // Handle submit form
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    e.preventDefault();

    // Check user input
    if (!user.email || !user.password || !user.passwordConfirm || !user.role) {
      toast.error("Xahiş olunur bütün xanaları doldurun!");
      setLoading(false);
      return;
    }

    // Check password length
    if (user.password.length < 6) {
      toast.error("Şifrə ən az 6 simvoldan ibarət olmalıdır!");
      setLoading(false);
      return;
    }

    // Check password confirm
    if (user.password !== user.passwordConfirm) {
      toast.error("Şifrələr eyni deyil!");
      setLoading(false);
      return;
    }

    try {
      await OperationService.register(user);
      toast.success("İstifadəçi əlavə edildi!");
      window.location.href = "/profile";
    } catch (error: any) {
      const err = error as AxiosError;
      toast.error((err.response?.data as string) || "Xəta baş verdi!");
    }

    setLoading(false);
  };

  return (
    <div className="login-page position-relative">
      <div className="form-div">
        <Form onSubmit={handleSubmit}>
          <Form.Group className="pb-3" controlId="formBasicEmail">
            <Form.Control
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              className="w-100"
              required
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
              required
            />
          </Form.Group>
          <Form.Group className="pb-3" controlId="formBasicPassword">
            <Form.Control
              name="passwordConfirm"
              value={user.passwordConfirm}
              className="w-100"
              onChange={handleChange}
              type="password"
              placeholder="Şifrənin təkrarı"
              required
            />
          </Form.Group>

            <Form.Select onChange={handleSelect} name="role" value={user.role} className="mb-3" required>
                <option value="">İstifadəçinin rolunu seçin</option>
                <option value="ADMIN">Admin</option>
                <option value="USER">İstifadəçi</option>
                <option value="MANAGER">Menecer</option>
                <option value="VIEWER">Ziyarətçi</option>
            </Form.Select>


          <Button
            size="sm"
            type="submit"
            className="text-center w-100 mb-3"
            variant="primary"
          >
            {!loading ? (
              "Əlavə et"
            ) : (
              <i className="fa fa-refresh fa-spin mx-2"></i>
            )}
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default AddUser;
