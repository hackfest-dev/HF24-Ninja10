import mongoose from 'mongoose';
import dotenv from 'dotenv';

import app from './app.js';

dotenv.config({ path: './config.env' });

const db = process.env.DB_LOCAL;

const PORT = process.env.PORT || 3000;

mongoose
    .connect(db)
    .then((con) => {
        console.log('Connected to DB');
    })
    .catch((err) => {
        console.log('Error connecting to DB');
    });

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
