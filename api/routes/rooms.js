import express from 'express'
import { createRoom, updateRoom, deleteRoom, getRoom, getRooms, updateRoomAvaliability } from '../controllers/room.js';
import { verifyAdmin } from '../utils/verifyToken.js'

const router = express.Router();

//create
router.post("/:hotelid", verifyAdmin, createRoom)

//update
router.put("/:id", verifyAdmin, updateRoom)
router.put("/avaliability/:id", updateRoomAvaliability)

//delete
router.delete("/:id/:hotelid", verifyAdmin, deleteRoom)

//get
router.get("/:id", getRoom)

//get all
router.get("/", getRooms)

export default router;