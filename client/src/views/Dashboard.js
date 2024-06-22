import { useContext, useEffect } from "react";
import axios from "../api/axios";
import { notAuthenticatedLogout } from "../utils/userUtils";
import { AuthContext } from "../context/AuthContext";
import { clearMessageAsync } from "../utils/userUtils";

function Dashboard() {
  const { currentUser, setCurrentUser, setIsLoggedIn, setMessage } =
    useContext(AuthContext);

  const getUser = async () => {
    try {
      // axios.defaults.headers.common["Authorization"] = JSON.parse(
      //   localStorage.getItem("user")
      // )?.token;
      let res = await axios.get(`/users/currentUser`);
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
