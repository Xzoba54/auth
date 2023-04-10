require("dotenv").config();
require("./helpers/db.js");

const express = require("express");
const app = express();

const cors = require("cors");
const cookieParser = require("cookie-parser");

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());

const AuthRoute = require("./routes/auth.route.js");
app.use("/api/v1/auth", AuthRoute);

const UserRoute = require("./routes/user.route.js");
app.use("/api/v1/user", UserRoute);

app.listen(process.env.PORT, () => {
  console.log(`server listening on port ${process.env.PORT}`);
});
