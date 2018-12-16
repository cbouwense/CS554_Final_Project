import { connect } from 'amqplib';
import { User } from './models/user';

const queue = 'images';
const respQueue = 'done';

const conn = (async () => {
    const c = await connect(process.env.AMQP_URL);
    c.on('error', console.error);
    return c;
})().catch(console.error);

const chan = (async () => {
    const c = await conn;
    if (!c) throw new Error('no connection');
    const ch = await c.createConfirmChannel();
    ch.on('error', console.error);
    await ch.assertQueue(queue);
    return ch;
})().catch(console.error);

export async function mqpublish(msg) {
    const ch = await chan;
    if (!ch) throw new Error('no channel');
    return await ch.sendToQueue(queue, Buffer.from(JSON.stringify(msg)));
}

export async function listen() {
    const ch = await chan;
    if (!ch) throw new Error('no channel');
    ch.consume(respQueue, (msg) => {
        if (msg != null) {
            console.log(msg.content.toString());
            ch.ack(msg);
            const data = JSON.parse(msg.content.toString());
            if (data.url) {
                User.findOneAndUpdate(
                    { userId: data.userId },
                    { profile_image: data.url },
                    (err, doc) => {
                        if (err) console.error(err);
                        else console.log(`update profile for user ${data.userId}`);
                    },
                );
            } else {
                console.log('unknown message type');
            }
        }
    });
}
