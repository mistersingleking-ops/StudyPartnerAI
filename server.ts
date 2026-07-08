import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";

import chatRouter from "./routes/chat";
import parseRouter from "./routes/parse";
import toolkitRouter from "./routes/toolkit";

import { errorHandler } from "./middleware/error";
import { limiter } from "./middleware/rateLimit";

dotenv.config();

const app = express();

app.use(helmet());

app.use(cors());

app.use(morgan("dev"));

app.use(express.json({ limit: "50mb" }));

app.use(express.urlencoded({
    extended: true,
    limit: "50mb"
}));

app.use(limiter);

app.use("/api/chat", chatRouter);

app.use("/api/parse", parseRouter);

app.use("/api/toolkit", toolkitRouter);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});
