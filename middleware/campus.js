import 'reflect-metadata';
import {plainToClass, classToPlain } from 'class-transformer';
import {User} from "../routers/storage/usuarios.js"
import { Router } from "express";
import {con} from "../db/atlas.js";
const appMiCampus = Router();
let db = await con();
let usuario = db.collection("usuario");

appMiCampus.use(async(req, res, next)=>{
    if (!req.rateLimit) return;
    console.log(req.data);
    // try {
    //     let result = await usuario.insertOne(req.body);
    //     console.log(result);
    //     res.send(":)");
    // } catch (error) {
    //     console.log(error.errInfo.details.schemaRulesNotSatisfied[0]);
    //     res.send(":(");
    // }
    next();
});

export default appMiCampus;