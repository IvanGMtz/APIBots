import express from "express";
import {limitGet} from "../limit/config.js";
import {appMiCampusVerify, appDTOData} from "../middleware/campus.js"
import {con} from "../db/atlas.js";
let db = await con();
let usuario = db.collection("usuario");

const appCampus = express.Router();
appCampus.get("/", limitGet(), appMiCampusVerify, async(req, res)=>{
    if (!req.rateLimit) return;
    let db = await con();
    let usuario = db.collection("usuario");
    let result = await usuario.find({}).toArray();
    res.send(result);
});

appCampus.post("/", limitGet(), appMiCampusVerify, appDTOData, async(req, res)=>{
    try {
        let result = await usuario.insertOne(req.body);
        console.log(result);
        res.send(":)");
    } catch (error) {
        console.log(error.errInfo.details.schemaRulesNotSatisfied[0]);
        res.send(":(");
    }
});

export default appCampus;