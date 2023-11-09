// const { S3 } = require("aws-sdk");
const {S3Client, PutObjectCommand} = require("@aws-sdk/client-s3");
const uuid = require("uuid").v4;

// async function awsUpload(files) {
//     const s3 = new S3({})

//     // const param = {
//     //     Bucket: process.env.AWS_BUCKET_NAME,
//     //     Key: `uploads/${uuid()}_${files.originalname}`,
//     //     Body: files.buffer,
//     // }

//     const params = files.map(file => {
//         return {
//             Bucket: process.env.AWS_BUCKET_NAME,
//             Key: `uploads/${uuid()}_${file.originalname}`,
//             Body: file.buffer,
//         }
//     })
//     // return await s3.upload(params).promise()
//     return await Promise.all(params.map(param => s3.upload(param).promise()))
// };

// async function awsUploadS3Client(files) {
//     const s3Client = new S3Client({})
//     const bucketName = process.env.AWS_BUCKET_NAME

//     const params = files.map(file => {
//         return {
//             Bucket: bucketName,
//             Key: `uploads/${uuid()}_${file.originalname}`,
//             Body: file.buffer,
//         }
//     })
//     // return `https://${bucketName}.s3.af-south-1.amazonaws.com/uploads/${encodedFileName}`

//     const upload = await Promise.all(params.map(param => s3Client.send(new PutObjectCommand(param))))

//     return `https://${bucketName}.s3.af-south-1.amazonaws.com/uploads/c13249bc-5dc7-434d-b5a5-d72ac3a792c3_Screenshot+(1).png`

// }

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
        console.error("Error uploading file:", error);
      }
    }
  
    return uploadUrls;
  }
  

module.exports = {
    // awsUpload,
    awsUploadS3Client
};