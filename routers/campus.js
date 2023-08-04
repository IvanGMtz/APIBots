import { ObjectId } from "mongodb";
import {con} from "../db/atlas.js";
import express from "express";
import {limitGet} from "../limit/config.js";

const appCampus = express.Router();

appCampus.get("/", limitGet(),  async(req, res)=>{
    if (!req.rateLimit) return;
    let {id} = req.body;
    let db = await con();
    let usuario = db.collection("usuario");
    let result = await usuario.find({_id: new ObjectId(id)}).toArray();
    res.send(result);
});

appCampus.post("/", limitGet(),  async(req, res)=>{
    if (!req.rateLimit) return;
    let db = await con();
    let usuario = db.collection("usuario");
    try {
        let result = await usuario.insertOne(req.body);
        console.log(result);
        res.send(":)");
    } catch (error) {
        console.log(error.errInfo.details.schemaRulesNotSatisfied);
        res.send(":(");
    }
});

export default appCampus;