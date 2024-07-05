import { useContext, useEffect } from "react";
import { axiosPublic } from "../api/axiosPublic";
import { axiosAuth } from "../api/axiosJWT";
import { AuthContext } from "../context/AuthContext";
import { notAuthenticatedLogout } from "../utils/userUtils";
import { clearMessageAsync } from "../utils/userUtils";
import { jwtDecode } from "jwt-decode";

function Dashboard() {
  const { currentUser, setCurrentUser, setIsLoggedIn, setMessage, loginUser } =
    useContext(AuthContext);

  const { login, email, _id, token } = currentUser;

  axiosAuth.interceptors.request.use(
    async (config) => {
      const currentDate = new Date();
      const decodedToken = jwtDecode(currentUser.token);
      if (decodedToken.exp * 1000 < currentDate.getTime()) {
        const data = await refreshToken();
        config.headers["Authorization"] = data.accessToken;
      } else {
        config.headers["Authorization"] = currentUser.token;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  const refreshToken = async () => {
    try {
      const res = await axiosPublic.post(
        `/users/refreshToken/${currentUser._id}`
      );
      if (res.status === 200 && res.data.accessToken) {
        loginUser(res.data.accessToken);
        return res.data;
      }
    } catch (error) {
      notAuthenticatedLogout(error, setIsLoggedIn, setMessage);
      clearMessageAsync(setMessage);
    }
  };

  const getUser = async (signal) => {
    try {
      const res = await axiosAuth.get(`/users/currentUser`, { signal });
      if (res.status === 200) {
        setCurrentUser((prevState) => ({
          ...prevState,
          login: res.data.login,
        }));
      }
    } catch (error) {
      notAuthenticatedLogout(error, setIsLoggedIn, setMessage);
      clearMessageAsync(setMessage);
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    getUser(controller.signal);
    return () => {
      controller.abort();
    };
    // eslint-disable-next-line
  }, []);

  return (
    <div className="wrapper">
      <h2>User data</h2>
      {currentUser && (
        <>
          <p>
            <strong>Login:</strong> {login}
          </p>
          <p>
            <strong>Email:</strong> {email}
          </p>
          <p>
            <strong>_ID:</strong> {_id}
          </p>
          <p id="token">
            <strong>Access token:</strong> {token}
          </p>
        </>
      )}
    </div>
  );
}

export default Dashboard;
