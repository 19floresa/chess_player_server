import express from "express"
import cookieParser from "cookie-parser"
import { errorHandler } from "./middleware/errorHandler.ts"

import userRoutes from "./routes/userRoutes.ts"

import cors from "cors"

const app = express()

app.use(cors({
    origin: 'http://gui:3000',
    methods: ['GET', 'POST',],
    allowedHeaders: ['Content-Type', 'Origin', 'X-Requested-With', 'Accept', 'x-client-key', 'x-client-token', 'x-client-secret', 'Authorization'],
    credentials: true
}))

app.use(express.json())
app.use(cookieParser())

// Routes
app.use("/user", userRoutes)

// Error Handling
app.use(errorHandler)

export default app