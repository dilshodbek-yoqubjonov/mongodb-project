// imports temporary package
const express = require("express");
const mongo = require("./config/mongoose.config");
const router = require("./routes");

// app
const app = express();
app.use(express.json());

app.use(router);

// mongoose connection
mongo()
  .then(() => {
    console.log("Connected to mongo");
  })
  .catch((err) => {
    console.log("ERROR", err);
  });

// server listen port
app.listen(9000, () => {
  console.log(9000);
});
