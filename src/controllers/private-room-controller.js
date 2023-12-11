const privateRoomService = require("../services/private-room-service");

module.exports = {
  save: async (req, res, next) => {
    return privateRoomService.save(req, res, next);
  },

  get: async (req, res, next) => {
    return privateRoomService.get(req, res, next);
  },
};
