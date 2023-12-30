import "dotenv/config";
import express from "express";

const server = express();

// JSON parsing middleware
server.use(express.json());

// users routes
// server.use("/api/v1/users", userRoutes);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Bank API server listening on port ${PORT}`);
});
