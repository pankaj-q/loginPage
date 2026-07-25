import mongoose from 'mongoose';
import jwt from 'jsonwebtoken'

const postSchema = new mongoose.Schema({
    title : {
        type: String,
        required: true,
        upercase: true,
        trim: true,
    },

    description: {
        type: String,
        required: true,
        trim: true,

    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    image: {
        type: String,
        

    }
},{timestamps: true})

export default mongoose.model("Post", postSchema);