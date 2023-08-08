import 'reflect-metadata';
import {plainToClass, classToPlain } from 'class-transformer';
import {User} from "../routers/storage/usuarios.js"
import { Router } from "express";
import {con} from "../db/atlas.js";
const appMiCampusVerify = Router();
let db = await con();
let usuario = db.collection("usuario");

appMiCampusVerify.use(async(req, res, next)=>{
    if (!req.rateLimit) return;
    delete req.data.iat;
    delete req.data.exp;
    console.log(req.data);
    let Clone = JSON.stringify(classToPlain(plainToClass(User, {}, { ignoreDecorators: true })));
    let Verify = (Clone === JSON.stringify(req.data))
    console.log(Verify);
    // classToPlain(Verify)
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

export {appMiCampusVerify};