import { useContext, useEffect } from "react";
import { axiosPublic } from "../api/axiosPublic";
import { axiosAuth } from "../api/axiosJWT";
import { AuthContext } from "../context/AuthContext";
import { notAuthenticatedLogout } from "../utils/userUtils";
import { clearMessageAsync } from "../utils/userUtils";
import { jwtDecode } from "jwt-decode";

function Dashboard() {
  const { currentUser, setCurrentUser, setIsLoggedIn, setMessage, login } =
    useContext(AuthContext);

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
      let res = await axiosPublic.post(
        `/users/refreshToken/${currentUser._id}`
      );
      if (res.status === 200 && res.data.accessToken) {
        login(res.data.accessToken);
        return res.data;
      }
    } catch (error) {
      notAuthenticatedLogout(error, setIsLoggedIn, setMessage);
      clearMessageAsync(setMessage);
    }
  };

  const getUser = async () => {
    try {
      let res = await axiosAuth.get(`/users/currentUser`);
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
    getUser();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="wrapper">
      <h2>User data</h2>
      {currentUser && (
        <>
          <p>Login: {currentUser.login}</p>
          <p>Email: {currentUser.email}</p>
          <p>_ID: {currentUser._id}</p>
          <p>access token: {currentUser.token}</p>
        </>
      )}
    </div>
  );
}

export default Dashboard;
