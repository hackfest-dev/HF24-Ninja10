import express from 'express';
import helmet from 'helmet';
import mongoSantize from 'express-mongo-sanitize';

const app = express();

// set security http header
app.use(helmet());

// data santiziation against nosql injection
app.use(mongoSantize());

// middlewares
app.use(express.json());

export default app;
