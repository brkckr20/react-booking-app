import Room from "../models/Room.js";
import Hotel from "../models/Hotel.js";
import { createError } from '../utils/error.js'

export const createRoom = async (req, res, next) => {
    const hotelId = req.params.hotelid;
    const newRoom = new Room(req.body);

    try {
        const savedRoom = await newRoom.save();
        try {
            await Hotel.findByIdAndUpdate(hotelId, { $push: { rooms: savedRoom._id } })
        } catch (error) {
            next(error)

        }
        res.status(200).json(savedRoom)
    } catch (err) {
        next(err)
    }

}
export const updateRoom = async (req, res, next) => {
    try {
        const updatedRoom = await Room.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true } // veri ekleme işlemi sonrasında geri döndürülen verinin güncellenmiş veri olması için eklendi.
        )
        res.status(200).json(updatedRoom);
    } catch (error) {
        next(error)
    }
}

export const updateRoomAvaliability = async (req, res, next) => {
    try {
        const updatedRoom = await Room.updateOne({ "roomNumbers._id": req.params.id }, {
            $push: {
                "roomNumbers.$.unavaliableDates": req.body.dates
            }
        })
        res.status(200).json("update room successfully");
    } catch (error) {
        next(error)
    }
}

export const deleteRoom = async (req, res, next) => {
    const hotelId = req.params.hotelid;
    try {
        await Room.findByIdAndDelete(
            req.params.id
        );
        try {
            await Hotel.findByIdAndUpdate(hotelId, { $pull: { rooms: req.params.id } })
        } catch (error) {
            next(error)

        }
        res.status(200).json("Room silindi...");
    } catch (error) {
        next(error)
    }
}
export const getRoom = async (req, res, next) => {
    try {
        const room = await Room.findById(
            req.params.id
        )
        res.status(200).json(room);
    } catch (error) {
        next(error)
    }
}
export const getRooms = async (req, res, next) => {
    //const failed = true;
    //if (failed) return next(createError(401,"Sisteme giris yapmadiniz..."))

    try {
        const rooms = await Room.find()
        res.status(200).json(rooms);
    } catch (error) {
        next(error)
    }
}