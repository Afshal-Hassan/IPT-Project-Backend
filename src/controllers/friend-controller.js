const friendService = require("../services/friend-service");

module.exports = {
  save: async (req, res, next) => {
    return friendService.save(req, res, next);
  },

  getAll: async (req, res, next) => {
    return friendService.getAll(req, res, next);
  },
};
