interface UserInterface {
  _id?: string;
  credit:number
  verified:boolean;
  isAdmin: boolean;
  email: string;
  password: string;
}

export type LoginInterface = Pick<UserInterface, "email" | "password">;

export default UserInterface;
