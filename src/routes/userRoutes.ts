import { Router } from "express"
import { userLogin, userRegister, userFind } from "../controllers/userController.ts"

const router = Router()

router.post("/login", userLogin)
router.post("/register", userRegister)
router.post("/find", userFind)

export default router
