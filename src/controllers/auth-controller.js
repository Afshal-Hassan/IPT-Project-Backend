const GenericResponse = require("../dto/generic-response");
const BadRequest = require("../exceptions/bad-request");
const authService = require("../services/auth-service");
const userService = require("../services/user-service");

module.exports = {
  login: async (req, res, next) => {
    const googleResponse = await authService.verifyTokenOfGoogleSSO(
      req.body.idToken
    );

    if (googleResponse.status === 400) {
      next(new BadRequest("Invalid token or credentials"));
    } else {
      const user = {
        name: googleResponse.data.name,
        email: googleResponse.data.email,
        profilePic: googleResponse.data.picture,
      };

      const savedUser = await userService.save(user);

      const token = await authService.generateJwtToken({
        userId: savedUser._id,
        email: googleResponse.data.email,
        name: googleResponse.data.name,
        profilePic: googleResponse.data.picture,
        emailVerified: googleResponse.data.email_verified,
      });

      res.status(200).send(
        new GenericResponse("User has been successfully logged in", {
          token: token,
        })
      );
    }
  },
};
