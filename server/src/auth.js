const jwt = require('passport-jwt');
const JWTStrategy = jwt.Strategy;
const ExtractJwt = jwt.ExtractJwt;

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'secret';
opts.issuer = 'waworks-stt';
opts.audience = 'waworks-stt';

module.exports = () => {
    return new JWTStrategy(opts, (token, done) => {
        console.log('Token: ' + token.sub);
        if (token.sub == 'goodUser') {
            done(null, {username: 'goodUser'});
        } else {
            done(null, false);
        }
    });
};
