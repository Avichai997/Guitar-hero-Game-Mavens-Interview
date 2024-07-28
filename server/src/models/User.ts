import { Schema, model } from 'mongoose';

export interface UserType {
  username: string;
  steps: number;
  gender: 'male' | 'female' | 'undetermined';
  userData: Record<string, any>;
}

const userSchema = new Schema<UserType>({
  username: { type: String, required: true },
  steps: { type: Number, required: true, default: 0 },
  gender: { type: String, required: true, default: 'undetermined' },
  userData: { type: Object, required: true, default: {} },
});

const User = model<UserType>('User', userSchema);

export default User;
