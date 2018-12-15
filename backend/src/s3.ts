import * as aws from 'aws-sdk';
import * as multer from 'multer';
import * as multerS3 from 'multer-s3';

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
            cb(null, { fieldname: file.fieldname });
        },
        key: (req, file, cb) => {
            console.log(file);
            console.log(req.file);
            // Store images in different S3 folders based on origin
            let s3Folder = '';
            if (file.fieldname === 'profile_image_upload') {
                s3Folder = 'user-profile/';
            }
            const imageExt = file.originalname.split('.').reverse()[0];
            cb(null, `${s3Folder}${Date.now().toString()}.${imageExt}`);
        },
    }),
});
