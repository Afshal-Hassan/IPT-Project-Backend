const axios = require("axios");
const BadRequest = require("../../exceptions/bad-request");

module.exports = {
  verifyTokenFromGoogle: async (idToken) => {
    try {
      const response = await axios({
        method: "GET",
        url:
          "https://oauth2.googleapis.com/tokeninfo?scope=email&id_token=" +
          idToken,
      });

      return response;
    } catch (error) {
      return new BadRequest("Unable to verify from google");
    }
  },
};
