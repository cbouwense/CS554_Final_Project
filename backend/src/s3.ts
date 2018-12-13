import * as aws from 'aws-sdk';
import * as dotenv from 'dotenv';
import * as multer from 'multer';
import * as multerS3 from 'multer-s3';

dotenv.config();

// Configuring the AWS environment
aws.config.update({
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
});

const s3 = new aws.S3();

export const upload = multer({
    storage: multerS3({
        s3,
        bucket: 'mothballs-images',
        metadata: (req, file, cb) => {
            cb(null, {fieldname: file.fieldname});
        },
        key: (req, file, cb) => {
            cb(null, `${Date.now().toString()}.${file.filename.split('.').reverse()[0]}`);
        },
    }),
});

