import express from "express"
import protectRoute from "../middlewars/protectRoute.js"
import { getAllNotificatios, read } from "../controllers/notioficationController.js"
const router = express.Router()
router.get('/:email',protectRoute,getAllNotificatios);
router.patch('/read/:id',protectRoute,read);
export default router;