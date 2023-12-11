const userService = require("../services/user-service")


module.exports = {

    save: async (req, res, next) => {
        return userService.save(req, res, next);
    }
}