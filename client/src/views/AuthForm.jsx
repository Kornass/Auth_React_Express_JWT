import { useState, useContext, useRef, useEffect } from "react";
import { axiosPublic } from "../api/axiosPublic";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useLocation } from "react-router-dom";
import { clearMessageAsync } from "../utils/userUtils";

function AuthForm() {
  const [formData, setFormData] = useState({
    login: "",
    email: "",
    password: "",
    password2: "",
  });

  const { loginUser, message, setMessage } = useContext(AuthContext);

  const messageRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const formType = location.pathname.includes("register")
    ? "register"
    : "login";

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await axiosPublic.post(`/users/${formType}`, formData);
      if (res.status === 200 && res.data.accessToken) {
        loginUser(res.data.accessToken);
        setMessage({
          type: "success",
          textContent:
            formType === "register"
              ? `User ${res.data.email} successfully registered!!`
              : `Welcome back ${res.data.email} !!`,
        });
        setTimeout(() => {
          navigate("/dashboard");
        }, 2000);
        messageRef.current = clearMessageAsync(setMessage);
      } else {
        e.target.reset();
        setMessage({
          type: "error",
          textContent: "Something went wrong: HTTP Response corrupted!",
        });
        messageRef.current = clearMessageAsync(setMessage);
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setMessage({ type: "error", textContent: error.response.data.message });
      }
      messageRef.current = clearMessageAsync(setMessage);
    }
  };

  useEffect(() => {
    return () => {
      if (messageRef.current) {
        clearTimeout(messageRef.current);
        setMessage(null);
      }
    };
    // eslint-disable-next-line
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      {formType === "register" && (
        <>
          <label htmlFor="login">Login</label>
          <input
            id="login"
            onChange={handleChange}
            required
            value={formData.login}
          />
        </>
      )}
      <label htmlFor="email">Email</label>
      <input
        id="email"
        onChange={handleChange}
        required
        value={formData.email}
      />
      <label htmlFor="password">Password</label>
      <input
        id="password"
        onChange={handleChange}
        required
        value={formData.password}
      />
      {formType === "register" && (
        <>
          <label htmlFor="password2">Repeat password</label>
          <input
            id="password2"
            onChange={handleChange}
            required
            value={formData.password2}
          />
        </>
      )}
      <button type="submit">
        {formType === "register" ? "Sign up!" : "Login!"}
      </button>
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

export default AuthForm;
