const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 4040;
require("dotenv").config();
const connectDB = require("./db/db");
const { errorHandler } = require("./middlewares/errorMiddleware");
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());

app.use("/users", require("./router/usersRouter"));

// errors going to error handler after calling next(error) in controller or throwing error with throw new Error()
app.use(errorHandler);

connectDB().then(() => {
  app.listen(port, () => console.log(`listening on port ${port}`));
});
