export interface user { 
    username: string; 
    password: string; 
    id: number; 
}

const users: Record<string, user> = {}

const checkInvalid = (val: any): boolean => (val === undefined || val === null)

export function userCredentialsValidate(username: string, password: string): number
{
    if (checkInvalid(username) || checkInvalid(password))
    {
      throw new Error("Username or password is invalid.")
    }

    if (!users.hasOwnProperty(username))
    {
      throw new Error("Username is not registered.")
    }

    const credential: user = users[username] as user // ts does like that it can be undefined
    if (credential.password !== password)
    {
      throw new Error("Invalid password.")
    }

    return credential.id
}

export function userCredentialsAdd(username: string, password: string): number
{
    if (checkInvalid(username) || checkInvalid(password))
    {
      throw new Error("Username or password is invalid.")
    }

    if (users.hasOwnProperty(username))
    {
      throw new Error("Username is already registered.")
    }

    const id = Math.floor(Math.random() * 4294967295) // largest number for a 32-bit unsigned
    const userData: user = { username, password, id }
    users[username] = userData
    return id
}

export function userCredentialsFind(username: string): user | null
{
    if (checkInvalid(username))
    {
      throw new Error("Username is invalid.")
    } 

    if (users.hasOwnProperty(username))
    { 
        const userFound: user | undefined = users[username]
        return userFound === undefined ? null : userFound
    }
    return null
}