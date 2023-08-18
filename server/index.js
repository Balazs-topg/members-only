const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const accountModel = require("./models/accountModel");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGODB_URI).then(console.log("connected"));

//check if server is running
app.get("/server-check", (req, res) => {
  console.log("server-check CALLED");
  res.sendStatus(200);
});

app.post("/sign-up", async (req, res) => {
  console.log("handling sign-up");

  const signUpData = req.body.formData;

  // Check if the username is already taken
  const existingUser = await accountModel.findOne({
    username: signUpData.username,
  });
  if (existingUser) {
    return res.status(400).json({ error: "username is taken" });
  }

  // serversided validation is non-existant atm

  const signUpDataToModel = new accountModel(signUpData);
  const result = await signUpDataToModel.save();

  // im only using setTimeout to simulate a long response time for the frontend
  setTimeout(() => {
    res.send("valid");
  }, 0);
});

const server = http.createServer(app);
const port = process.env.PORT;
server.listen(port, () => {
  console.log(`SERVER IS RUNNING ON http://localhost:${port}/`);
});
