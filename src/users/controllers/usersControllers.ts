import UserInterface from "../interfaces/UserInterface";
import {
  getUsers,
  getUser,
  register,
  editUser,
  deleteUser,
  login,
} from "../services/usersApiService";
import { saveOrder } from "../../orders/SaveOrder";
import { orderVerification } from "../../PayPal/orderVerification";
import { handleError } from "../../utils/handleErrors";
import userValidation from "../models/joi/userValidation";
import { Request, Response } from "express";
import { UserRequest } from "../../auth/providers/jwt";

interface User{
  _id: string,
  isAdmin: boolean,
  iat: number
}
declare global {
    namespace Express {
        interface Request {
            user: User;
        }
    }
}

export const checkOrder = async (req: Request, res: Response)=>{
  const {orderId} = req.params
  console.log("dfd");
  
  try{
    const order = await orderVerification(orderId)
    console.log(order, req.body);
    const resFromSaveOrder = await saveOrder(order, req.body)
    res.status(201).send(resFromSaveOrder)
  }catch (error){
    res.status(400).send(error)
  }
}

export const handleGetUsers = async (req: Request, res: Response) => {
  try {
    const reqUser = req as UserRequest;
    const { isAdmin } = reqUser.user;
    if (!isAdmin)
      throw new Error(
        "You must be an admin type user in order to get all the users"
      );

    const users = await getUsers();
    return res.send(users);
  } catch (error) {
    if (error instanceof Error && error.message.match(/You must be/g))
      return handleError(res, error, 403);
    if (error instanceof Error) return handleError(res, error);
  }
};
export const orderProcessing = () =>{

}
export const handleGetUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const reqUser = req as UserRequest;
    const { isAdmin, _id: userId } = reqUser.user;
    if (!isAdmin && userId !== id)
      throw new Error(
        "You must be an admin type user or the registered user in order to get this user information"
      );

    const user = await getUser(id);
    return res.send(user);
  } catch (error) {
    if (error instanceof Error && error.message.match(/You must be/g))
      return handleError(res, error, 403);
    if (error instanceof Error) return handleError(res, error);
  }
};

export const handleUserRegistration = async (req: Request, res: Response) => {
  try {
    const user: UserInterface = req.body;

    const { error } = userValidation(user);
    if (error?.details[0].message) throw new Error(error?.details[0].message);

    const userFromDB = await register(user);
    return res.status(201).send(userFromDB);
  } catch (error) {
    if (error instanceof Error) handleError(res, error);
  }
};

export const handleEditUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const reqUser = req as UserRequest;
    const { _id: userId } = reqUser.user;
    if (userId !== id)
      throw new Error(
        "You must be the registered user in order to update his details"
      );

    const user: UserInterface = req.body;

    const { error } = userValidation(user);
    if (error?.details[0].message) throw new Error(error?.details[0].message);

    const userFromDB = await editUser(id, user);
    return res.send(userFromDB);
  } catch (error) {
    if (error instanceof Error && error.message.match(/You must be/g))
      return handleError(res, error, 403);
    if (error instanceof Error) return handleError(res, error);
  }
};

export const handleDeleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const reqUser = req as UserRequest;
    const { _id: userId, isAdmin } = reqUser.user;
    if (userId !== id && !isAdmin)
      throw new Error(
        "You must be a user type admin or the registered user in order to update his details"
      );

    const user = await deleteUser(id);
    return res.send(user);
  } catch (error) {
    if (error instanceof Error && error.message.match(/You must be/g))
      return handleError(res, error, 403);
    if (error instanceof Error) return handleError(res, error);
  }
};

export const handleLogin = async (req: Request, res: Response) => {
  try {
    const userFromClient: UserInterface = req.body;

    const { error } = userValidation(userFromClient);
    if (error?.details[0].message) throw new Error(error?.details[0].message);

    const token = await login(userFromClient);
    return res.send(token);
  } catch (error) {
    if (error instanceof Error) return handleError(res, error, 401);
  }
};

