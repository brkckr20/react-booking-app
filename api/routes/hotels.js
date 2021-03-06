import express from 'express'
import { countByCity, countByType, createHotel, deleteHotel, getHotel, getHotelRoom, getHotels, updateHotel } from '../controllers/hotel.js';
import { verifyAdmin } from '../utils/verifyToken.js'

const router = express.Router();
/* hotel ekleme silme güncelleme işlemlerini içeren api */

//create
router.post("/", verifyAdmin, createHotel)

//update
router.put("/:id", verifyAdmin, updateHotel)

//delete
router.delete("/:id"/* , verifyAdmin */, deleteHotel)

//get
router.get("/find/:id", getHotel)
//router.get("/:id", getHotel)

//get all
router.get("/", getHotels)
router.get("/countByCity", countByCity)
router.get("/countByType", countByType)
router.get("/room/:id", getHotelRoom)

export default router;