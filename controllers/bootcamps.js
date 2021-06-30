// Bootcamp is our model that we can call create, update, find, delete on
const Bootcamp = require("../models/Bootcamp");

// @desc    get all bootcamps
// @route   GET /api/v1/bootcamps
// @access  Public
exports.getBootcamps = async (req, res, next) => {
    try {
        // Model.find() will find all
        const bootcamps = await Bootcamp.find();

        res.status(200).json({ success: true, count: bootcamps.length, data: bootcamps });
    } catch (error) {
        res.status(400).json({ success: false });
    }

//   res.status(200).json({ success: true, msg: "show all bootcamps", hello: req.hello });
};

// @desc    get single bootcamps
// @route   GET /api/v1/bootcamps/:id
// @access  Public
exports.getBootcamp = async (req, res, next) => {
    try {
        const bootcamp = await Bootcamp.findById(req.params.id);

        // if ID was formatted correctly, but does not exist in the DB
        // need to return or we'll get the "headers already sent" error (trying to send 2 statuses)
        if (!bootcamp) {
            return res.status(400).json({ success: false });
        }

        res.status(200).json({ success: true, data: bootcamp });
    } catch (error) {
        // if improperly formatted ID or something else went wrong

        // Instead of manually sending back an error, we can use "next" and pass in the error
        // next is given to us by express, will return an error HTML page by default, but we want to send back JSON
        // so we will need to make a custom error handler - middleware/error.js
        // res.status(400).json({ success: false });

        next(error);
    }

//   res.status(200).json({ success: true, msg: `get bootcamp ${req.params.id}` });
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
exports.updateBootcamp = async (req, res, next) => {
    // use the URL ID param as first argument, 
    // and the body data coming from the user as the second
    // third param is an `options` object
    // new: true - send back the newly updated object in the response
    // runValidators - run our mongoose validators so the data we're updating is correct

    try {
        const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
    
        // if no bootcamp was found, fail
        if (!bootcamp) {
            return res.status(400).json({ success: false });
        }
    
        res.status(200).json({ success: true, data: bootcamp });
    } catch (error) {
        res.status(400).json({ success: false });
    }


    // res.status(200).json({ success: true, msg: `Update bootcamp ${req.params.id}` });
};

// @desc    delete a bootcamp
// @route   DELETE /api/v1/bootcamps/:id
// @access  Private
exports.deleteBootcamp = async (req, res, next) => {
    try {
        const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);
    
        // if no bootcamp was found, fail
        if (!bootcamp) {
            return res.status(400).json({ success: false });
        }
    
        res.status(200).json({ success: true, data: {} });
    } catch (error) {
        res.status(400).json({ success: false });
    }
};
