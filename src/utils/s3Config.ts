export const s3Config = {
  bucketName:  'com-fridge-finder',
  region: 'us-east-2',
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  acl: 'public-read'
};

