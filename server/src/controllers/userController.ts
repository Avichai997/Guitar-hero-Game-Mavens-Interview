import { Request, Response } from 'express';
import axios from 'axios';
import User from '../models/User';

// Define the request body types for each controller
interface AddUserRequestBody {
  username: string;
  steps: number;
}

interface SetScoreRequestBody {
  username: string;
  success: boolean;
}

export const addUser = async (
  req: Request<{}, {}, AddUserRequestBody>,
  res: Response
) => {
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
    console.error('Error adding user:', error);
    res.status(500).json({ error: 'Failed to add user' });
  }
};

export const getUsers = async (_req: Request, res: Response) => {
  try {
    const users = await User.find().sort({ steps: -1 });
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

export const setScore = async (
  req: Request<{}, {}, SetScoreRequestBody>,
  res: Response
) => {
  const { username, success } = req.body;

  if (!username || typeof success !== 'boolean') {
    return res.status(400).send('Invalid data');
  }

  try {
    // Find the user by username
    let user = await User.findOne({ username });

    if (!user) {
      return res.status(404).send('User not found');
    }

    if (success) {
      user.steps += 1;
    }

    await user.save();

    res.send(user);
  } catch (error) {
    console.error('Error setting score:', error);
    res.status(500).json({ error: 'Failed to set score' });
  }
};
