const googleClient = require("../client/google/google-client");
const utils = require("../helpers/utils");

module.exports = {
  verifyTokenOfGoogleSSO: async (idToken) => {
    return googleClient.verifyTokenFromGoogle(idToken);
  },

  signUpIfUserNotExists: async (user) => {},

  generateJwtToken: async (user) => {
    return utils.createToken(user);
  },

  extractUserDetailsFromToken: async (token) => {
    return utils.verifyToken(token);
  },
};
