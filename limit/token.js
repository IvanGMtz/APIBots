import dotenv from 'dotenv'
import { SignJWT, jwtVerify } from 'jose';
import { User } from '../routers/storage/usuarios.js';
import express from 'express';
import 'reflect-metadata';
import {plainToClass, classToPlain } from 'class-transformer';
const tokenJWT = express();
const validateJWT = express();
dotenv.config("../");

tokenJWT.use("/:collection", async(req,res,next)=>{
    try {
        let inst = plainToClass(eval(req.params.collection), {}, { ignoreDecorators: true });
        const encoder = new TextEncoder();
        const jwtconstructor = new SignJWT(Object.assign({},classToPlain(inst)));
        const jwt = await jwtconstructor
        .setProtectedHeader({alg:"HS256", typ: "JWT"})
        .setIssuedAt()
        .setExpirationTime("30m")
        .sign(encoder.encode(process.env.JWT_PRIVATE_KEY));
        req.data = jwt;
        res.status(201).send({status:201, message:req.data})
    } catch (error) {
        res.json({status: 404, message: "No se pudo generar el token"});
    }
})
validateJWT.use(async(req,res,next)=>{
    const {authorization} = req.headers;
    if (!authorization) return res.json({status: 400, message: "Token no enviado"});
    try {
        const encoder = new TextEncoder();
        const jwtData = await jwtVerify(
            authorization,
            encoder.encode(process.env.JWT_PRIVATE_KEY)
        );
        
        req.data = jwtData.payload;
        next();
    } catch (error) {
        res.json({status: 498, message: "Token caducado"});
    }
})
export {
    tokenJWT,
    validateJWT
};