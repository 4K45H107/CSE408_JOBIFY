import mongoose from "mongoose";

 const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        min:3,
        max:20,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        max:50,
    }, 
    password:{
        type:String,
        required:true,
        min:1,
    },
    fullname:{
        type:String,
        required:true,
        min:3,
        max:50,
    },   
    profile:{
        location:{
            type:String,
            required:true,
            min:3,
        },
        skills:[{
            type:String,
            required:false,
            min:1,
        }],
        education:{
            type:String,
            required:true,
            min:3,
            max:50,
        },
    },
    contact:{
        phone:{
            type:String,
            required:true,
            min:3,
            max:20,
        },
        email:{
            type:String,
            required:true,
            min:3,
            max:50,
        },
    },
    privacySettings:{
        notifications:{
            type: Boolean,
        },
        publicProfile: {
            type:Boolean,
        },
    },
    job_preferences:{
        locations:{
            type:String,
            required:true,
            min:3,
        },
        salary_range:{
            type:String,
            required:true,
            min:3,
            max:50,
        },
        job_type:[{
            type:String,
            required:true,
            min:3,
        }],
    },
    applications:{
        job_id:{
            type:String,
            required:false,
            min:3,
        },
    },
    // profilePicture:{
    //     type:String,
    //     default:"",
    // },
},{timestamps:true});


export const User = mongoose.models?.User || mongoose.model("user", userSchema);