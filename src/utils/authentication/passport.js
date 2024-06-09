import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import passport from "passport";
import { User } from "../../db/models/user.model";

//JWT Strategy
let accessOptions,
  refreshOptions = {};

accessOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
accessOptions.secretOrKey = process.env.JWT_ACCESS_TOKEN_SECRET;

refreshOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
refreshOptions.secretOrKey = process.env.JWT_REFRESH_TOKEN_SECRET;

passport.use(
  "jwtAccess",
  new JwtStrategy(accessOptions, function (jwt_payload, done) {
    if (jwt_payload.exp >= 0) {
      const refreshToken = User.findOne({ _id: jwt_payload._id });
      
    }
  })
);

passport.use(
  "jwtRefresh",
  new JwtStrategy(refreshOptions, function (jwt_payload, done) {
    User.findOne({ id: jwt_payload.sub }, function (err, user) {
      if (err) {
        return done(err, false);
      }
      if (user) {
        req.user = user;
        return done(null, user);
      } else {
        return done(null, false);
        // or you could create a new account
      }
    });
  })
);

//Google Strategy
passport.use(
  "google",
  new GoogleStrategy(
    {
      clientID: process.env.CLIENTID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: process.env.CALLBACK_URL,
    },
    function (accessToken, refreshToken, profile, cb) {
      User.findOrCreate({ googleId: profile.id }, function (err, user) {
        if (err) {
          return done(err, false);
        }
        if (user) {
          req.user = user;
          return done(null, user);
        } else {
          return done(null, false);
          // or you could create a new account
        }
      });
    }
  )
);

const passportAuthenticateJWT = () => {
  return passport.authenticate("jwt", { session: false });
};
const passportAuthenticateGoogle = () => {
  return passport.authenticate("google", { session: false });
};

export { passportAuthenticateJWT, passportAuthenticateGoogle };
