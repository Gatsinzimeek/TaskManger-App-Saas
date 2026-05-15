import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import { ChangePassword, forgottenPassword, LogoutUser, LoginUser, RegisterUser } from "./Controller/UserController.js";
import { CreateTask, DeleteTask, GetAllTasks, GetTaskByStatus, UpdateTask } from "./Controller/TaskController.js";

dotenv.config();

const app = express();
const PORT =  5000;

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to the Task Manager API !");
});

// Define API User routes

app.post("/api/login", LoginUser);

app.post("/api/register", RegisterUser);

app.post("/api/logout", LogoutUser);

app.post("/api/change-password", ChangePassword);   

app.post("/api/forget-password", forgottenPassword);
// Define API Task routes (to be implemented)

app.post("/api/create-tasks", CreateTask);

app.get("/api/get-tasks", GetAllTasks);

app.get("/api/get-tasks-by-status", GetTaskByStatus);

app.put("/api/tasks/:id", UpdateTask);

app.delete("/api/tasks/:id", DeleteTask);


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
