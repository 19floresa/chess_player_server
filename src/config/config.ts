import dotenv from "dotenv"

dotenv.config()

interface Config {
    port: number
    nodeEnv: string
    URL: string
}

const config: Config = {
    port: Number(process.env.PORT) || 3025,
    nodeEnv: process.env.NODE_ENV || "development",
    URL: process.env.URL || "16.145.81.136" // temp solution
}

export default config