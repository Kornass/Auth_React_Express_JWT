const getRequestConfig = () => {
    return {
      headers: {
        Authorization: JSON.parse(localStorage.getItem('user'))?.token,
      },
    };
  };

  const notAuthenticatedLogout = (error, setIsLoggedIn) => {
if(error?.response?.status === 401) {
  localStorage.removeItem("user")
setIsLoggedIn(false)
}
  }

  module.exports = {
    getRequestConfig,
    notAuthenticatedLogout
  }