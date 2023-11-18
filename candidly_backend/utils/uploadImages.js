// const { S3 } = require("aws-sdk");
const {S3Client, PutObjectCommand} = require("@aws-sdk/client-s3");
const uuid = require("uuid").v4;

async function awsUploadS3Client(files) {
    const s3Client = new S3Client({});
    const bucketName = process.env.AWS_BUCKET_NAME;
  
    const uploadUrls = [];
  
    for (const file of files) {
      const params = {
        Bucket: bucketName,
        Key: `uploads/${uuid()}_${file.originalname}`,
        Body: file.buffer,
      };
  
      try {
        await s3Client.send(new PutObjectCommand(params));
        const encodedFileName = encodeURIComponent(params.Key);
        const url = `https://${bucketName}.s3.af-south-1.amazonaws.com/${encodedFileName}`;
        uploadUrls.push(url);
      } catch (error) {
        console.error("Error uploading file: ", error);
      }
    }
  
    return uploadUrls;
  }
  

module.exports = {
    // awsUpload,
    awsUploadS3Client
};