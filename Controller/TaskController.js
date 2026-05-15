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
    res.status(200).json({messsage: "Task create Sucessfuly"})

  } catch (error) {
    res.status(500).json({messsage: "These issue while creating Task Please Try again later"})
  }

};

const GetAllTasks = async (req, res) => {
  // Implement logic to get all tasks for the authenticated user

  try {
      const Tasks = await TaskModel.find();
      res.status(200).json({Tasks, messsage:"Data Fetched Sucessfuly"});
  } catch (error) {
    console.error("error  : ", error);
    res.status(500).json({messsage: "Error during Fetching all tasks"});
  }
};

const GetTaskByStatus = async (req, res) => {
  // Implement logic to get a specific task by ID for the authenticated user
  try {
    
  const statusParamas = req.query.status;
  const status = statusParamas.trim().toLowerCase();
  const Tasks = await TaskModel.find({status: status});
  res.status(200).json({Tasks, messsage: Tasks});
  
  } catch (error) {
    res.status(500).json({messsage: "Error during Fetching Tasks"});
  }

};

const UpdateTask = async (req, res) => {
  // Implement logic to update a specific task by ID for the authenticated user
};

const DeleteTask = async (req, res) => {
  // Implement logic to delete a specific task by ID for the authenticated user
};

export { CreateTask, GetAllTasks, GetTaskByStatus, UpdateTask, DeleteTask };