export const s3Config = {
  bucketName:  'com-fridge-finder',
  region: 'us-east-2',
  accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
  acl: 'public-read'
};

