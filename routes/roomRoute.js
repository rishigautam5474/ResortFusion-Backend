import express from "express"
import { getAllRoomList, createNewRoom ,getSpecificRoomList, deleteSpecificRoomList, updateRoomDetails } from "../controller/roomController.js";
const router = express.Router();

router.get('/listing-room', getAllRoomList)
router.get('/listing-room/:id', getSpecificRoomList)
router.post('/create', createNewRoom)
router.put('/room-update/:id', updateRoomDetails)
router.delete('/listing-room/:id', deleteSpecificRoomList)

export default router;