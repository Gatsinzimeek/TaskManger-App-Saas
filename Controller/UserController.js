import UserModel from "../Model/UserModel.js";
import  argon2d  from "argon2";
import jwt from "jsonwebtoken";
import sendmail from "../utility/nodemailer.js";
import TaskWalletModel from "../Model/TaskWalletModel.js";
// Registration Handler Function

const RegisterUser = async (req, res) => {
  const { username, email, password } = req.body;
  
    try {  
        // Check if user already exists
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        
        // Hash the password
        const hashedPassword = await argon2d.hash(password);

        // Create new user
        const newUser = new UserModel({
            username,
            email,
            password: hashedPassword
        });
        await newUser.save();
        await TaskWalletModel.create({
         User: newUser._id
        });
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ message: "Error registering user", error });
    }
};

// Login Handler Function

const LoginUser = async (req, res) => {
  const { username, password } = req.body;
    try {
        // Find user by username
        const user = await UserModel.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: "Invalid username or password" });
        }

        // Verify password
        const isPasswordValid = await argon2d.verify(user.password, password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid username or password" });
        }

        // Generate JWT token (to be implemented)
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.status(200).json({ message: "Login successful", token });
    } catch (error) {
        res.status(500).json({ message: "Error logging in", error });
    }
};

const LogoutUser = async (req, res) => {
  // Implement logout logic here (e.g., clear session or token)
  
};

const ChangePassword = async (req, res) => {
  const { token, oldPassword, newPassword } = req.body;
  
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const User = await UserModel.findById(decodedToken.userId);

    if(!User){
        return res.status(404).json({message: "User not Found"});
    }

    const hashedNewpassword = await argon2d.hash(newPassword);

    User.password = hashedNewpassword;
    await User.save();

    
    res.status(200).json({ message : "Password Change successfully"});

  } catch (error) {
    if(error.name == "TokenExpiredError") {
        return res.status(401).json({
            success: false,
            message: "This reset Link has Expired. Please request a new one."
        });
    }
    console.error("error is this: ", error)
    res.status(500).json({message: "Something Went wrong. Please try again later."});
  }
};  

const forgottenPassword = async (req, res) => {
    const {email} = req.body;
    try {

        const User = await UserModel.findOne({email});
        
        if(!User){
            return res.status(404).json({message: "User not Found"});
        }


        const token = await jwt.sign({userId: User._id}, process.env.JWT_SECRET, {expiresIn: "5min"});

        const link = `http://localhost:5000/api/change-password/${token}`;
        sendmail(email, "Password Change Notification", ` Click Here if you want to change Your password ${link} 
                            Your password link will be Expired in less than 5 minutes.`);

        res.status(200).json({message: "Password Link sent But will Expired within 5 Minutes"});

    } catch (error) {
        console.error("error during error ", error)
        res.status(500).json({message: "Error during Senting link"});
    }

}


export { RegisterUser, forgottenPassword, LoginUser , LogoutUser, ChangePassword };

