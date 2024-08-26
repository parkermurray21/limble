import express from "express";
import * as mariadb from "mariadb";
import PieChartRouter from "./routes/pieChart"

const app = express();
const port = 3000;

async function main() {
  app.use('/api/piecharts', PieChartRouter);


  app.get("/", (req, res) => {
    res.send("Hello!");
  });

  app.listen(port, "0.0.0.0", () => {
    console.info(`App listening on ${port}.`);
  });
}

main();
