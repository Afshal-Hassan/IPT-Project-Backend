const Message = require("../models/message");
const GenericResponse = require("../dto/generic-response");
const BadRequest = require("../exceptions/bad-request");

module.exports = {
  save: async (req) => {
    try {
      const body = {
        senderId: req.body.user1Id,
        receiverId: req.body.user2Id,
        message: req.body.message,
      };
      const message = new Message(body);
      const newMessage = await message.save();

      return;
      new GenericResponse("Message has been saved successfully", newMessage);
    } catch (error) {
      console.log(error);
      return new BadRequest(error);
    }
  },

  getAll: async (req, res, next) => {
    try {
      const user1Id = req.body.user1Id;
      const user2Id = req.body.user2Id;

      const messages = await Message.find({
        $or: [
          {
            senderId: user1Id,
          },
          {
            senderId: user2Id,
          },
          {
            receiverId: user1Id,
          },
          {
            receiverId: user2Id,
          },
        ],
      });

      return res
        .status(200)
        .send(
          new GenericResponse(
            "List of all messages for provided users: ",
            messages
          )
        );
    } catch (error) {
      next(new BadRequest(error));
    }
  },
};
