import { UserModel } from './users';
export class Chat {
  constructor(
    public sender: string,
    public reciver: string,
    public message: string
  ) {}
};
