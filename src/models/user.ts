const checkInvalid = (val: any): boolean => (val === undefined || val === null)
function checkCredentials(username: string, password: string)
{
    if (checkInvalid(username) || checkInvalid(password))
    {
      throw new Error("Username or password is invalid.")
    }
}

function generateTime(): string
{
    const date = new Date()
    return date.toUTCString()
}

async function postFetch(data: any, cmd: string): Promise< [ number, any ] >
{
    const res = await fetch(`http://localhost:3078/database/${cmd}`, 
    { 
        method: 'POST', 
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    })
    const body: any = await res.json()
    return [ res.status, body ]
}

export class UserModel 
{
    async add(username: string, password: string): Promise<void>
    {
        checkCredentials(username, password)
        const time_created = generateTime()
        const [ status, _ ] = await postFetch({ username, password, time_created }, "user")
        if (status !== 200)
        {
            throw new Error("User could not be created.")
        }
    }

    async validate(username: string, password: string): Promise< number >
    {
        checkCredentials(username, password)
        const [ status, body ] = await postFetch({ username, password }, "validate")
        if (status === 200)
        {
            return body.id
        }
        else
        {
            throw new Error("User could not be validated.")
        }
    }

    async find(id: number)
    {
        if (checkInvalid(id))
        {
            throw new Error("Username is invalid.")
        } 
        const [ status, _ ] = await postFetch({ playerId: id }, "find")
        if (status !== 200)
        {
            throw new Error("User was not found.")
        }
    }
}

export const userModel = new UserModel()