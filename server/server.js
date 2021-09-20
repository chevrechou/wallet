let express = require("express");
let mongoose = require("mongoose");
let cors = require("cors");
let bodyParser = require("body-parser");
var dotenv = require("dotenv");
dotenv.config();

const userRoute = require("../server/routes/userRoutes");
const uri =process.env.MONGOLAB_URI;


mongoose.Promise = global.Promise;
mongoose
  .connect(uri, {
    useNewUrlParser: true,
  })
  .then(
    () => {
      console.log("Database connected sucessfully !");
    },
    (error) => {
      console.log("Database could not be connected : " + error);
    }
  );

const app = express();
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(cors());

app.use("/users", userRoute);

app.use("/login", (req, res) => {
  res.send({
    token: "test123",
  });
});
app.use("/logout", (req, res) => {
  res.send({
    token: "",
  });
});

const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
  console.log("Connected to port " + port);
});

// Error Handling
app.use((req, res, next) => {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});
