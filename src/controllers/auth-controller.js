const GenericResponse = require("../dto/generic-response");
const BadRequest = require("../exceptions/bad-request");
const authService = require("../services/auth-service");
const userService = require("../services/user-service");

module.exports = {
  login: async (req, res, next) => {
    const googleResponse = await authService.verifyTokenOfGoogleSSO(
      req.body.accessToken
    );

    if (googleResponse.hasOwnProperty("error")) {
      next(new BadRequest("Invalid token or credentials"));
    }

    const user = {
      name: googleResponse.data.email.split("@")[0],
      email: googleResponse.data.email,
    };

    const savedUser = await userService.save(user);

    const token = await authService.generateJwtToken({
      userId: savedUser._id,
      email: googleResponse.data.email,
      emailVerified: googleResponse.data.email_verified,
    });

    res.status(200).send(
      new GenericResponse("User has been successfully logged in", {
        token: token,
      })
    );
  },
};
