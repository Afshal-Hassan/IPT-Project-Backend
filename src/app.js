const express = require("express");
const app = express();
const server = require("http").createServer(app);
const { Server } = require("socket.io");
const cors = require("cors");
const bodyParser = require("body-parser");
const error = require("./middlewares/error-handler");

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

//  ************        Environment variables configuration     **************

require("dotenv").config();

//  **********      Database Connected         **********

require("./db/conn");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "*", // allow requests from this domain
  })
);

//  **************           All Routes         ***************

const userRouter = require("./routes/user-route");
const messageRouter = require("./routes/message-route");
const friendRouter = require("./routes/friend-route");
const privateRoomRouter = require("./routes/private-room-route");
const messageController = require("./controllers/message-controller");

app.use("", userRouter);
app.use("", messageRouter);
app.use("", friendRouter);
app.use("", privateRoomRouter);

app.get("/api/hello", (req, res) => {
  res.send("App Running");
});

io.on("connection", (socket) => {
  // console.log(`User connected: ${socket.id} `);

  socket.on("join-room", (data) => {
    socket.join(data);
  });

  socket.on("send-message", (data) => {
    socket.to(data.room).emit("receive-message", data);
    const req = {
      body: {
        message: data.message,
        user1Id: data.messageSender,
        user2Id: data.messageReceiver,
      },
    };
    messageController.save(req);
  });
});

const port = process.env.PORT || 3001;

server.listen(port, () => {
  console.log("App listening on port 3001");
});

app.use(error);
