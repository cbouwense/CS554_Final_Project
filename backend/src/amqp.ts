import { connect } from 'amqplib';

const queue = 'images';

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
