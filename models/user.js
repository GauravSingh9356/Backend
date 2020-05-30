const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

  _id: mongoose.Schema.Types.ObjectId,
  firstName: {
      type: String,
      required: true,
  },
  lastName: {
      type: String,
      required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
  },
  password: {
    type: String,
    required: true,
    min: 12,
    max: 1024,
  },
  userRole: {
    type: String,
    required: true
  },
  institute: {
    type: String,
    required: true
  },
  rollNo: String,
  emailVerified: {
    type: Boolean,
    default: false
  },
  avatar: {
    type: String,
    default: "https://lh3.googleusercontent.com/proxy/5BsETvHnY6_K22SnYUd_w0LaPD0pUuJ1IH7HZcWEmMDtMOqW4fiodDmw7q-cTGAGH9zx21SSRbiJka4hoD4"
  },
  mobile: {
    type: Number,
    min: 10
  },
  dateCreated: {
    type: Date,
    default: Date.now,
  },
  bio:{
    dob: {
      type: Date,
    },
    gender: {
      type: String,
    },
    socialLinks: {
      facebook: String,
      instagram: String,
      linkedIn: String
    }
  },
  messageToken: {
    android: String,
    ios: String,
    web: String,
  }
});

module.exports = mongoose.model("User", userSchema);
