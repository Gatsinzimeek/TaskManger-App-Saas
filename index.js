import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import { ChangePassword, forgottenPassword, LogoutUser, validateUser, LoginUser, RegisterUser } from "./Controller/UserController.js";
import { CreateTask, DeleteTasks, DeleteTaskById, GetAllTasks, GetTaskByStatus, UpdateTask, ChangeTaskByStatus } from "./Controller/TaskController.js";
import authMiddleware from "./Middleware/auth_Middleware.js";
import verifySubscription from "./Controller/subscriptionController.js";
import {GetPaymentStatus} from './Controller/paymentStatus.js'
import processPayment from "./Controller/PaymentController.js";
import GetDashboardStats from "./Controller/UserDashboardController.js";
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

app.post("/api/validateUser", validateUser);

app.post("/api/logout", LogoutUser);

app.post("/api/change-password", ChangePassword);   

app.post("/api/forget-password", forgottenPassword);
// Define API Task routes (to be implemented)

app.post("/api/create-tasks",authMiddleware, CreateTask);

app.get("/api/get-tasks",authMiddleware, GetAllTasks);

app.get("/api/get-tasks-by-status/:status",authMiddleware, GetTaskByStatus);

app.put("/api/Change-task-status/:id",authMiddleware, ChangeTaskByStatus);

app.put("/api/update-task/:id",authMiddleware, UpdateTask);

app.delete("/api/delete-task-Byid/:id",authMiddleware, DeleteTaskById);

app.delete("/api/delete-tasks",authMiddleware, DeleteTasks);

app.get(
  "/api/dashboard-stats",
  authMiddleware,
  GetDashboardStats
);

// Define of Subscription API

app.post(
   "/api/subscribe",
   authMiddleware,
   verifySubscription
);

app.get(
   "/api/payment/status",
   authMiddleware,
   GetPaymentStatus
);

app.post(
   "/api/payment/process",
   authMiddleware,
   processPayment
);
// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
