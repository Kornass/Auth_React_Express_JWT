import { useState, useContext, useEffect, useRef } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { clearMessageAsync } from "../utils/userUtils";

function SignUp() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { login, message, setMessage } = useContext(AuthContext);

  const navigate = useNavigate();
  const messageRef = useRef(null);

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await axios.post(`/users/login`, formData);
      if (res.status === 200 && res.data.token) {
        setMessage({
          type: "success",
          textContent: `Welcome back ${res.data.email} !!`,
        });
        login(res.data.token);
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
      console.log(error);
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
  }, []);

  return (
    <form onSubmit={handleSubmit}>
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
      <button type="submit">Log in!</button>
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

export default SignUp;
