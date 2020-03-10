const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const { ErrorMessages } = require('../utilities');

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    ignoreExpiration: false,
    secretOrKey: process.env.SECRET
};

passport.use(new JwtStrategy(opts, (token, done) => {
    if (token.ExpiryAt*1000 < Date.now()) {
        return done(null, false, {
            status: 401,
            error: {
                message: ErrorMessages.TOKEN_EXPIRED
            }
        });
    }
    done(null, token, null);
}));
