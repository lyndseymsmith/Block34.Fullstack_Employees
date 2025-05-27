import express from "express";
import employeesApi from "./api/employees.js";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to the Fullstack Employees API.");
});

// Employees API routes
app.use("/employees", employeesApi);

// Error handling middleware
app.use((err, req, res, next) => {
  if (err.status) {
    res.status(err.status).json({ error: err.message });
  } else {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default app;
