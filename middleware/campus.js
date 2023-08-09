import 'reflect-metadata';
import {plainToClass, classToPlain } from 'class-transformer';
import {validate} from 'class-validator';
import {User} from "../routers/storage/usuarios.js"
import { Router } from "express";
const appMiCampusVerify = Router();
const appDTOData = Router();


appMiCampusVerify.use(async(req, res, next)=>{
    if (!req.rateLimit) return;
    const {iat, exp, ...payload} = req.data;
    let Clone = JSON.stringify(classToPlain(plainToClass(User, {}, { ignoreDecorators: true })));
    let Verify = (Clone === JSON.stringify(payload));
    (!Verify) ? res.status(406).send({status: 406, message: "No Autorizado"}) : next();
});

appDTOData.use( async(req,res,next) => {
    try {
        let data = plainToClass(User, req.body);
        await validate(data);
        req.body = JSON.parse(JSON.stringify(data));
        req.data = undefined;
        next();
    } catch (err) {
        res.status(err.status).send(err)
    }
});

export {appMiCampusVerify, appDTOData};