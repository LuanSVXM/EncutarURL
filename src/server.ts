import express, { Router, Request, Response } from "express";
import dotenv from 'dotenv';
import cors from "cors";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

const RouterApi = Router();

RouterApi.get("/", (request: Request, response: Response) =>  {
    return response.status(200).json({message: "Seja bem vindo a api (/^▽^)/ "});
});

RouterApi.get("/redirect", (request: Request, response: Response) =>  {
    return response.status(301).redirect("https://www.google.com/");
});

app.use(RouterApi);


app.listen(port, () => {
    console.log(`Servidor rodando em: http://localhost:${port}`)
});