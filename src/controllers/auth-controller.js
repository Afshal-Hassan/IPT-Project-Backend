const authService = require("../services/auth-service");

module.exports = {
  login: async (req, res, next) => {
    const googleResponse = await authService.verifyTokenOfGoogleSSO(
      req.body.accessToken
    );
    const token = await authService.generateJwtToken({
      email: googleResponse.data.email,
      emailVerified: googleResponse.data.email_verified,
      exp: googleResponse.data.exp,
      expiresIn: googleResponse.data.expires_in,
    });
    const response = await authService.extractUserDetailsFromToken(token);
  },
};
