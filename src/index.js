import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pool from "./config/db.js";

import createUserTable from "./data/createUserTable.js";
import errorHandling from "./middlewares/errorHandler.js";

//import routes
import userRoutes from "./routes/userRoutes.js";

dotenv.config();
const port = process.env.PORT;

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

//Routes
app.use("/api", userRoutes);

//Error handling middleware
app.use(errorHandling);

// Create users table if it doesn't exist
createUserTable();

//testing postgres connection
app.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT current_database()");
    res.json(result.rows[0].current_database);
  } catch (error) {
    console.error("Error testing database connection:", error);
    res.status(500).json({ error: "Database connection failed" });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
