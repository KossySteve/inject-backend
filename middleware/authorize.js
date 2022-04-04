const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    //JWT will be part of the header format of header: { authorization: `Bearer ${authToken}` }

    const { authorization } = req.headers

    if (!authorization) {
        return res.status(400).send({
            message: 'Please login'
        })
    }

    //pull the token out of the header
    const authToken = authorization.split(' ')[1]

    // verify the jwt
    jwt.verify(authToken, 'mySecretPasswordKey', (err, decoded) => {
        if (err) {
            return res.status(401).send({
                message: "Invalid auth token"
            })
        }

        //send the decoded token with the next request
        req.decoded = decoded;
        next();
    });
};