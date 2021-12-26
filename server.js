const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const authRouter = require("./routes/auth.routes");
const productRouter = require("./routes/product.routes");
const categoryRouter = require("./routes/category.routes");
const aws = require("./helpers/aws-s3.helper");
require("dotenv").config();
require("./DBConnection.js")();
app.use(cors());
app.use(express.json());
app.use(morgan("combined"));
// Routes
app.use("/auth", authRouter);
app.use("/product", productRouter);
app.use("/category", categoryRouter);
// Start server
app.listen(process.env.PORT);

