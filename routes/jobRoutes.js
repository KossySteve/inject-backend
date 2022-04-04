const router = require('express').Router();
const jobsController = require('../controllers/jobsController');
const authorize = require("../middleware/authorize");

router.route('/')
    .get(jobsController.getJobs)
    .post(jobsController.addJob);

router.route('/:jobId')
    .put(jobsController.editJob)
    .delete(jobsController.deleteJob);

router.get('/position/:userPosition', jobsController.getJobsByPosition)


module.exports = router;
