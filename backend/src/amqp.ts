import { connect } from 'amqplib';
import { Server } from 'socket.io';
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

export async function listen(io: Server) {
    const ch = await chan;
    if (!ch) throw new Error('no channel');
    ch.consume(respQueue, async (msg) => {
        if (msg != null) {
            console.log(msg.content.toString());
            ch.ack(msg);
            const data = JSON.parse(msg.content.toString());
            if (data.url) {
                try {
                    const res = await User.findOneAndUpdate(
                        { _id: data.userId },
                        { profile_image: data.url },
                    );
                    if (!res) throw new Error('no such user');
                    console.log(`updated profile for user ${data.userId} - ${data.url}`, res);
                    io.emit('update');
                } catch (err) {
                    console.error(err);
                }
            } else {
                console.log('unknown message type');
            }
        }
    });
}
