const isAuth = async () => {
  try {
    return true;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  isAuth,
};
