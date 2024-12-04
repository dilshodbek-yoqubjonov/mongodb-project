const express = require("express");
const mongo = require("./config/mongoose.config");
const router = require("./routes");

const app = express();
app.use(express.json());

app.use(router);

mongo()
  .then(() => {
    console.log("Connected to mongo");
  })
  .catch((err) => {
    console.log("ERROR", err);
  });

app.listen(9000, () => {
  console.log(9000);
});
