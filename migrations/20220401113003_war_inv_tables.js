exports.up = function (knex) {
    return knex.schema
      .createTable('users', (table) => {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.string('password').notNullable();
        table.string('phone').notNullable();
        table.string('email').notNullable();
        table.string('position').notNullable();
        table.string('email').notNullable();
        table.string('linkedInUrl').notNullable();
        table.string('resumeUrl').notNullable();
      })
      .createTable('jobs', (table) => {
        table.increments('id').primary();
        table.string('Company').notNullable();
        table.string('email').notNullable();
        table.string('phone').nullable();
        table.string('address').notNullable().defaultTo('Store Manager');
        table.string('startDate').notNullable();
        table.string('endDate').notNullable();
        table.string('position').notNullable();
        table.string('pay').notNullable();
        table.string('description').notNullable();
        table
          .integer('user_id')
          .unsigned()
          .notNullable()
          .references('id')
          .inTable('users')
          .onUpdate('CASCADE')
          .onDelete('CASCADE');
        table.timestamp('updated_at').defaultTo(knex.fn.now());
      })

      //third table for user_id and job_id
      .createTable('job_applicant', (table)=>{
        table.increments('id').primary();
        table
          .integer('user_id')
          .unsigned()
          .notNullable()
          .references('id')
          .inTable('users')
          .onUpdate('CASCADE')
          .onDelete('CASCADE');
          table
          .integer('job_id')
          .unsigned()
          .notNullable()
          .references('id')
          .inTable('jobs')
          .onUpdate('CASCADE')
          .onDelete('CASCADE');
          table.timestamp('updated_at').defaultTo(knex.fn.now());
      })
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTable('users').dropTable('jobs');
  };