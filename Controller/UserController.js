import UserModel from "../Model/UserModel.js";
import  argon2  from "argon2";
import sendmail from "../utility/nodemailer.js";
import jwt from "jsonwebtoken";
import TaskWalletModel from "../Model/TaskWalletModel.js";
// Registration Handler Function

const RegisterUser = async (req, res) => {
  const { username, email, password } = req.body;

    try {  
        // Check if user already exists
        const existingUser = await UserModel.findOne({ 
            $or: [
                {email: email},
            ]
        });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }


        // Hash the password
        const hashedPassword = await argon2.hash(password);

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
                
        const token = await jwt.sign({userId: newUser._id},process.env.JWT_SECRET,{expiresIn: '5min'});

        const link = `http://localhost:5173/verify-user/${token}`;       
        try {
            
        await sendmail(email, "Validate Email Notification", ` Click Here if you want to validate Your account ${link} 
                            Your validation link will be Expired in less than 5 minutes.`);
            
        res.status(201).json({ message: "Check On your email to verify email in order to login" });
        } catch (error) {
            console.log("error during sending email: ", error);
        }

    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ message: "Error registering user", error });
    }
};

// Validate Registered User

const validateUser = async (req, res) => {
    const {token} = req.body;

    try {
            
        const valideToken = jwt.verify(token,process.env.JWT_SECRET);
        const verifyUser = await UserModel.findById(valideToken.userId);
        if(!verifyUser){
            res.status(401).json({message: "Invalid Email Try again later."});
        }

        res.status(201).json({message: "Email Validated Successfully"});

    } catch (error) { 
        if(error.name == "TokenExpiredError") {
        return res.status(401).json({
            success: false,
            message: "This reset Link has Expired. Please request a new one."
        });
    }
    console.error("error is this: ", error);
    res.status(500).json({message: "Something Went wrong. Please try again later."});
        console.error("error during creating: ", error);
    }
    
}

// Login Handler Function

const LoginUser = async (req, res) => {
  const { email, password } = req.body;
    try {
        // Find user by username
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        // Verify password
        const isPasswordValid = await argon2.verify(user.password, password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        // Generate JWT token (to be implemented)
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "2h" });
        const userData = {
            username: user.username,
            email: user.email
        }
        res.status(200).json({ message: "Login successful", token, user: userData});
    } catch (error) {
        console.error("error is this : ", error);
        res.status(500).json({ message: "Error logging in" });
    }
};

const LogoutUser = async (req, res) => {
  // Implement logout logic here (e.g., clear session or token)


  try {
        res.clearCookie("token", {
         httpOnly: true,
         secure: true,
         sameSite: "strict"
      });

      return res.status(200).json({
         message: "Logged out successfully"
      });

  } catch (error) {
        if(error.name === "TokenExpiredError"){
            return res.status().json({message: "Login Again inorder to Continue"});
        }
        res.status(500).json({success: false, message: "Error on server Try again later."})
  }
  
};

const ChangePassword = async (req, res) => {
  const { token, oldPassword, newPassword } = req.body;
  
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const User = await UserModel.findById(decodedToken.userId);

    if(!User){
        return res.status(404).json({message: "User not Found"});
    }

    const hashedNewpassword = await argon2.hash(newPassword);

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


export { RegisterUser, forgottenPassword, LoginUser , LogoutUser, ChangePassword, validateUser};

