import mongoose from 'mongoose';
import TaskModel from '../Model/TaskModel.js';
import TaskWalletModel from '../Model/TaskWalletModel.js';
import jwt from 'jsonwebtoken';
const CreateTask = async (req, res) => {
  // Implement task creation logic here
  const {title, description, status} = req.body;
  const userId = req.params.id;
  let TaskWallet = 0;
  try {

    const TaskWalletCheck = await TaskWalletModel.findOne({User: userId});
    
    if (!TaskWalletCheck) {
      return res.status(404).json({
          message: "Task wallet not found for this user"
      });
    }
    if(TaskWalletCheck.CustumedTask >= TaskWalletCheck.InitialTask){
      return res.status(401).json({
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

    res.status(200).json({message: "Task create Sucessfuly"})

    }

    
  } catch (error) {
    console.error("error is giving: ",error)
    res.status(500).json({message: "These issue while creating Task Please Try again later"})
  }

};

const GetAllTasks = async (req, res) => {
  // Implement logic to get all tasks for the authenticated user

  try {
      const Tasks = await TaskModel.find();
      res.status(200).json({Tasks, message:"Data Fetched Sucessfuly"});
  } catch (error) {
    console.error("error  : ", error);
    res.status(500).json({message: "Error during Fetching all tasks"});
  }
};

const GetTaskByStatus = async (req, res) => {
  // Implement logic to get a specific task by ID for the authenticated user
  try {
    
  const statusParamas = req.query.status;
  const status = statusParamas.trim().toLowerCase();
  const Tasks = await TaskModel.find({status: status});
  if(!Tasks){
    return res.status(404).json({message: "Task not found"});
  }
  res.status(200).json({Tasks, message: "Tasks Recieved Sucessfuly"});
  
  } catch (error) {
    res.status(500).json({message: "Error during Fetching Tasks"});
  }

};

const ChangeTaskByStatus = async (req, res) => {
     // Implement logic to get a specific task by ID for the authenticated user
  try {
    
    const {status} = req.body;
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
    console.error("error: ", error);
    res.status(500).json({message: "Error during changing Tasks Status"});
  }

}

const UpdateTask = async (req, res) => {
  // Implement logic to update a specific task by ID for the authenticated user
    try {
      const id = req.params.id;
    const {title, description, token} = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)){
      return res.status(404).json({
        message: "Invalid id"
      });
    }
    const validateUser = await jwt.verify()

    const Task = await TaskModel.findByIdAndUpdate(id,{
      title: title, description: description 
    },{returnDocument: "after"});
    if(!Task){
      return res.status(404).json({
        message: "Task to update not found"
      });
    };
    res.status(200).json({Task, message: "Task Updated Sucessfully"});

  } catch (error) {
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
    
    const RemoveTasks = await TaskModel.deleteMany({});

    res.status(200).json({message: "All Task Deleted Sucessfully"});
  } catch (error) {
    res.status(500).json({
      message: "Failed to Delete Server error Try Again later."
    })
  }
};

export { CreateTask, GetAllTasks, GetTaskByStatus, UpdateTask, DeleteTasks,DeleteTaskById, ChangeTaskByStatus};