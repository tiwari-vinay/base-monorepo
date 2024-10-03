import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    username: {type: 'string',reqired: true}, 
    email: {type: String, required : true}, 
    authentication: {
        password : {type: 'string',required: true, select : false}, 
        salt: {type: 'string', select: false}, 
        sessionToken : {type: String, select: false}
    }
})

export const UserModel = mongoose.model("User", userSchema);

export const getUsers = ()=>{
    UserModel.find
}