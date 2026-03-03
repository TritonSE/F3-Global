import cors from "cors";
import express from "express";
import mongoose from "mongoose";

import { FRONTEND_ORIGIN, MONGO_URI, PORT } from "./config";
import errorHandler from "./middleware/errorHandler";
import log from "./middleware/logger";
import clientsRouter from "./routes/clients";
import collegeRoutes from "./routes/colleges";
import contactRoute from "./routes/contactRequest";
import faqRouter from "./routes/faq";
import highlightsRouter from "./routes/highlights";
import impactMetricRouter from "./routes/impact-metrics";
import membersRouter from "./routes/members";

const app = express();

app.use(
  cors({
    origin: FRONTEND_ORIGIN,
    methods: ["GET", "POST", "DELETE", "PUT", "PATCH"],
  }),
);

app.use(express.json());

app.use(log);
app.use("/api/contact", contactRoute);
app.use("/api/members", membersRouter);
app.use("/api/clients", clientsRouter);
app.use("/api/client-highlights", highlightsRouter);
app.use("/api/impact-metrics", impactMetricRouter);
app.use("/api/faq", faqRouter);
app.use("/api/colleges", collegeRoutes);

app.use(errorHandler);
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.info("Mongoose connected!");
    app.listen(PORT, () => {
      console.info(`> Listening on port ${PORT}`);
    });
  })
  .catch(console.error);
