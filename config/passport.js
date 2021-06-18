var passport = require('passport');

passport.use(new LocalStrategy(
    function(username, password, done) {
      User.findOne({ username: username }, function (err, account) {
        if (err) { return done(err); }
        if (!account) { return done(null, false); }
        if (!account.verifyPassword(password)) { return done(null, false); }
        return done(null, account);
      });
    }
  ));