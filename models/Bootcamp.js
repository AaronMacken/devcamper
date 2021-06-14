const mongoose = require("mongoose");

// create a Schema for your data model
// takes an object with what it should have
const BootcampSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      // instead of just passing `true`, you can pass in an array with
      // the boolean, and a message
      required: [true, "Please add a name"],
      // no two bootcamps can have the same name
      unique: true,
      // trim white space
      trim: true,
      maxlength: [50, "Name can not be more than 50 characters"],
    },
    // a slug is a URL friendly version of the name
    // can be used in place of an ID when the FE wants to request specific data
    slug: String,
    description: {
      type: String,
      required: [true, "Please add a description"],
      maxlength: [500, "Description can not be more than 500 characters"],
    },
    website: {
      type: String,
      // validation for ensuring the website string is legit
      match: [
        /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
        "Please use a valid URL with HTTP or HTTPS",
      ],
    },
    phone: {
      type: String,
      maxlength: [20, "Phone number can not be longer than 20 characters"],
    },
    email: {
      type: String,
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Please add a valid email"],
    },
    address: {
      type: String,
      required: [true, "Please add an address"],
    },
    location: {
      // GeoJSON Point
      type: {
        type: String,
        enum: ["Point"],
      },
      coordinates: {
        type: [Number],
        index: "2dsphere",
      },
      formattedAddress: String,
      street: String,
      city: String,
      state: String,
      zipcode: String,
      country: String,
    },
    careers: {
      // Array of strings
      type: [String],
      required: true,
      // enum is a group of constants
      enum: ["Web Development", "Mobile Development", "UI/UX", "Data Science", "Business", "Other"],
    },
    averageRating: {
      type: Number,
      min: [1, "Rating must be at least 1"],
      max: [10, "Rating must can not be more than 10"],
    },
    averageCost: Number,
    photo: {
      type: String,
      default: 'no-photo.jpg'
    },
    housing: {
      type: Boolean,
      default: false,
    },
    jobAssistance: {
      type: Boolean,
      default: false,
    },
    jobGuarantee: {
      type: Boolean,
      default: false,
    },
    acceptGi: {
      type: Boolean,
      default: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
});

// Create a Model with the name of `Bootcamp` with the `BootcampSchema`
module.exports = mongoose.model('Bootcamp', BootcampSchema);
