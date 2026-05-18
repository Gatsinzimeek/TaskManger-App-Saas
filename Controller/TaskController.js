import mongoose from 'mongoose';
import TaskModel from '../Model/TaskModel.js';

const CreateTask = async (req, res) => {
  // Implement task creation logic here
  const {title, description, status} = req.body;

  try {
    
    const newTask = new TaskModel({
      title: title,
      description: description,
    });

    await newTask.save();
    res.status(200).json({message: "Task create Sucessfuly"})

  } catch (error) {
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
    const {title, description} = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)){
      return res.status(404).json({
        message: "Invalid id"
      });
    }
    console.log(id);
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