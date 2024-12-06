import { Types } from 'mongoose';
import { TUser } from '../../../../types/types';
import UserModel from '../../models/User';

export async function getUserByID(id: any) {
  const user: TUser | null = await UserModel.findById({
    _id: id,
  });
  return user;
}
