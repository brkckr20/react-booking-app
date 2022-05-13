import express from 'express'
import { countByCity, createHotel, deleteHotel, getHotel, getHotels, updateHotel } from '../controllers/hotel.js';
import Hotel from '../models/Hotel.js';
import { verifyAdmin } from '../utils/verifyToken.js'

const router = express.Router();
/* hotel ekleme silme güncelleme işlemlerini içeren api */

//create
router.post("/", verifyAdmin, createHotel)

//update
router.put("/:id", verifyAdmin, updateHotel)

//delete
router.delete("/find/:id", verifyAdmin, deleteHotel)

//get
//router.get("/:id", getHotel)

//get all
router.get("/", getHotels)
router.get("/countByCity", countByCity)
router.get("/countByType", getHotels)

export default router;