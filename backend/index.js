const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb" }));

const { createServer } = require("http");
const server = createServer(app);
const socketIo = require("socket.io");
const io = socketIo(server, {
  cors: {
    origin: "*",
  },
});

app.use((req, res, next) => {
  req.io = io;
  return next();
});

const bodyParser = require("body-parser");
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use("/tracker/post", require("./Routes/Post"));
app.use("/tracker/read", require("./Routes/Read"));
app.use("/tracker/update", require("./Routes/Update"));
app.use("/tracker/readclient", require("./Routes/ReadClient"));

const connectDB = require("./config/Connection");

require("dotenv").config();
connectDB();

let onlineuser = [];

const addNewUser = (codeAgent, nom, socketId) => {
  !onlineuser.some((user) => user.codeAgent === codeAgent) &&
    onlineuser.push({
      codeAgent,
      nom,
      socketId,
    });
};
const removeUser = (socketId) => {
  if (onlineuser.length > 0) {
    onlineuser = onlineuser.filter((user) => user.socketId !== socketId);
  }
};
io.on("connection", (socket) => {
  socket.on("newUser", (donner) => {
    const { codeAgent, nom } = donner;
    addNewUser(codeAgent, nom, socket.id);
    io.emit("userConnected", onlineuser);
  });

  socket.on("disconnect", () => {
    removeUser(socket.id);
    io.emit("userConnected", onlineuser);
  });
});

const port = process.env.PORT || 4000;
server.listen(port, () => {
  console.log("listening on " + port);
});
