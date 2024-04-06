import express from 'express';
import helmet from 'helmet';
import mongoSantize from 'express-mongo-sanitize';

// importing routes
import appointmentRouter from './router/appointementRouter.js';
import doctorRouter from './router/doctorRouter.js';
import equipmentRouter from './router/equipmentRouter.js';
import userRouter from './router/userRouter.js';

const app = express();

// set security http header
app.use(helmet());

// data santiziation against nosql injection
app.use(mongoSantize());

// middlewares
app.use(express.json());

// route setup
app.use('/api/user', userRouter);
app.use('/api/equipment', equipmentRouter);
app.use('/api/doctor', doctorRouter);
app.use('/api/appointment', appointmentRouter);

export default app;
