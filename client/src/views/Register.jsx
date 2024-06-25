import { useState, useContext } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Register() {
  const [formData, setFormData] = useState({
    login: "",
    email: "",
    password: "",
    password2: "",
  });

  const { login, message, setMessage } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    debugger;
    e.preventDefault();
    try {
      let res = await axios.post(`/users/register`, formData);
      if (res.status === 200 && res.data.token) {
        setMessage({
          type: "success",
          textContent: `User ${res.data.email} successfully registered!!`,
        });
        login(res.data.token);
        setTimeout(() => {
          navigate("/dashboard");
        }, 2000);
      } else {
        e.target.reset();
        setMessage({
          type: "error",
          textContent: "Something went wrong: HTTP Response corrupted!",
        });
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setMessage({ type: "error", textContent: error.response.data.message });
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label for="login">Login</label>
      <input
        id="login"
        onChange={handleChange}
        required
        value={formData.login}
      />
      <label for="email">Email</label>
      <input
        id="email"
        onChange={handleChange}
        required
        value={formData.email}
      />
      <label for="password">Password</label>
      <input
        id="password"
        onChange={handleChange}
        required
        value={formData.password}
      />
      <label for="password2">Repeat password</label>
      <input
        id="password2"
        onChange={handleChange}
        required
        value={formData.password2}
      />
      <button type="submit">Sign in!</button>
      <p
        style={{
          color: message?.type === "error" ? "red" : "green",
          fontWeight: "bold",
        }}
      >
        {message && message.textContent}
      </p>
    </form>
  );
}

export default Register;
