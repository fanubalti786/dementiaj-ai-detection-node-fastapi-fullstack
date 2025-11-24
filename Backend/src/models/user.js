import dotenv from "dotenv";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
dotenv.config();

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: [true, "Name is required"],
    },
    email: {
        type: String,
        required: [true, "Email is required"],
    },
    password: {
        type: String,
        required: [true, "password is required"],
        minLength: [8, "Password must be at least 8 characters long"],
    },
    avatar: {
            type: String,
    },
      type: {
        type: String,
        enum: ["admin", "user"],  
        default: "user"          
    }
}, {timestamps: true});


userSchema.pre("save", async function (next) {
    if (!this.isModified("password"))
    {
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);
    
});


userSchema.methods.comparePassword = async function (password) {
    console.log(this.password);
    return await bcrypt.compare(password, this.password);
};


userSchema.methods.generatejsonwebtoken = function () {
    console.log(process.env.JWT_SECRET_KEY);
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRES,
    });
};




export const User = mongoose.model("User", userSchema)