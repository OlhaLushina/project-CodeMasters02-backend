const passport = require("passport");
const { Strategy } = require("passport-google-oauth2");
const { User } = require("../models/user");
const bcrypt = require("bcrypt");
const { nanoid } = require("nanoid");

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = process.env;

const googleParams = {
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: "https://project-codemasters02-backend.onrender.com/api/auth/google/callback",
  passReqToCallback: true,
};

// колбек який приймає функція Strategy
const googleCallback = async (req, accesToken, refreshToken, profile, done) => {
  try {
    const { email, displayName } = profile;
    const user = await User.findOne({ email });
    // Якщо юзер з таким email вже є  в базі - прокидуємо інформацію про нього в req.user, done-далі
    if (user) {
      return done(null, user);
    }

    // Якщо людини з такиим email немає - реєструємо
    const password = await bcrypt.hash(nanoid(), 10);
    const newUser = await User.create({ email, password, name: displayName });

    done(null, newUser);
  } catch (error) {
    done(error, false);
  }
};
//
const googleStrategy = new Strategy(googleParams, googleCallback);

passport.use("google", googleStrategy);

module.exports = passport;
