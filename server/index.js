const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 4040;
require("dotenv").config();
const connectDB = require("./config/db");
const {errorHandler} = require('./middlewares/errorMiddleware')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

connectDB();

app.use("/users", require("./router/usersRouter"));
// app.use("/products", require("./routes/jobsRoutes"));
console.log('HERE');
app.use(errorHandler);

app.listen(port, () => console.log(`listening on port ${port}`));