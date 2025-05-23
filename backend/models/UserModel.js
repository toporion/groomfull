const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide your name'],
        trim: true,
        minlength: [2, 'Name must be at least 2 characters long'],
        maxlength: [50, 'Name cannot exceed 50 characters']
    },
    email: {
        type: String,
        required: [true, 'Please provide your email'],
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email']
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        minlength: [6, 'Password must be at least 6 characters long'],
        select: false
    },
    role: {
        type: String,
        enum: ['user', 'admin', 'groomer'],
        default: 'user'
    },
    profilePicture: {
        type: String,
        default: ''
    },
    isActive: {
        type: Boolean,
        default: true
    },
    lastLogin: {
        type: Date
    },

    // Groomer-specific fields (optional)
    specialization: {
        type: String,
        trim: true
    },
    experience: {
        type: Number, // You could use Number of years
        min: 0
    },
    phone: {
        type: String,
        trim: true
    },
    address: {
        type: String,
        trim: true
    }

}, {
    timestamps: true
});

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;
