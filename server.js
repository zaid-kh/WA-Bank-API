import "dotenv/config";
import express from "express";
import cors from "cors";
import { errorHandler } from "./middlewares/errorMiddleware.js";
import userRoutes from "./routes/userRoutes.js";

const server = express();

// server request logger
server.use((req, res, next) => {
  const { originalUrl, method } = req;
  console.log(
    `*************************${originalUrl} : ${method} REQUEST *************************`
  );
  next();
});

// cors middleware
server.use(cors());

// JSON parsing middleware
server.use(express.json());

// users routes
server.use("/api/v1/users", userRoutes);

// todo: add route to '/'
server.get("/", (res, req) => {
  req.end("hello");
});

// Error handling Middleware
server.use(errorHandler);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Bank API server listening on port ${PORT}`);
});
