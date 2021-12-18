const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const authRouter = require("./routes/auth.routes");
const productRouter = require("./routes/product.routes");
const aws = require("./utils/aws-s3.util");
require("dotenv").config();
require("./DBConnection.js")();
aws.awsInit();
app.use(cors());
app.use(express.json());
app.use(morgan("combined"));
// Routes
app.use("/auth", authRouter);
app.use("/product", productRouter);
// Start server
app.listen(process.env.PORT);
