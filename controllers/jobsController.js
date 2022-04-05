const knex = require('knex')(require('../knexfile').development);
const authorize = require("../middleware/authorize");


exports.getJobs = (req, res) => {
 const query = knex('jobs');
 if (req.query.position) {
  query.where({position: req.query.position})
}

      query.then((jobs) => {
        res.status(200).json(jobs);
      })
      .catch((err) =>
        res.status(400).send(`Error retrieving jobs: ${err}`)
      )
  };

  exports.getJobsPosted = (req, res) => {
    knex('jobs')
        .where({'jobs.user_id': req.params.userId})
        .then((jobRecords) => {
            res.json(jobRecords);
        })
}

exports.getJobsByPosition = (req, res) => {
    knex('jobs')
        .where({'jobs.position': req.params.userPosition})
        .then((jobRecords) => {
            res.json(jobRecords);
        })
}

exports.addJob = (req, res) => {
  const {company, website, email, phone, address, startDate, endDate, position, pay, description, user_id} = req.body;
  if (!company || !website || !email || !phone || !address || !startDate || !endDate || !position || !pay || !description || !user_id) {
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

exports.editJob = (req, res) => {
  knex('jobs')
      .update(req.body)
      .where({id: req.params.jobId})
      .then(() => {
          res.send(`Job with id: ${req.params.jobId} has been updated`)
      })
      .catch(err => {
          res.status(400).send(`Error updating user ${req.params.jobId} ${err}`)
      })
}

exports.deleteJob = (req, res) => {
  knex('jobs')
      .delete()
      .where({id: req.params.jobId})
      .then(() => {
          res.status(204).send(`Job with id ${req.params.jobId} has been deleted`)
      })
      .catch(err => {
          res.status(400).send(`Error deleting user ${req.params.jobId} ${err}`)
      })
}
 


