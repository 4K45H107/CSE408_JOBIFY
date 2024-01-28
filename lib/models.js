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
    phone:{
        type:String,
        required:true,
        min:3,
        max:20,
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

const jobSchema = new mongoose.Schema({
    title: { 
        type: String, 
        required: true 
    },
    company: { 
        type: String, 
        required: true 
    },
    provider: { 
        type: String 
    },
    location: { 
        country:{
            type:String,
            required: true
        },
        city:{
            type:String
        }
    },
    salary: { 
        type: String 
    },
    description: { 
        type: String 
    },
    posted_at: { 
        type: Date, 
        default: Date.now 
    }
},{timestamps:true});

const employerSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true,
        min: 3,
        max: 50,
    },
    email:{
        type: String,
        required: true,
        unique: true,
        min:1, 
        max: 50,
    },
    password:{
        type: String,
        required: true,
        min:3,
    },
    fullname: {
        type: String,
    },
    designation:{
        type: String,
    },
    phone:{
        type:String,
    },
    company:{
        name:{
            type:String,
            required: true
        },
        branch:{
            type:String,
            required: true
        }
    },
},{timestamps:true});


export const User = mongoose.models?.User || mongoose.model("users",userSchema);
export const Jobs = mongoose.models?.Jobs || mongoose.model("jobs",jobSchema);
export const Employers = mongoose.models?. Employers || mongoose.model("employers", employerSchema);