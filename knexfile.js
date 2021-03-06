// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: {
    client: 'mysql',
    connection: {
      host: '127.0.0.1',
      user: 'root',
      password: ':rootroot',
      database: 'injectdb',
      charset: 'utf8'
    },
  },
};

module.exports = {
  production: {
    client: 'mysql',
    connection: process.env.JAWSDB_URL,
  }
};

// const connections = {
//   development: {
//     client: 'mysql',
//     connection: {
//       host: '127.0.0.1',
//       user: 'root',
//       password: ':rootroot',
//       database: 'injectdb',
//       charset: 'utf8'
//     },
//   },
//   production: {
//     client: 'mysql',
//     connection: process.env.JAWSDB_URL,
//   },
// };

// module.exports = 
//   process.env.NODE_ENV === 'production'
//     ? connections.production
//     : connections.development;