import TaskModel from "../Model/TaskModel.js";
import TaskWalletModel from "../Model/TaskWalletModel.js";

const GetDashboardStats = async (req, res) => {
   console.log("Dashboard controller reached");

  try {
    const userId = req.user.userId; // from auth middleware

    console.log("User ID:", userId);

    const wallet = await TaskWalletModel.findOne({
      User: userId,
    });

    if (!wallet) {
      return res.status(404).json({
        message: "Task wallet not found",
      });
    }

    const completedTasks = await TaskModel.countDocuments({
      UserId: userId,
      status: "completed",
    });

    res.status(200).json({
      availableTasks:
        wallet.InitialTask - wallet.CustumedTask,

      consumedTasks:
        wallet.CustumedTask,

      initialTasks:
        wallet.InitialTask,

      completedTasks,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error fetching dashboard stats",
    });
  }
};

export default GetDashboardStats;