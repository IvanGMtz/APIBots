import dotenv from "dotenv";
import express  from "express";
import appCampus from "./routers/campus.js";
import {tokenJWT, validateJWT} from "./limit/token.js"
dotenv.config();
let app = express();

app.use(express.json())
app.use("/campus", validateJWT,appCampus);
app.use("/token", tokenJWT);

let config = JSON.parse(process.env.MY_SERVER);
app.listen(config, ()=>{
    console.log(`http://${config.hostname}:${config.port}`);
});