const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT || 5000;
const patientRouter = require('./server/routes/patient')
const { connectDb } = require("./config/database");

const app = express();

//Database connection
connectDb();

//middleware
//view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//routes
app.use("/", patientRouter);

//start server
app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});

module.exports = app;
