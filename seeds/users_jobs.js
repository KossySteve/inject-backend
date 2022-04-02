const jobData = require('../seed_data/jobData');
const userData = require('../seed_data/userData');

exports.seed = function (knex) {
  return knex('users')
    .del()
    .then(function () {
      return knex('users').insert(userData);
    })
    .then(() => {
      return knex('jobs').del();
    })
    .then(() => {
      return knex('jobs').insert(jobData);
    });
};