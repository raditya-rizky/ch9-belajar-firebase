import { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function onSubmit(event) {
    event.preventDefault();

    if (loading) return;

    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      setLoading(false);
      navigate("/");
    } catch (error) {
      setLoading(false);
      if (error.name === "FirebaseError") {
        if (
          error.code === "auth/user-not-found" ||
          error.code === "auth/wrong-password"
        ) {
          alert("Username atau password salah");
        }
      }
    }
  }

  return (
    <Container className="mt-3">
      <h1>Login</h1>

      <Form onSubmit={onSubmit}>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          {loading ? "Loading..." : "Submit"}
        </Button>
      </Form>
    </Container>
  );
}

export default Login;
