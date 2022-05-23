import User from "../models/User.js";
import bcrypt from 'bcryptjs'
import { createError } from '../utils/error.js'
import jwt from 'jsonwebtoken';

export const register = async (req, res, next) => {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    try {
        const newUser = new User({
            ...req.body,
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

        const token = jwt.sign(
            { id: user._id, isAdmin: user.isAdmin },
            process.env.JWT
        )

        const { password, isAdmin, ...otherDetails } = user._doc; //parola ve admin durumunun gönderilmemesi için ayrıştırıldı.
        res.cookie("access_token", token, {
            httpOnly: true
        }).status(200).json({ details: { ...otherDetails }, isAdmin });
    } catch (error) {
        next(error);
    }
}


/*
    komut satırından random secret key üretmek
    openssl rand -base64 32

*/