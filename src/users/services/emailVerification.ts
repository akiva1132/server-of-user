import { handleError } from "../../utils/handleErrors";
import UserInterface from "../interfaces/UserInterface";
import { Request, Response, NextFunction, json } from "express";
import userValidation from "../models/joi/userValidation";
import { getUserByEmail } from "./usersApiService";
import { getCollectionFromJsonFile, modifyCollection } from "../../dataAccessLayer/jsonfileDAL";
import jsonfile from "jsonfile";
import path from "path";
const filePath = path.join(__dirname, "../../../DB/usersAndCodes.json");

export const emailVerification = async (req: Request, res: Response) => {
    const email = req.body.email
    const { code } = req.params;
    const data: Record<string, Record<string, string>[]> = jsonfile.readFileSync(filePath)
    const userFromJson = data.users.find(user => { return user.email === email });
    if (userFromJson?.code !== code){
        res.status(401).send("Incorrect password")
        return
    }
    const userForUpdate = await getUserByEmail(email);
    userForUpdate.verified = true
    try {
        const users = await getCollectionFromJsonFile("users");
        if (users instanceof Error)
            throw new Error("Oops... Could not get the users from the Database");
        const index = users.findIndex((user) => user.email === email);
        if (index === -1){
            res.status(401).send("Incorrect password")
            throw new Error("Could not find user with this ID!");
        }
        const usersCopy = [...users];
        const userToUpdate = { ...usersCopy[index], ...userForUpdate };
        usersCopy[index] = userToUpdate;
        const data = await modifyCollection("users", usersCopy);
        if (!data) throw new Error("User authenticated but we were unable to update the system");
        res.status(201).send("authenticated user")
    } catch (error) {
        res.status(401).send(Promise.reject(error))
    }
}

