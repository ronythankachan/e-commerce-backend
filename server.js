const express = require("express");
const app = express();
const cors = require("cors");
const authRouter = require("./routes/auth.routes");
const productRouter = require("./routes/product.routes");
require("dotenv").config();
require("./DBConnection.js")();
app.use(cors());
app.use(express.json());
// Routes
app.use("/auth", authRouter);
app.use("/product", productRouter);
// Start server
app.listen(process.env.PORT);
