import Button from "../../componentes/shared/Button";
import { useState } from "react";
import Layout from "../../componentes/layout/Layout";
import styles from "./Login.module.css";
import { useDispatch, useSelector } from "react-redux";
import { authLogin, uiResetError } from "../../store/actions";
import { getUi } from "../../store/selectors";

export default function LoginPage() {
  const dispatch = useDispatch();

  const { pending: isFetching, error } = useSelector(getUi);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // const [error, setError] = useState(null);

  const [checked, setChecked] = useState(false);

  // const [isFetching, setIsFetching] = useState(false);

  const { email, password } = formData;

  const handleSubmit = async (event) => {
    event.preventDefault();
      dispatch(authLogin(formData, checked));
  };

  const handleChange = (event) => {
    setFormData((currentData) => ({
      ...currentData,
      [event.target.name]: event.target.value,
    }));
  };

  const handleCheck = (event) => {
    setChecked(event.target.checked);
  };

  const resetError = () => {
    dispatch(uiResetError());
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
        {error && (
          <div className={styles.errorMsg} onClick={resetError}>
            {error.message}
          </div>
        )}
      </Layout>
    </div>
  );
}
