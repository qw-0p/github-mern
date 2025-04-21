import { Button, Form } from 'react-bootstrap';
import { useAuthStore } from '../store/AuthStore.ts';
import React, { useState } from 'react';
import { useNavigate } from 'react-router';

const Auth = () => {
  const { login, isAuthenticated, register } = useAuthStore();
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const isRegister = window.location.pathname === "/register"
  const isLogin = window.location.pathname === "/login"

  const navigate = useNavigate()

  if (isAuthenticated) {
    () => navigate("/")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      if (isRegister) {
        await register(email, password)
      }
      if (isLogin) {
        await login(email, password)
      }

      navigate("/")
    } catch (err: any) {
      console.error(err);
    }
  }


  return (
    <Form className="mt-4" onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        {isRegister ? "Register" : "Login"}
      </Button>
    </Form>
  );
};

export default Auth;
