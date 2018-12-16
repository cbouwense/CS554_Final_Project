import { Channel, connect } from 'amqplib';
import * as aws from 'aws-sdk';
import * as dotenv from 'dotenv';
import * as gm from 'gm';
import { basename } from 'path';
import * as request from 'request';
import { PassThrough } from 'stream';

dotenv.config();

// Configuring the AWS environment
aws.config.update({
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
});

const s3 = new aws.S3();

const queue = 'images';
const respQueue = 'done';

const conn = (async () => {
    const c = await connect(process.env.AMQP_URL);
    c.on('error', console.error);
    return c;
})().catch(console.error);

(async () => {
    const c = await conn;
    if (!c) throw new Error('no connection');
    const ch = await c.createChannel();
    ch.on('error', console.error);
    await ch.assertQueue(queue);
    await ch.assertQueue(respQueue);
    ch.consume(queue, (msg) => {
        if (msg != null) {
            console.log(msg.content.toString());
            ch.ack(msg);
            const data = JSON.parse(msg.content.toString());
            if (data.url) {
                consume(ch, data).catch(console.error);
            } else {
                console.log('unknown message type');
            }
        }
    });
})().catch(console.error);

// tslint:disable-next-line: no-shadowed-variable
function uploadFromStream(s3: aws.S3, filename: string, userId: string, ch: Channel) {
    const pass = new PassThrough();

    s3.upload(
        {
            Bucket: 'mothballs-images',
            Key: `resized-images/${filename}`,
            Body: pass,
        },
        (err, data) => {
            console.log(err, data);
            if (!err) {
                ch.sendToQueue(respQueue, Buffer.from(JSON.stringify(
                    {
                        userId,
                        url: data.Location,
                    },
                )));
            }
        },
    );

    return pass;
}

async function consume(ch: Channel, { url, userId }: { url: string, userId: string }) {
    try {
        gm(request(url) as any)
            .resize(200, 200)
            .stream()
            .pipe(uploadFromStream(s3, basename(url), userId, ch));
    } catch (err) {
        console.error(err);
    }
}
