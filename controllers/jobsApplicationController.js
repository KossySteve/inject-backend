const knex = require('knex')(require('../knexfile').development);
const authorize = require("../middleware/authorize");


// first all jobs which user posted from jobs table 
// and then use the id to find jobs users attached to it on job_applicants table
// exports.getJobApplication =(req, res) => {
//     knex('users')
//     .whereIn({id: knex('job_applicant')
//             .select('user_id').where({job_id: req.params.jobId}) 
//             })
//         .then((usersRecords) => {
//             res.json(usersRecords);
//         })

// }

exports.getAllApplications = (_req, res) => {
    knex('job_applicant')
      .then((jobAppRecords) => {
        res.status(200).json(jobAppRecords);
      })
      .catch((err) =>
        res.status(400).send(`Error retrieving job applicants: ${err}`)
      );
  };

exports.getJobApplicationByJobId =(req, res) => {
    query = knex('users').whereIn('id',knex('job_applicant').select('user_id').where('job_id', req.params.jobId) )
    query.then((usersRecords) => { res.json(usersRecords) })
}






// const coursesOfSingleStudent = await knex('courses').whereIn('id',
//            knex('student_courses').select('course_id').where('student_id', studentId)
// )
//applicantsOfSingleJob = await knex('users').whereIn('id',
//            knex('job_applicant').select('user_id').where('job_id', jobId) )

exports.addJobApplication = (req, res) => {
    //user_id comes from current user while job_id comes from
    if (!req.body.job_id || !req.body.user_id ) {
        res.status(400).send({
            message: "Please enter the required fields oo."
        })
    } else {
        knex('job_applicant')
            .insert(req.body)
            .then(() => {
                res.status(200).send({
                    message: "Your application was successful."
                })
            })
    }
  }

