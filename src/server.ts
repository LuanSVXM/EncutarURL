import express, { Router, Request, Response } from "express";
import cors from "cors";

const app = express();

const port = process.env.PORT || 3000;

app.use(cors());

const RouterApi = Router();

RouterApi.get("/", (request: Request, response: Response) =>  {
    return response.status(200).json({message: "Seja bem vindo a api (/^▽^)/ "});
});

app.use(RouterApi);


app.listen(port, () => {
    console.log(`Servidor rodando em: http://localhost:${port}`)
});