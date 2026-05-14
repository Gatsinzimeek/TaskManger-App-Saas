const RegisterUser = async (req, res) => {
  const { username, email, password } = req.body;
};

const LoginUser = async (req, res) => {
  const { username, password } = req.body;
};

const LogoutUser = async (req, res) => {
  // Implement logout logic here (e.g., clear session or token)
};

const ChangePassword = async (req, res) => {
  const { userId, oldPassword, newPassword } = req.body;
};  


export { RegisterUser, LoginUser };

