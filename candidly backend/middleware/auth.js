const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  const token = req.header("x-authentication");
  if (!token)
    return res
      .status(401)
      .send("Access denied. No token/login credentials provided.");

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decodedToken;
    next();
  } catch (ex) {
    res.status(400).send("Invalid Token.");
  }
}

module.exports = auth;
