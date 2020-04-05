import express, { Request, Response } from "express";
import next from "next";
import routes from "../routes";


const port = parseInt(process.env.PORT || '3000', 10)
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handler = routes.getRequestHandler(app)


app.prepare()
  .then(() => {
    const server = express();
    // to serve the static files
    server.use(express.static('public'))
    // to serve the pages
    server.use(handler);

    server.listen(port, (err: any) => {
      if (err) throw err
      console.log(`> Ready on ${port}`)
    });
  });
