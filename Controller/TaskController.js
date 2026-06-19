import mongoose from 'mongoose';
import TaskModel from '../Model/TaskModel.js';
import TaskWalletModel from '../Model/TaskWalletModel.js';
import jwt from "jsonwebtoken";
import authMiddleware from '../Middleware/auth_Middleware.js';
import UserModel from '../Model/UserModel.js';
const CreateTask = async (req, res) => {
  // Implement task creation logic here
  const {title, description, status} = req.body;
  const authHeader = req.headers.authorization;
     if (!authHeader) {
         return res.status(401).json({
            message: "No token provided"
         });
      }

      const token = authHeader.split(" ")[1];
  const valideToken = jwt.verify(token, process.env.JWT_SECRET);
  const userId = await UserModel.findById(valideToken.userId);
  let TaskWallet = 0;
  try {

    const TaskWalletCheck = await TaskWalletModel.findOne({User: userId});
    
    if (!TaskWalletCheck) {
      return res.status(404).json({
          message: "Task wallet not found for this user"
      });
    }
    if(TaskWalletCheck.CustumedTask >= TaskWalletCheck.InitialTask){
      return res.status(403).json({
        message: "You have reached to You limit. Subscribe to Our Medium plan or Premium plan in order to continue to add task"
      });
    }else{
      const newTask = new TaskModel({
      title: title,
      description: description,
      UserId: userId
    });

    await newTask.save();
    await TaskWalletModel.findOneAndUpdate({User: userId}, { $inc: { CustumedTask: 1 } });

    res.status(200).json({message: "Task create Sucessfuly"});

    }

    
  } catch (error) {
    console.error("error is giving: ",error)
    res.status(500).json({message: "These issue while creating Task Please Try again later"})
  }

};


const GetAllTasks = async (req, res) => {

   try {

      const authHeader = req.headers.authorization;

      if (!authHeader) {
         return res.status(401).json({
            message: "No token provided"
         });
      }

      const token = authHeader.split(" ")[1];

      const valideToken = jwt.verify(
         token,
         process.env.JWT_SECRET
      );

      const Tasks = await TaskModel.find({
         UserId: valideToken.userId
      });

      res.status(200).json({
         Tasks,
         message: "Data fetched successfully"
      });

   } catch (error) {

      if (error.name === "TokenExpiredError") {
         return res.status(401).json({
            message: "Login again to continue"
         });
      }

      console.error(error);

      res.status(500).json({
         message: "Error during fetching tasks"
      });

   }
};

const GetTaskByStatus = async (req, res) => {
  try {
    const userId = req.user.id;
    const status = req.params.status.trim().toLowerCase();

    const tasks = await TaskModel.find({
      UserId: userId,
      status,
    });

    res.status(200).json({
      Tasks: tasks,
      message: "Tasks received successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error during fetching tasks",
    });
  }
};

const ChangeTaskByStatus = async (req, res) => {
     // Implement logic to get a specific task by ID for the authenticated user
  try {
    const authHeader = req.headers.authorization;
     if (!authHeader) {
         return res.status(401).json({
            message: "No token provided"
         });
      }

    const statusParam = status.trim().toLowerCase();

    const id = req.params.id;
    if(!mongoose.Types.ObjectId.isValid(id)){
      return res.status(400).json({
        message: "Invalid task ID"
      });
    }
    const Tasks = await TaskModel.findByIdAndUpdate(id,{status: statusParam}, {returnDocument: "after"});
    if(!Tasks){
      return res.status(404).json({message: "Task not found"});
    }

    res.status(200).json({Tasks,message: "Tasks Status Change Sucessfuly"});
  
  } catch (error) {
    if(error.name === "TokenExpiredError"){
            return res.status().json({message: "Login Again inorder to Continue"});
        }
    console.error("error: ", error);
    res.status(500).json({message: "Error during changing Tasks Status"});
  }

}

const UpdateTask = async (req, res) => {
  // Implement logic to update a specific task by ID for the authenticated user
    try {
      const id = req.params.id;
    const {title, description,status} = req.body;
    const authHeader = req.headers.authorization;
     if (!authHeader) {
         return res.status(401).json({
            message: "No token provided"
         });
      }

      const token = authHeader.split(" ")[1];
    if(!mongoose.Types.ObjectId.isValid(id)){
      return res.status(404).json({
        message: "Invalid id"
      });
    }
    const valideToken = await jwt.verify(token, process.env.JWT_SECRET);
    const task = await TaskModel.findById(id);
    
    if(!task) {
      return res.status(401).json({message: "Task not found"});
    }
    
    if(task.UserId.toString() !== valideToken.userId){
      return res.status(401).json({
        message: "User not allowed to this update task"
      });
    }else{

      const Task = await TaskModel.findByIdAndUpdate(id,{
        title: title, description: description, status: status
      },{returnDocument: "after"});
      if(!Task){
        return res.status(404).json({
          message: "Task to update not found"
        });
      };
      res.status(200).json({Task, message: "Task Updated Sucessfully"});
    }
  } catch (error) {
    if(error.name === "TokenExpiredError"){
            return res.status().json({message: "Login Again inorder to Continue"});
        }
    console.error("error: ", error);
    res.status(500).json({message: "Server issue Try again later."});
  }
 
};

const DeleteTaskById = async (req, res) => {
  // Implement logic to delete a specific task by ID for the authenticated user
  try {
    const id = req.params.id;
    if(!mongoose.Types.ObjectId.isValid(id)){
      return res.status(404).json({message: "Invalid ID"})
    }
    const RemoveTask = await TaskModel.findByIdAndDelete(id);
    res.status(200).json({message: "Task Deleted Sucessfully"});
  } catch (error) {
    res.status(500).json({
      message: "Failed to Delete Server error Try Again later."
    })
  }
};

const DeleteTasks = async (req, res) => {
  // Implement logic to delete all task for the authenticated user
  try {
    const authHeader = req.headers.authorization;
     if (!authHeader) {
         return res.status(401).json({
            message: "No token provided"
         });
      }

      const token = authHeader.split(" ")[1];
      const valideToken = await jwt.verify(token, process.env.JWT_SECRET);
    const verifyTasksByUser = await TaskModel.find({UserId: valideToken.userId});
    if(!verifyTasksByUser.length){
      return res.status(401).json({
        message: "No tasks found for this user"
      });
    }   
    await TaskModel.deleteMany({UserId: valideToken.userId});

    res.status(200).json({message: "All Task Deleted Sucessfully"});
  
  } catch (error) {
    if(error.name === "TokenExpiredError"){
            return res.status(401).json({message: "Login Again inorder to Continue"});
        }
    res.status(500).json({
      message: "Failed to Delete Server error Try Again later."
    })
  }
};

export { CreateTask, GetAllTasks, GetTaskByStatus, UpdateTask, DeleteTasks,DeleteTaskById, ChangeTaskByStatus};