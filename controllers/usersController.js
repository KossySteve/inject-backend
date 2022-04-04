const knex = require('knex')(require('../knexfile').development);
const bcrypt = require('bcrypt');
const authorize = require("../middleware/authorize");
const jwt = require('jsonwebtoken');


exports.getAll = (_req, res) => {
  knex('users')
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((err) =>
      res.status(400).send(`Error retrieving users: ${err}`)
    );
};


exports.getOne = (req, res) => {
  knex('users')
      .where({'users.id': req.params.userId})
      .first()
      .select(
          'users.id as user_id',
          'users.name as user_name',
          'users.email',
          'users.password',
          'users.phone',
          'users.position',
          'users.linkedInUrl',
          'users.resumeUrl',
      )
      //.join('ice_cream_flavors', 'ice_cream_flavors.id', 'users.ice_cream_flavor_id')
      .then((usersRecords) => {
          res.json(usersRecords);
      })
}


//register 
// POST
exports.register = (req, res) => {
    //get user details from the request body
    const { name, email, password, phone, position, linkedInUrl, resumeUrl} = req.body;

    if (!name || !email || !password || !phone || !position || !linkedInUrl || !resumeUrl) {
        return res.status(400).send({
            message: "Please enter the required fields"
        })
    }

    const hashedPassword = bcrypt.hashSync(password, 10)

    //save the information to our database
    knex('users')
       .insert({...req.body, password: hashedPassword})
        .then(() => {
            res.status(201).send({
                message: "Registered Successfully"
            })
        })
        .catch(() => {
            res.status(500).send({
                message: "Error registering user"
            })
        })
}
exports.login = (req, res) => {
    //capture the email and password from request body
    const { email, password } = req.body;

    //verify that the email and password exist
    if (!email || !password) {
        return res.status(400).send({
            message: "Please enter the required fields"
        })
    }

    //lookup in our database that the email & password exist there, and that they are correct
    knex('users')
        .where({ email: email })
        .first()
        .then(user => {
            const isPasswordCorrent = bcrypt.compareSync(password, user.password)

            //if incorrect, send an error
            if (!isPasswordCorrent) {
                return res.status(400).send({
                    message: "Invalid Password. Please try again"
                })
            }

            //if correct, issue a JWT
            const token = jwt.sign(
                {
                    id: user.id,
                    email: user.email
                },
                'mySecretPasswordKey',
                // {
                //     expiresIn: '24h'
                // }
            )
            res.status(200).json({ token: token })

        })
        .catch(() => {
            res.status(400).send({
                message: "email is not valid"
            })
        })
}
exports.current = (req, res) => {
        knex('users')
            .where({ email: req.decoded.email })
            .first()
            .then(user => {
                delete user.password;
                res.json(user)
            })
}



