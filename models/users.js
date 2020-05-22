import * as mongo from 'mongoose'

const userSchema = new mongo.Schema({
  institute: {
    type: String,
    required: true
  },
  rollNo: String,
  userRole: {
    type: String
  },
  emailVerified: {
    type: Boolean,
    default: false
  },
  name: {
      first: {
        type: String,
        required: true,
      },
      last: {
        type: String,
        required: true,
      }
  },
  username: {
    type: String,
    required: true
  },
  avatar: {
    type: String,
    default: "https://lh3.googleusercontent.com/proxy/5BsETvHnY6_K22SnYUd_w0LaPD0pUuJ1IH7HZcWEmMDtMOqW4fiodDmw7q-cTGAGH9zx21SSRbiJka4hoD4"
  },
  email: {
    type: String,
    required: true,
    min: 6,
    max: 255,
  },
  password: {
    type: String,
    required: true,
    min: 12,
    max: 1024,
  },
  mobile: {
    type: Number,
    required: true,
    min: 10
  },
  dateCreated: {
    type: Date,
    default: Date.now,
  },
  bio:{
    dob: {
      type: Date,
      required: true
    },
    gender: {
      type: String,
      required: true
    },
    socialLinks: {
      facebook: String,
      instagram: String,
      linkedIn: String
    }
  }
});

module.exports = mongoose.model("User", userSchema);
