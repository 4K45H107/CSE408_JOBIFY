import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      min: 3,
      max: 20,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      max: 50,
    },
    password: {
      type: String,
      required: true,
      min: 1,
    },
    fullname: {
      type: String,
      required: false,
      min: 3,
      max: 50,
    },
    profile: {
      location: {
        type: String,
        required: false,
        min: 3,
      },
      skills: [
        {
          type: String,
          required: false,
          min: 1,
        },
      ],
      education: {
        type: String,
        required: false,
        min: 3,
        max: 50,
      },
    },
    phone: {
      type: String,
      required: false,
      min: 3,
      max: 20,
    },
    job_preferences: {
      locations: {
        type: String,
        required: false,
        min: 3,
      },
      salary_range: {
        type: Number,
        required: false
      },
      job_type: [
        {
          type: String,
          required: false,
          min: 3,
        },
      ],
    },
    photo:{
        type:String,
        default:"",
    },
  },
  { timestamps: true }
);

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    company: {
      type: String,
      required: true,
    },
    provider: {
      type: String,
    },
    location: {
      country: {
        type: String,
        required: true,
      },
      city: {
        type: String,
      },
    },
    salary: {
      minimum: {
        type: Number,
        required: true,
      },
      maximum: {
        type: Number,
        required: true,
      },
    },
    description: {
      type: String,
    },
    skill_test: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const employerSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      min: 3,
      max: 50,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      min: 1,
      max: 50,
    },
    password: {
      type: String,
      required: true,
      min: 3,
    },
    photo:{
      type:String,
      default:"",
  },
    fullname: {
      type: String,
    },
    designation: {
      type: String,
    },
    phone: {
      type: String,
    },
    company: {
      name: {
        type: String,
        required: false,
      },
      branch: {
        type: String,
        required: false,
      },
    },
  },
  { timestamps: true }
);

const companySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      max: 50,
    },
    email: {
      type: String,
      required: true,
      min: 1,
      max: 50,
    },
    designation: {
      type: String,
    },
    phone: {
      type: String,
    },
    
    branch: {
      type: String,
      required: false,
    },

    description: {
      type: String
    },
    logo: {
      type: String
    },
    cover: {
      type: String
    },
    numOfEmployees: {
      type: Number,
      required: true,
    }
    
  },
  { timestamps: true }
);

const bookmarkSchema = new mongoose. Schema(
  {
  job_id:
    {
    type: String
    }
  ,
  employer_id:{
    type: String,
    required: true
  }
},{timestamps: true}
);

const applicationSchema = new mongoose.Schema({
  job_id:{
    type: String,
    required: true
  },
  user_id:{
    type: String,
    required: true
  },
  status:{
    type: String,
    required: true
  }
 },
 {timestamps: true});

const questionSchema = new mongoose.Schema(
  { 
    title: {
      type: String,
      required: true
    },
    employer_id: { 
      type: String,
      required: true
    },
    job_id: {
      type: String,
      required: true
    },
    questions: [{
      question: {
        type: String,
        required: true
      },
      options: [{
        text:{
        type: String,
        required: true
      },
      correct: {
        type: Boolean,
        required: true
      }
    }
    ],
      
    }],
    
  },
  { timestamps: true }
);

const markSchema = new mongoose.Schema(
  {
  job_id:{
    type: String,
    required: true
  },
  user_id:{
    type: String,
    required: true
  },
  answers:[{
    question_id:{
      type: String,
      required: true
    },
    answer:{
      type: String,
      required: true
    }
  }
  ],
  result:{
    type: Number,
    required: true
  }

},{timestamps: true}
);

const recentSearchSchema = new mongoose.Schema(
  {
    user_id: {
      type: String,
      required: true
    },
    job_ids:[
      {
        type: String
      }
    ]
  },
  {timestamps: true}
);

export const User = mongoose.models["users"]
  ? mongoose.model("users")
  : mongoose.model("users", userSchema);

export const Jobs = mongoose.models["jobs"]
  ? mongoose.model("jobs")
  : mongoose.model("jobs", jobSchema);

export const Employers = mongoose.models["employers"]
  ? mongoose.model("employers")
  : mongoose.model("employers", employerSchema);

export const Companies = mongoose.models["companies"]
  ? mongoose.model("companies")
  : mongoose.model("companies", companySchema);

export const Bookmarks = mongoose.models["bookmarks"]
 ? mongoose.model("bookmarks")
 : mongoose.model("bookmarks", bookmarkSchema);

 export const Applications = mongoose.models["applications"]
 ? mongoose.model("applications")
 : mongoose.model("applications", applicationSchema);

 export const Questions = mongoose.models["questions"]
 ? mongoose.model("questions")
 : mongoose.model("questions", questionSchema);

 export const Marks = mongoose.models["marks"]
 ? mongoose.model("marks")
 : mongoose.model("marks", markSchema);

 export const Recent = mongoose.models["recent"]
 ? mongoose.model("recent")
 : mongoose.model("recent", recentSearchSchema);

// export const Jobs = mongoose.models?.Jobs || mongoose.model("jobs", jobSchema);
// export const Employers =
//   mongoose.models?.Employers || mongoose.model("employers", employerSchema);
