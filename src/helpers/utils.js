const jwt = require("jsonwebtoken");

module.exports = {
  createToken: async (user) => {
    const token = await jwt.sign({ user }, process.env.JWT_SECRET_KEY, {
      expiresIn: "2000000 seconds",
    });
    return token;
  },
  verifyToken: async (token) => {
    const verifiedUser = await jwt.verify(token, process.env.JWT_SECRET_KEY);
    return verifiedUser;
  },
};
