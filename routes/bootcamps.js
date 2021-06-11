const express = require('express');
const router = express.Router();

const { 
    getBootcamps,
    getBootcamp,
    createBootcamp,
    updateBootcamp,
    deleteBootcamp
 } = require('../controllers/bootcamps');

// if route is /api/v1/bootcamps
router.route('/')
 .get(getBootcamps)
 .post(createBootcamp);

// if route is /api/v1/bootcamps/:id
router.route('/:id')
 .get(getBootcamp)
 .put(updateBootcamp)
 .delete(deleteBootcamp);

module.exports = router;