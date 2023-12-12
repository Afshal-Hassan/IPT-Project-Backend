const express = require("express");
const app = express();
const server = require("http").createServer(app);
const { Server } = require("socket.io");
const cors = require("cors");
const bodyParser = require("body-parser");
const error = require("./middlewares/error-handler");
const rateLimiter = require("./config/rate-limit");

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
app.use(rateLimiter);

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
const authRouter = require("./routes/auth-route");

app.use("", userRouter);
app.use("", messageRouter);
app.use("", friendRouter);
app.use("", privateRoomRouter);
app.use("", authRouter);

app.get("/api/hello", (req, res) => {
  res.send("App Running");
});

const socketRateLimits = new Map();
const MAX_MESSAGES_PER_MINUTE = 3;

io.on("connection", (socket) => {
  const ip = socket.handshake.address;

  // console.log(`User connected: ${socket.id} `);

  socket.on("join-room", (data) => {
    socket.join(data);
  });

  socket.on("send-message", (data) => {
    if (!socketRateLimits.has(ip)) {
      socketRateLimits.set(ip, { count: 1, timestamp: Date.now() });
    } else {
      const limit = socketRateLimits.get(ip);
      const currentTime = Date.now();
      // Reset the count if it's been more than a minute
      if (currentTime - limit.timestamp > 60000) {
        limit.count = 1;
        limit.timestamp = currentTime;
      } else {
        // Check if the count exceeds the limit
        if (limit.count > MAX_MESSAGES_PER_MINUTE) {
          // Too Many Requests error

          socket.to(data.room).emit("error-message", {
            error: "Too Many Requests",
            messageSender: data.messageSender,
          });
          return;
        }

        // Increment the count
        limit.count++;

        socket.to(data.room).emit("receive-message", data);
        const req = {
          body: {
            message: data.message,
            user1Id: data.messageSender,
            user2Id: data.messageReceiver,
          },
        };
        messageController.save(req);
      }
    }
  });
});

const port = process.env.PORT || 3001;

server.listen(port, () => {
  console.log("App listening on port 3001");
});

app.use(error);
