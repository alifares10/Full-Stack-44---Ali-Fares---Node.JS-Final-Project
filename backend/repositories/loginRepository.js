const axios = require("axios");

const URL = "https://jsonplaceholder.typicode.com/users";

const getAllUsersInfo = async () => {
  return await axios.get(URL);
};

module.exports = {
  getAllUsersInfo,
};
