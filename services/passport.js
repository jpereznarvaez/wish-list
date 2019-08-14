const passport = require("passport");
const mongoose = require("mongoose");
const localStrategy = require("passport-local").Strategy;
const { User } = require("../user/index");

passport.serializeUser((user, done) => {
  console.error("Primero");
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  console.error("Segundo");
  const user = await User.findById(id);
  done(null, user);
});

passport.use(
  "local-signup",
  new localStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true
    },
    async (req, email, password, done) => {
      const user = await User.findOne({ email: email.toLowerCase() });

      if (user) {
        return done(
          null,
          false,
          req.flash("error_msg", "The email is already taken.")
        );
      } else {
        const { name, surname, conf_password } = req.body;

        if (conf_password === password) {

          const newUser = new User();

          newUser.email = email;
          newUser.password = newUser.encryptPassword(password);
          newUser.name = name;
          newUser.surname = surname;

          await newUser.save();
          //done(null, newUser);
          done(
            null,
            false,
            req.flash("success_msg", "User successfully registered")
          );
        } else {
          return done(
            null,
            false,
            req.flash("error_msg", "Password don't macth")
          );
        }
      }
    }
  )
);

passport.use(
  "local-signin",
  new localStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true
    },
    async (req, email, password, done) => {
      const user = await User.findOne({ email: email });
      if (!user) {
        return done(null, false, req.flash("error_msg", "No User Found"));
      }
      if (!user.matchPassword(password)) {
        return done(null, false, req.flash("error_msg", "Incorrect Password"));
      }

      done(null, user, req.flash("success_msg", `Welcome ${user.name}`));
    }
  )
);