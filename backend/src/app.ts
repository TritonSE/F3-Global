import cors from "cors";
import express from "express";
import mongoose from "mongoose";

import { FRONTEND_ORIGIN, MONGO_URI, PORT } from "./config";
import errorHandler from "./middleware/errorHandler";
import log from "./middleware/logger";

const app = express();

app.use(
  cors({
    origin: FRONTEND_ORIGIN,
    methods: ["GET", "POST", "DELETE", "PUT", "PATCH"],
  })
);

app.use(express.json());

app.use(log);

app.use(errorHandler);
app.listen(PORT, () => {
  console.info(`> Listening on port ${PORT}`);
});
// mongoose
//   .connect(MONGO_URI)
//   .then(() => {
//     console.info("Mongoose connected!");
//     app.listen(PORT, () => {
//       console.info(`> Listening on port ${PORT}`);
//     });
//   })
//   .catch(console.error);
