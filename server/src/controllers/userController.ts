import { Request, Response } from 'express';
import axios from 'axios';
import User from '../models/User';

export const addUser = async (req: Request, res: Response) => {
  const { username, steps } = req.body;

  try {
    const genderRes = await axios.get(
      `https://api.genderize.io?name=${username}`
    );
    const gender =
      genderRes.data.probability > 0.95
        ? genderRes.data.gender
        : 'undetermined';

    const userDataRes = await axios.get(
      `https://randomuser.me/api/?gender=${gender}`
    );
    const userData = userDataRes.data.results[0];

    const user = new User({ username, steps, gender, userData });
    await user.save();

    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add user' });
  }
};

export const getUsers = async (_req: Request, res: Response) => {
  try {
    const users = await User.find().sort({ steps: -1 });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};
