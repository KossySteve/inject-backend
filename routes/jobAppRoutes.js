const router = require('express').Router();
const jobsApplicationController = require('../controllers/jobsApplicationController');

router.route('/')
    .get(jobsApplicationController.getAllApplications)
    .post(jobsApplicationController.addJobApplication);

router.route('/:jobId').get(jobsApplicationController.getJobApplicationByJobId);




module.exports = router;