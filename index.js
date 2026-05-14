import express from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
const PORT =  5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/api/login", (req, res) => {
  const { username, password } = req.body;
});

app.post("/api/register", (req, res) => {
  const { username, email, password } = req.body;
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});