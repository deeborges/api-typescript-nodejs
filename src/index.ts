import "reflect-metadata";
import {createConnection} from "typeorm";
import * as express from "express";
import * as bodyParser from "body-parser";
import {Request, Response} from "express";
import {Routes} from "./routes";
import {User} from "./entity/User";
import config from './config/config';

// create express app
const app = express();
app.use(bodyParser.json());
app.use('/', (req, res) => {
  return res.send('Olá');
})
// register express routes from defined application routes
Routes.forEach(route => {
    (app as any)[route.method](route.route, (req: Request, res: Response, next: Function) => {
        const result = (new (route.controller as any))[route.action](req, res, next);
        if (result instanceof Promise) {
            result.then(result => result !== null && result !== undefined ? res.send(result) : undefined);
        } else if (result !== null && result !== undefined) {
            res.json(result);
        }
    });
});

// versao ASYNC AWAIT
app.listen(config.port, '0.0.0.0', async () => {
  console.log(`API iniciada na porta ${'http://localhost:'+config.port}`);
  try {
    await createConnection();
    console.log('=> Database connected!');
  } catch (err) {
    console.log('=> (X) erro ao conectar com banco de dados!!!');
  }
});

// versao .then e .catch
// app.listen(config.port, '0.0.0.0', () => {
//  console.log(`API iniciada na porta ${'http://localhost:'+config.port}`);
//  createConnection().then(() => {
//      console.log('Deu certo');
//    }).catch(err => {
//      console.log('Deu erro');
//    }
//  )
//});
