const notAuthenticatedLogout = (error, setIsLoggedIn, setMessage) => {
  if (error.response && error.response.data.message) {
    setMessage({ type: "error", textContent: error.response.data.message });
  }
  localStorage.removeItem("user");
  setIsLoggedIn(false);
};

const clearMessageAsync = (setMessage) => {
  return setTimeout(() => {
    setMessage("");
  }, 3000);
};

module.exports = {
  notAuthenticatedLogout,
  clearMessageAsync,
};
