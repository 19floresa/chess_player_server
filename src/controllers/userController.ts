import type { Request, Response } from "express"
import { userModel } from "../models/user.ts"

interface userInfoProp {
    username: string;
    password: string;
}

export async function userLogin(req: Request, res: Response): Promise<void>
{
    try 
    {
        const { username, password }: userInfoProp = req.body
        const id: number = await userModel.validate(username, password)
        res.cookie("id", id)
        res.send({ message: "User successfully logged in." })
    }
    catch (e)
    {
        res.status(400).json({ message: (e as Error).message })
    }
}

export async function userRegister(req: Request, res: Response): Promise<void>
{
    try 
    {
        const { username, password }: userInfoProp = req.body
        await userModel.add(username, password)
        res.send({ message: "User successfully registered." })
    }
    catch (e)
    {
        res.status(400).json({ message: (e as Error).message })
    }
}

export async function userFind(req: Request, res: Response): Promise<void>
{
    try 
    {
        const { id } = req.body
        await userModel.find(id)
        res.send({ message: "User was found!" })
    }
    catch (e)
    {
        res.status(400).json({ message: (e as Error).message })
    }
}