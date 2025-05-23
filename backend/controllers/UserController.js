const UserModel = require("../models/UserModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await UserModel.findOne({ email });
        if (user) {
            return res.status(400).json({
                success: false,
                message: "User already exists"
            })
        }
        const profilePicture = req.file ? req.file.path : null;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new UserModel(
            {
                ...req.body,
                password: hashedPassword,
                profilePicture
            }
        )
        await newUser.save();
        res.status(201).json({
            success: true,
            message: "User created successfully",
            user: newUser
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        })
    }
}
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email }).select("+password");
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid email or password"
            })
        }
        const isMatch = await bcrypt.compare(String(password), user.password);
        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Invalid email or password"
            })
        }
        const jwtToken = jwt.sign(
            { name: user.name, email: user.email, image: user.profilePicture, role: user.role, id: user._id },
            process.env.TOKEN_SECRET,
            { expiresIn: "1h" }
        );
        res.status(200).json({
            success: true,
            message: "User logged in successfully",
            jwtToken,
            user: {
                name: user.name,
                email: user.email,
                image: user.profilePicture,
                role: user.role,
                _id: user._id
            }
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        })
    }
}

const getUser = async (req, res) => {
    try {
        const getUsers = await UserModel.find();
        res.status(200).json({
            success: true,
            message: "Users fetched successfully",
            users: getUsers
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        })
    }
}
const getUserByEmail = async (req, res) => {
    try {
        const email = req.query.email;
        if (!email) {
            return res.status(400).json({ success: false, message: "Email is required" })
        }
        const user = await UserModel.findOne({ email })
        res.status(200).json({
            success: true,
            message: "User fetched successfully",
            user: {
                name: user.name,
                email: user.email,
                image: user.profilePicture,
            }
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        })
    }
}
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const deleteUser = await UserModel.findByIdAndDelete(id)
        res.status(200).json({
            success: true,
            message: "User deleted successfully",
            user: deleteUser
        })
    } catch (error) {
        console.log(error)

    }
}
const makeRole = async (req, res) => {
    try {
        const { id } = req.params;
        const { role } = req.body
        const updateRole = await UserModel.findByIdAndUpdate(
            { _id: id },
            { role: role },
            { new: true }
        )
        res.status(200).json({
            success: true,
            message: "User role updated successfully",
            data: updateRole
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success:false,
            message:"internal server error"
        })
    }
}
const getAllGroomers=async(req,res)=>{
    try {
        const groomers = await UserModel.find({ role: "groomer" });
        res.status(200).json({
            success: true,
            message: "Groomers fetched successfully",
            groomers
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        })
    }
}

module.exports = { createUser, loginUser, getUser, getUserByEmail,deleteUser,makeRole,getAllGroomers };

