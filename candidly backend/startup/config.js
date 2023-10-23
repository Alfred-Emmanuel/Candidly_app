module.exports = function () {
  if (!process.env.JWT_SECRET) {
    throw new Error("One or more required environment variables are not set.");
  }
};
