// tslint:disable: max-line-length
import * as mongoose from 'mongoose';
import { Exercise } from './src/models/exercise';

mongoose.connect('mongodb://localhost/mothballs', { useNewUrlParser: true })
    .then(() => console.log('[seed.js] [mongoose]: connection successful'))
    .catch(err => console.log(`[seed.js] [mongoose]: ${err}`));

async function main() {
    try {
        await Exercise.deleteMany({});

        const e1 = new Exercise({
            name: 'Standing Dumbell Upright Row',
            description: 'Grasp a dumbbell in each hand with a pronated (palms forward) grip that is slightly less than shoulder width. The dumbbells should be resting on top of your thighs. Your arms should be extended with a slight bend at the elbows and your back should be straight. This will be your starting position.',
            images: ['http://thisisaurl.com', 'http://thisisanother.gov'],
            bodyparts_worked: ['traps'],
            equipment: ['dumbell'],
        }).save();

        const e2 = new Exercise({
            name: 'Tricep Dips',
            description: 'Now, inhale and slowly lower yourself downward. Your torso should remain upright and your elbows should stay close to your body. This helps to better focus on tricep involvement. Lower yourself until there is a 90 degree angle formed between the upper arm and forearm.',
            images: ['http://hello.com/image.jpeg', 'http://goodbye.gov/image.png'],
            bodyparts_worked: ['Triceps'],
            equipment: ['body only'],
        }).save();

        const e3 = new Exercise({
            name: 'Barbell Full Squat',
            description: ' Begin to slowly lower the bar by bending the knees and sitting back with your hips as you maintain a straight posture with the head up. Continue down until your hamstrings are on your calves. Inhale as you perform this portion of the movement.',
            images: ['http://hello.com/image.jpeg', 'http://goodbye.gov/image.png'],
            bodyparts_worked: ['Quadriceps'],
            equipment: ['barbell'],
        }).save();

        const e4 = new Exercise({
            name: 'Standing Cable Lift',
            description: 'In one motion, pull the handle up and across your body until your arms are in a fully-extended position above your head.',
            images: ['http://hello.com/image.jpeg', 'http://goodbye.gov/image.png'],
            bodyparts_worked: ['Abdominals'],
            equipment: ['cable'],
        }).save();

        const e5 = new Exercise({
            name: 'Barbell Deadlift',
            description: 'With your feet and your grip set, take a big breath and then lower your hips and flex the knees until your shins contact the bar. Look forward with your head. Keep your chest up and your back arched, and begin driving through the heels to move the weight upward. ',
            images: ['http://hello.com/image.jpeg', 'http://goodbye.gov/image.png'],
            bodyparts_worked: ['Triceps'],
            equipment: ['barbell'],
        }).save();

        const e6 = new Exercise({
            name: 'Push Press',
            description: 'Use the floor-to-shoulder lifting technique described in the Power Clean exercise to move the bar from the floor to the shoulders.',
            images: ['http://hello.com/image.jpeg', 'http://goodbye.gov/image.png'],
            bodyparts_worked: ['Shoulders'],
            equipment: ['barbell'],
        }).save();

        const e7 = new Exercise({
            name: 'Romanian Deadlift with Dumbells',
            description: 'Initiate the movement by flexing your hips, slowly pushing your butt as far back as you can. This should entail a horizontal movement of the hips, rather than a downward movement. The knees should only partially bend, and your weight should remain on your heels.',
            images: ['http://hello.com/image.jpeg', 'http://goodbye.gov/image.png'],
            bodyparts_worked: ['Hamstrings'],
            equipment: ['dumbell'],
        }).save();

        const e8 = new Exercise({
            name: 'Wrist Rotations with Straight Bar',
            description: 'Alternating between each of your hands, perform the movement by extending the wrist as though you were rolling up a newspaper. Continue alternating back and forth until failure. ',
            images: ['http://hello.com/image.jpeg', 'http://goodbye.gov/image.png'],
            bodyparts_worked: ['Triceps'],
            equipment: ['barbell'],
        }).save();

        const e9 = new Exercise({
            name: 'Incline Hammer Curls',
            description: 'Initiate the movement by flexing at the elbow, attempting to keep the upper arm stationary.',
            images: ['http://hello.com/image.jpeg', 'http://goodbye.gov/image.png'],
            bodyparts_worked: ['Biceps'],
            equipment: ['dumbell'],
        }).save();

        const e10 = new Exercise({
            name: 'Rickshaw Carry',
            description: 'Immediately begin walking briskly with quick, controlled steps. Keep your chest up and head forward, and make sure you continue breathing. Bring the frame to the ground after you have reached the end point. ',
            images: ['http://hello.com/image.jpeg', 'http://goodbye.gov/image.png'],
            bodyparts_worked: ['Forearms'],
            equipment: ['...other?'],
        }).save();

        console.log(await Promise.all([e1, e2, e3, e4, e5, e6, e7, e8, e9, e10]));

        await mongoose.disconnect();

        console.log('[seed.js] database seeded');
    } catch (e) {
        console.error('something went wrong');
        console.error(e);
    }
}

main();
