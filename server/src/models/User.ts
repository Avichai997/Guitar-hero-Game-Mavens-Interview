import { Schema, model } from 'mongoose';

type UserType = {
  username: string;
  steps: number;
  gender: 'male' | 'female';
  userData: {};
};

const userSchema = new Schema<UserType>({
  username: { type: String, required: true },
  steps: { type: Number, required: true },
  gender: { type: String, required: true },
  userData: { type: Object, required: true },
});

const User = model<UserType>('User', userSchema);

export default User;
