export const s3Config = {
  bucketName:  'com-fridge-finder',
  region: 'us-east-2',
  accessKeyId: process.env.AWS_ACCESS_KEY as string,
  secretAccessKey: process.env.AWS_SECRET_KEY as string,
  acl: 'public-read'
};

