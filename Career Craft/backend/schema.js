const mongoose = require('mongoose');
const bcrypt = require('bcrypt'); // For hashing passwords

// Define the User schema
const userSchema = new mongoose.Schema({
    Firstname: {
        type: String,
        required: true,
        trim: true
    },
    Lastname: {
        type: String,
        required: true,
        trim: true
    },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Hash the password before saving the user
userSchema.pre('save', async function (next) {
    if (this.isModified('password') || this.isNew) {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    }
    next();
});

// Method to compare input password with hashed password
userSchema.methods.comparePassword = async function (inputPassword) {
    return await bcrypt.compare(inputPassword, this.password);
};

// Create the User model from the schema
const User = mongoose.model('User', userSchema);

module.exports = User;
