import { useContext, useEffect } from "react";
import axios from "axios";
import { getRequestConfig, notAuthenticatedLogout } from "../utils/userUtils";
import { AuthContext } from "../context/AuthContext";
import { URL } from "../config";

function Dashboard() {
  const { currentUser, setCurrentUser, setIsLoggedIn } =
    useContext(AuthContext);

  const getUser = async () => {
    try {
      const config = getRequestConfig();
      let res = await axios.get(`${URL}/users/currentUser`, config);
      if (res.status === 200 && res.data) {
        setCurrentUser((prevState) => ({
          ...prevState,
          login: res.data.login,
        }));
      }
    } catch (error) {
      notAuthenticatedLogout(error, setIsLoggedIn);
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="wrapper">
      <h2>User data</h2>
      {currentUser && (
        <>
          <p>Login: {currentUser.login}</p>
          <p>Email: {currentUser.email}</p>
          <p>_ID: {currentUser._id}</p>
        </>
      )}
    </div>
  );
}

export default Dashboard;
