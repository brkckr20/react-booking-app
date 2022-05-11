import User from "../models/User.js";
import bcrypt from 'bcryptjs'
import { createError } from '../utils/error.js'

export const register = async (req, res, next) => {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    try {
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hash,
            isAdmin: false
        })
        await newUser.save();
        res.status(200).send("User basariyla kaydedildi...")
    } catch (error) {
        next(error);
    }
}

export const login = async (req, res, next) => {
    try {
        const user = await User.findOne({ username: req.body.username })
        if (!user) return next(createError(404, "Kullanici Bulunamadi..."))

        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password)
        if (!isPasswordCorrect) return next(createError(400, "Kullanici adi veya sifre hatali..."))

        const { password, isAdmin, ...otherDetails } = user._doc; //parola ve admin durumunun gönderilmemesi için ayrıştırıldı.
        res.status(200).json({ ...otherDetails });
    } catch (error) {
        next(error);
    }
}