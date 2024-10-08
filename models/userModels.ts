import mongoose, {Document, Schema} from "mongoose";

interface User extends Document {
    username: string
    email: string
    password: string
}

const UserSchema: Schema<User> = new Schema({
    username:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    }
}, {
    timestamps: true 
})
const user = mongoose.model<User>('user', UserSchema)

export default user 