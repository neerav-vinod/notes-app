import mongoose, { Schema } from "mongoose";
import User from "./user";

const topicSchema = new Schema(
    {
        title:String,
        description:String,
        userEmail:{
            type:String,
            ref:User,
            required:true
        }
    },
    {
        timestamps:true,
    }
)

const Topic = mongoose.models.Topic || mongoose.model("Topic",topicSchema);

export default Topic;