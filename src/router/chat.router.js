import { Router } from "express"
import { renderChatPage } from "../controller/chat.controller.js"

const router = Router()

router.get('/',renderChatPage)

// router.get("/", (req, res) => {
//     res.render("chat", {})
// })

export default router