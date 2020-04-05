import dotenv from "dotenv";
dotenv.config();

import express from "express";
import next from "next";
import routes from "../routes";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import { connectDatabase } from "./db";
const db = connectDatabase();
import ApiRouter from "./api";
// import logger from "morgan";


const port = parseInt(process.env.PORT || '3000', 10)
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handler = routes.getRequestHandler(app)


app.prepare()
  .then(() => {
    const server = express();
    // middlewares
    // server.use(logger('dev'));
    server.use(bodyParser.json());
    server.use(bodyParser.urlencoded({ extended: true }));
    server.use(cookieParser());

    // to serve the static files
    server.use(express.static('public'));
    // to serve the APIs
    server.use('/api', ApiRouter);
    // to serve the pages
    server.use(handler);

    server.listen(port, (err: any) => {
      if (err) throw err
      console.log(`> Ready on ${port}`)
    });
  });
