// Bootcamp is our model that we can call create, update, find, delete on
const Bootcamp = require("../models/Bootcamp");

// @desc    get all bootcamps
// @route   GET /api/v1/bootcamps
// @access  Public
exports.getBootcamps = (req, res, next) => {
  res.status(200).json({ success: true, msg: "show all bootcamps", hello: req.hello });
};

// @desc    get single bootcamps
// @route   GET /api/v1/bootcamps/:id
// @access  Public
exports.getBootcamp = (req, res, next) => {
  res.status(200).json({ success: true, msg: `get bootcamp ${req.params.id}` });
};

// @desc    create a bootcamp
// @route   POST /api/v1/bootcamps
// @access  Private
exports.createBootcamp = async (req, res, next) => {
  // data comes from req.body
  // in order to use req.body -- we need to add a piece of middleware (body parser) to server.js

  // create a bootcamp object from the bootcamp model / req.body data
  // Bootcamp.create will return a promise since it depends on the DB to fulfill an action
  // so this should be an async function, or use .then
  // use try catch to handle errors, duplicate values on the model can cause errors
  // we will, however, making a universal error handler
  try {
      const bootcamp = await Bootcamp.create(req.body);

      res.status(201).json({
      success: true,
      data: bootcamp,
    });
  } catch (error) {
      res.status(400).json({
          success: false
      })
  }

  // 201 status - we created something
};

// @desc    update a bootcamp
// @route   PUT /api/v1/bootcamps/:id
// @access  Private
exports.updateBootcamp = (req, res, next) => {
  res.status(200).json({ success: true, msg: `Update bootcamp ${req.params.id}` });
};

// @desc    delete a bootcamp
// @route   DELETE /api/v1/bootcamps/:id
// @access  Private
exports.deleteBootcamp = (req, res, next) => {
  res.status(200).json({ success: true, msg: `Delete bootcamp ${req.params.id}` });
};
