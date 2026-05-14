import UserModel from "../Model/UserModel.js";
import argon2 from "argon2";
import jwt from "jsonwebtoken";

const RegisterUser = async (req, res) => {
  const { username, email, password } = req.body;
    try {  
        // Check if user already exists
        const existingUser = await UserModel.findOne({ email });
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
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ message: "Error registering user", error });
    }
};

const LoginUser = async (req, res) => {
  const { username, password } = req.body;
    try {
        // Find user by username
        const user = await UserModel.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: "Invalid username or password" });
        }

        // Verify password
        const isPasswordValid = await argon2.verify(user.password, password);
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
  const { userId, oldPassword, newPassword } = req.body;
};  


export { RegisterUser, LoginUser , LogoutUser, ChangePassword };

