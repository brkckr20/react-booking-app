import express from 'express'
import Hotel from '../models/Hotel.js';
import { createError } from '../utils/error.js';

const router = express.Router();
/* hotel ekleme silme güncelleme işlemlerini içeren api */

//create
router.post("/", async (req, res) => {

    const newHotel = new Hotel(req.body)

    try {
        const savedHotel = await newHotel.save();
        res.status(200).json(savedHotel);
    } catch (error) {
        res.status(500).json(error)
    }
})


//update
router.put("/:id", async (req, res) => {

    try {
        const updatedHotel = await Hotel.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true } // veri ekleme işlemi sonrasında geri döndürülen verinin güncellenmiş veri olması için eklendi.
        )
        res.status(200).json(updatedHotel);
    } catch (error) {
        res.status(500).json(error)
    }
})

//delete
router.delete("/:id", async (req, res) => {

    try {
        await Hotel.findByIdAndDelete(
            req.params.id
        )
        res.status(200).json("Hotel silindi...");
    } catch (error) {
        res.status(500).json(error)
    }
})
//get
router.get("/:id", async (req, res) => {

    try {
        const hotel = await Hotel.findById(
            req.params.id
        )
        res.status(200).json(hotel);
    } catch (error) {
        res.status(500).json(error)
    }
})
//get all
router.get("/", async (req, res, next) => {

    //const failed = true;
    //if (failed) return next(createError(401,"Sisteme giris yapmadiniz..."))

    try {
        const hotels = await Hotel.find()
        res.status(200).json(hotels);
    } catch (error) {
        next(error);
    }
})

export default router;