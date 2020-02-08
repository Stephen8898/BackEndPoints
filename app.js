const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const config = require("./config/database");

const news = require("./routes/newapi");
const comment = require("./routes/comment");
const app = express();

//connect to mongodb
mongoose.connect(config.database, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
});

mongoose.connection.on("connected", () =>{
  console.log("Mongo on!");
});

//Enviromental var
dotenv.config();

// app.use(express.static(path.join(_dirname, "client/build")));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(cors());

//routes
app.use("/api", news);
app.use("/api/comment", comment);

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`app listening on ${PORT}`);
});
