import type { Request, Response } from "express"
import { findUserCredentials, addUserCredentials } from "../models/user.ts"

interface userInfoProp {
    username: string;
    password: string;
}

export function userLogin(req: Request, res: Response): void
{
    try 
    {
        const { username, password }: userInfoProp = req.body
        const id: number = findUserCredentials(username, password)
        res.send({ message: "User successfully logged in.", id })
    }
    catch (e)
    {
        res.status(400).json({ message: (e as Error).message })
    }
}

export function userRegister(req: Request, res: Response): void
{
    try 
    {
        const { username, password }: userInfoProp = req.body
        const id: number = addUserCredentials(username, password)
        res.send({ message: "User successfully registered.", id })
    }
    catch (e)
    {
        res.status(400).json({ message: (e as Error).message })
    }
}