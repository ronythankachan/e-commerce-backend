const AWS = require("aws-sdk");

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});
const params = {
  Bucket: process.env.S3_BUCKET_NAME,
  CreateBucketConfiguration: {
    LocationConstraint: "eu-west-1",
  },
};

const awsInit = () => {
  s3.createBucket(params, (err, data) => {
    if (err && err.statusCode == 409) console.log("Bucket already exists");
    else if (err) console.log(err);
    else console.log("Bucket Created Successfully", data.Location);
  });
};

const uploadFile = (file) => {
  // Setting up S3 upload parameters
  const params = {
    Bucket: BUCKET_NAME,
    Key: "cat.jpg", // File name you want to save as in S3
    Body: fileContent,
  };

  // Uploading files to the bucket
  s3.upload(params, function (err, data) {
    if (err) {
      throw err;
    }
    console.log(`File uploaded successfully. ${data.Location}`);
  });
};

module.exports = {
  awsInit,
  uploadFile,
};
