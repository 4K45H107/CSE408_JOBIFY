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
        type: String,
        required: false,
        min: 3,
        max: 50,
      },
      job_type: [
        {
          type: String,
          required: false,
          min: 3,
        },
      ],
    },
    applications: {
      job_id: {
        type: String,
        required: false,
        min: 3,
      },
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

// export const Jobs = mongoose.models?.Jobs || mongoose.model("jobs", jobSchema);
// export const Employers =
//   mongoose.models?.Employers || mongoose.model("employers", employerSchema);
