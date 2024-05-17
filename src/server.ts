import dotenv from 'dotenv'
dotenv.config();
import express, { Router, Request, Response } from "express";
import Config from '@config';
import cors from "cors";
import { DataSource } from 'typeorm';
import routerNavigation from "./navigation/routes";

const app = express();

app.use(cors());

const port = Config().PORT;

const router = Router();

export const AppDataSource = new DataSource({...Config().DATASOURCE});

AppDataSource.initialize()
  .then(() => {
    console.log(`Sucess connect database to schema ${process.env.DB_SCHEMA}`);
  })
  .catch((error) => console.log(error));

router.get("/", (request: Request, response: Response) =>  {
    return response.status(200).json({message: "Seja bem vindo a api (/^▽^)/ "});
});


app.use(router);

app.use(routerNavigation);


app.listen(port, () => {
    console.log(`Servidor rodando em: http://localhost:${port}`)
});