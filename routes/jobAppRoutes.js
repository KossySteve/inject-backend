const router = require('express').Router();
const jobsController = require('../controllers/jobsApplicationController');
const authorize = require("../middleware/authorize");

router.route('/')
    .get(jobsController.getAllApplications)
    .post(jobsController.addJobApplication);


router.route('/:jobId').get(jobsController.getJobApplicationByJobId);




module.exports = router;