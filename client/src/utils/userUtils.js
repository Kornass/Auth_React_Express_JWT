const getRequestConfig = (token) => {
    return {
      headers: {
        Authorization: token,
      },
    };
  };

  module.exports = {
    getRequestConfig
  }