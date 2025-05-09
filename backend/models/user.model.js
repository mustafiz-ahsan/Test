import mongoose from "mongoose";

const usersSchema = new mongoose.Schema(
    {
        Profile_type: {
            type: String,
            required: true,
        },
        Email: {
            type: String,
            required: true,
        },
        Password: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true, // createdAt, updatedAt
    }
);

const UsersModel = mongoose.model("User login info", usersSchema);

export default UsersModel;
