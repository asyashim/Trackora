
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
//import authRoutes from "./routes/authRoutes.js";

// Load environment variables
dotenv.config();

// Create Express application
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Temporary jobs array
const jobs = [
  {
    id: 1,
    company: "Google",
    position: "Frontend Developer",
    status: "Applied",
  },
  {
    id: 2,
    company: "Amazon",
    position: "Backend Developer",
    status: "Interview",
  },
  {
    id: 3,
    company: "Microsoft",
    position: "Full Stack Developer",
    status: "Rejected",
  },
];

// Welcome API
app.get("/", (req, res) => {
  res.send("Welcome to Trackora Backend!");
});

// Health check API
app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "Trackora backend is running successfully!",
  });
});

// Test API
app.get("/api/test", (req, res) => {
  res.json({
    success: true,
    message: "Hello from Trackora backend!",
  });
});

// Get all jobs
app.get("/api/jobs", (req, res) => {
  res.json({
    success: true,
    jobs: jobs,
  });
});

// Add a job
app.post("/api/jobs", (req, res) => {
  const newJob = req.body;

  jobs.push(newJob);

  res.status(201).json({
    success: true,
    message: "Job application added successfully",
    job: newJob,
  });
});

// Start server after MongoDB connection
const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
