const router = require('express').Router();
const jobsApplicationController = require('../controllers/jobsApplicationController');

router.route('/')
    .get(jobsApplicationController.getAllApplications) // get all the applications for all job
    .post(jobsApplicationController.addJobApplication); // apply for a job

router.route('/:jobId').get(jobsApplicationController.getJobApplicationByJobId); // get all applications for a particular job




module.exports = router;