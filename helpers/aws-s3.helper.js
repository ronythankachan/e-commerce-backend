const AWS = require("aws-sdk");
const fs = require("fs").promises;
require("dotenv").config();
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
});

const uploadFile = async (file) => {
  const params = {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: file.filename,
    Body: await fs.readFile(file.path),
  };
  return await s3.upload(params).promise();
};
module.exports = {
  uploadFile,
};
