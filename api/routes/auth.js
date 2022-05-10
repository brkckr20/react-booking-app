import express from 'express'

const router = express.Router();

router.get("/",(req,res) => {
    res.send("Auth endpointi");
})

router.get("/register",(req,res) => {
    res.send("Auth register endpointi");
})

export default router;