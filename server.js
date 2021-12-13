const express = require("express");
const app = express();
const authRouter = require("./routes/auth.routes");
const connectDB = require("./DBConnection.js");
//Configure environment variable file
require("dotenv").config();
// Connect to mongodb
connectDB();
// Setup middleware to parse request as json
app.use(express.json());
// Hanlde Routes
app.post("/login", authRouter);
app.post("/token", authRouter);
app.get("/posts", authRouter);
app.post("/signup", authRouter);
// Start the server
app.listen(process.env.PORT);
