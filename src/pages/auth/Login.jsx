import Button from "../../componentes/shared/Button";
import { login } from "./service";
import { useAuth } from "./context";
import { useState } from "react";
import Layout from "../../componentes/layout/Layout";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./Login.module.css";

export function LoginPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const { onLogin } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState(null);

  const [checked, setChecked] = useState(false);

  const [isFetching, setIsFetching] = useState(false);

  const { email, password } = formData;

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setIsFetching(true);
      await login(
        {
          email,
          password,
        },
        checked
      );
      onLogin();
      setIsFetching(false);
      navigate(location.state?.pathname || "/");
    } catch (error) {
      setIsFetching(true);
      setError(error);
    }
  };

  const handleChange = (event) => {
    setIsFetching(false);
    setFormData((currentData) => ({
      ...currentData,
      [event.target.name]: event.target.value,
    }));
  };

  const handleCheck = (event) => {
    setChecked(event.target.checked);
  };

  const resetError = () => {
    setError(null);
    setIsFetching(false);
  };

  return (
    <div>
      <Layout>
        <h1>Login to your account</h1>
        <form onSubmit={handleSubmit} className={styles.loginForm}>
          <input
            className={styles.textInput}
            type="text"
            name="email"
            value={email}
            onChange={handleChange}
          />
          <input
            className={styles.textInput}
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
          />
          <label>
            Stay Logged in
            <input
              className={styles.checkInput}
              type="checkbox"
              checked={checked}
              onChange={handleCheck}
            />
          </label>
          <Button type="submit" disabled={!email || !password || isFetching}>
            Log in
          </Button>
        </form>
        <div onClick={resetError}>{error ? error.statusText : null}</div>
      </Layout>
    </div>
  );
}
