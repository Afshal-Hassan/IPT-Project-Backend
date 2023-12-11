const messageService = require("../services/message-service");

module.exports = {
  save: async (req) => {
    return messageService.save(req);
  },

  getAll: async (req, res, next) => {
    return messageService.getAll(req, res, next);
  },
};
