const User = require("./user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const apiResponse = require("../../utils/apiResponse.utils");

// Register a new user
const registerUser = async (req, res, next) => {
  try {
    const { name, phone, email, password, role } = req.body;

    // Check if email or phone exists
    const existingUser = await User.findOne({ $or: [{ email }, { phone }] });
    if (existingUser) {
      return apiResponse.error(res, "User already exists", 400);
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      phone,
      email,
      password: hashedPassword,
      role,
    });

    return apiResponse.success(res, "User registered successfully", { 
      id: user._id, 
      name: user.name, 
      email: user.email, 
      role: user.role 
    }, 201);
  } catch (err) {
    next(err);
  }
};

// Login user
const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return apiResponse.error(res, "Invalid credentials", 400);
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return apiResponse.error(res, "Invalid credentials", 400);
    }

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "7d" });

    return apiResponse.success(res, "Login successful", { 
      token,
      id: user._id, 
      name: user.name, 
      email: user.email, 
      role: user.role 
    });
  } catch (err) {
    next(err);
  }
};

// Get all users (admin only)
const getUsers = async (req, res, next) => {
  try {
    const users = await User.find().select("-password").lean();
    return apiResponse.success(res, "Users fetched successfully", users);
  } catch (err) {
    next(err);
  }
};

module.exports = { registerUser, loginUser, getUsers };