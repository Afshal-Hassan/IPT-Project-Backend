const axios = require("axios");
const BadRequest = require("../../exceptions/bad-request");

module.exports = {
  verifyTokenFromGoogle: async (accessToken) => {
    try {
      const response = await axios({
        method: "GET",
        url: "https://www.googleapis.com/oauth2/v2/userinfo",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      return response;
    } catch (error) {
      return new BadRequest("Unable to verify from google");
    }
  },
};
