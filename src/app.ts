import express from "express"
import cookieParser from "cookie-parser"
import { errorHandler } from "./middleware/errorHandler.ts"

import userRoutes from "./routes/userRoutes.ts"

import cors from "cors"

const app = express()

app.use(cors({
    origin: 'http://localhost:3000', // use your actual domain name (or localhost), using * is not recommended
    methods: ['GET', 'POST',/* 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'*/],
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