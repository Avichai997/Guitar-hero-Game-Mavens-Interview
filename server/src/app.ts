import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import userRoutes from './routes/userRoutes';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/health', (_req, res) => res.status(200).json('Server OK'));

const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27018/mavens';

mongoose.connect(mongoUri);

mongoose.connection
  .on('connected', () => {
    console.log('DB connection successful!', '\x1b[0m');
  })
  .on('error', (err) => {
    console.error('DB connection error:', err);
    throw new Error('DB connection error:');
  });

export default app;
