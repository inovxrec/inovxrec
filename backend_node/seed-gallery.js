require('dotenv').config();
const mongoose = require('mongoose');
const Gallery = require('./models/Gallery');

const seedGallery = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to DB');

        const count = await Gallery.countDocuments();
        if (count === 0) {
            await Gallery.create([
                { title: 'Inauguration', image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87', category: 'Events' },
                { title: 'Hackathon 2024', image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d', category: 'Hackathon' }
            ]);
            console.log('Seeded gallery');
        } else {
            console.log('Gallery already has items');
        }
        process.exit(0);
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
};

seedGallery();
