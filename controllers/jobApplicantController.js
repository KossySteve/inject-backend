const knex = require('knex')(require('../knexfile').development);
const authorize = require("../middleware/authorize");



exports.getJobApplication = (req, res) => {
 const query = knex('jobs');
 if (req.query.position) {
  query.where({'jobs.position': req.query.position})
}

      query.then((jobs) => {
        res.status(200).json(jobs);
      })
      .catch((err) =>
        res.status(400).send(`Error retrieving jobs: ${err}`)
      )
  };


exports.postJobApplication = (req, res) => {
    const {jobId, userId} = req.body;
    if (!jobId || userId ) {
        res.status(400).send({
            message: "Please enter the required fields."
        })
    } else {
        knex('jobs')
            .insert(req.body)
            .then(newJob => {
                res.json(newJob)
            })
    }
  }

