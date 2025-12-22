import type { Request, Response } from "express"
import { type user, userCredentialsValidate, userCredentialsAdd, userCredentialsFind  } from "../models/user.ts"

interface userInfoProp {
    username: string;
    password: string;
}

export function userLogin(req: Request, res: Response): void
{
    try 
    {
        const { username, password }: userInfoProp = req.body
        const id: number = userCredentialsValidate(username, password)
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
        const id: number = userCredentialsAdd(username, password)
        res.send({ message: "User successfully registered.", id })
    }
    catch (e)
    {
        res.status(400).json({ message: (e as Error).message })
    }
}

export function userFind(req: Request, res: Response): void
{
    try 
    {
        const { username, password }: userInfoProp = req.body
        const userInfo: user | null = userCredentialsFind(username) // TODO: Might not want directly use password
        if (userInfo === null)
        {
            throw new Error("User was not found.")
        }
        res.send({ message: "User found!" })
    }
    catch (e)
    {
        res.status(400).json({ message: (e as Error).message })
    }
}