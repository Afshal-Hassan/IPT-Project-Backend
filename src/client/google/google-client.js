const axios = require("axios");
const BadRequest = require("../../exceptions/bad-request");

module.exports = {
  verifyTokenFromGoogle: async (accessToken) => {
    try {
      const response = await axios({
        method: "GET",
        url:
          "https://oauth2.googleapis.com/tokeninfo?scope=email&access_token=" +
          accessToken,
      });

      return response;
    } catch (error) {
      return new BadRequest("Unable to verify from google");
    }
  },
};
