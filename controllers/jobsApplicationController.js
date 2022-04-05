const knex = require("knex")(require("../knexfile").development);
const authorize = require("../middleware/authorize");

exports.getAllApplications = (_req, res) => {
  knex("job_applicant")
    .then((applicantions) => {
      console.log(applicantions);
      res.status(200).json(applicantions);
    })
    .catch((err) =>
      res.status(400).send(`Error retrieving applicants: ${err}`)
    );
};

// first all jobs which user posted from jobs table
// and then use the id to find jobs users attached to it on job_applicants table

exports.getJobApplicationByJobId = (req, res) => {
  query = knex("users").whereIn(
    "id",
    knex("job_applicant").select("user_id").where("job_id", req.params.jobId)
  );
  query.then((usersRecords) => {
    res.json(usersRecords);
  });
};

exports.addJobApplication = (req, res) => {
  //user_id comes from current user while job_id comes from
  const { jobId, userId } = req.body;
  if (!jobId || !userId) {
    res.status(400).send({
      message: "Please enter the required fields.",
    });
  } else {
    knex("job_applicant")
      .insert({ job_id: parseInt(jobId), user_id: parseInt(userId) })
      .then(() => {
        res.status(200).send({
          message: "Your application was successful.",
        });
      });
  }
};
