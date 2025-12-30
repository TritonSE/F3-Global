import type { RequestHandler } from "express";

const log: RequestHandler = (req, res, next) => {
  console.info(
    `${req.method}\t${req.url}\t${req.headers.origin ? req.headers.origin : "Unknown Origin"}`
  );

  next();
};

export default log;
