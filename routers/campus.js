import express from "express";
import {limitGet} from "../limit/config.js";
import appMiCampus from "../middleware/campus.js"

const appCampus = express.Router();

// appCampus.get("/", limitGet(),  async(req, res)=>{
//     if (!req.rateLimit) return;
//     let {id} = req.body;
//     let db = await con();
//     let usuario = db.collection("usuario");
//     let result = await usuario.find({_id: new ObjectId(id)}).toArray();
//     res.send(result);
// });

appCampus.post("/", limitGet(), appMiCampus,   async(req, res)=>{
    res.send(":)");
});

export default appCampus;