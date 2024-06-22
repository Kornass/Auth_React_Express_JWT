const getRequestConfig = () => {
  return {
    headers: {
      Authorization: JSON.parse(localStorage.getItem("user"))?.token,
    },
  };
};

const notAuthenticatedLogout = (error, setIsLoggedIn, setMessage) => {
  if (error?.response?.status === 401) {
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    if (error.response && error.response.data.message) {
      setMessage({ type: "error", textContent: error.response.data.message });
    }
  }
};

const clearMessageAsync = (setMessage) => {
  return setTimeout(() => {
    setMessage("");
  }, 3000);
};

module.exports = {
  getRequestConfig,
  notAuthenticatedLogout,
  clearMessageAsync,
};
