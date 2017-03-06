// controllers/auth.ctrl.js

const AuthModule   = require('../modules/AuthModule');  
const TokenService = require('../modules/TokenService');

module.exports = {  
    facebookAuth,
    retrieveUser,
    generateToken
};

function facebookAuth(req, res, next) {  
    const options = {
        code: req.body.code,
        clientId: req.body.clientId,
        redirectUri: req.body.redirectUri
    };

    AuthModule.facebookAuthentication(options, (err, response) => {
        if(err) return res.status(401).json({err: 'Error during facebook oauth'});

        // for larger apps recommended to namespace req variables
        req.authObject = response;

        next();
    });
}

// Here we will generate the user or retrieve existing one to pass for our token generator
function retrieveUser(req, res, next) {  
    if(!req.authObject) return res.status(401).json({err: "Error while fetching user"});

    const userToRetrieve = {
        user: req.authObject.user,
        type: req.authObject.type
    };

   AuthModule.createOrRetrieveUser(userToRetrieve, (err, user) => {
        if(err || !user) return res.status(401).json({err: 'Error while fetching user'});

        req.user = user;

        next();
    });
}

// The last Middleware in the chain
// reponsible for returning the generated token back to client
function generateToken(req, res, next) {  
    TokenService.createToken({user: req.user}, (err, token) => {
        if(err) return next({status: 401, err: 'User Validation failed'});

        req.genertedToken = token;

        next();
    });
}