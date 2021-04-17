const passport = require("passport"); //import passport
const LocalStrategy = require("passport-local").Strategy; //import localstrategy
const { user } = require("../../models"); //import user model
const bcrypt = require("bcrypt"); //import bcrypt (encrypt and comparePassword)
const JWTStrategy = require("passport-jwt").Strategy; //impoer jwt strategy
const ExtractJwt = require("passport-jwt").ExtractJwt; // impoer extractJWT

//if user call this passport
exports.signup = (req, res, next) => {
  //it will go to ../middlewares/auth/index.js -> passport.user("signup")
  passport.authenticate("signup", { session: false }, (err, user, info) => {
    //after go to ../middlewares/auth/index.js -> passport.user("signup")
    //it will bring the variable from done() function
    // like err = null, user = false, info = {message: "user cant be created"}
    //or err = null, user = userSignUp, info =  {message: "user cant be created"}

    // if error
    if (err) {
      return res.status(500).json({
        message: "Internal Server Error",
        error: err,
      });
    }

    //if user is false
    if (!user) {
      return res.status(401).json({
        message: info.message,
      });
    }
    //make req.user that will save the user value
    // and it will bring to controller
    req.user = user;

    //next to authController.getToken
    next();
  })(req, res, next);
};

passport.use(
  "signup",
  new LocalStrategy(
    {
      usernameField: "email", //usernamefield is from req.body.email
      passwordField: "password", //passwordfield is from req.body.password
      passReqToCallback: true, // enable to read req.body/req.params/req.query
    },
    async (req, email, password, done) => {
      try {
        //after user call this passport
        //it will run this method and create the user depends on req.body
        let userSignUp = await user.create(req.body);

        //fi  create user success, it will make
        //err=null
        //user = userSignUp
        //info = {message: "user created"}

        return done(null, userSignUp, {
          message: "User Created",
          
        });
      } catch (e) {
        //if create user failed, it will make
        //err = null
        //user = false
        //info = {message: "user cant be craeted"}
        return done(null, false, {
          message: "Can't Create User",
        });
      }
    }
  )
);

exports.signin = (req, res, next) => {
  //it will go to ../middlewares/auth/index.js -> passport.user("signup")
  passport.authenticate("signin", { session: false }, (err, user, info) => {
    //after go to ../middlewares/auth/index.js -> passport.user("signup")
    //it will bring the variable from done() function
    // like err = null, user = false, info = {message: "user cant be created"}
    //or err = null, user = userSignUp, info =  {message: "user cant be created"}

    // if error
    if (err) {
      return res.status(500).json({
        message: "Internal Server Error",
        error: err,
      });
    }

    //if user is false
    if (!user) {
      return res.status(401).json({
        message: info.message,
      });
    }
    //make req.user that will save the user value
    // and it will bring to controller
    req.user = user;

    //next to authController.getToken
    next();
  })(req, res, next);
};

passport.use(
  "signin",
  new LocalStrategy(
    {
      usernameField: "email", //usernamefield is from req.body.email
      passwordField: "password", //passwordfield is from req.body.password
      passReqToCallback: true, // enable to read req.body/req.params/req.query
    },
    async (req, email, password, done) => {
      try {
        //after user call this passport
        //it will run this method and create the user depends on req.body
        let userSignIn = await user.findOne({ email });

        //fi  create user success, it will make
        //err=null
        //user = userSignUp
        //info = {message: "user created"}
        if (!userSignIn) {
          return done(null, false, {
            message: "Email Not Found",
          });
        }

        //if user exist
        let validate = await bcrypt.compare(password, userSignIn.password);

        //if password is worng
        // console.log(password)

        if (!validate) {
          return done(null, false, {
            message: "Wrong Password",
          });
        }

        return done(null, userSignIn, {
          message: "User Can Sign In",
        });
      } catch (e) {
        // console.log(e);
        //if create user failed, it will make
        //err = null
        //user = false
        //info = {message: "user cant be craeted"}
        return done(null, false, {
          message: "Can't Login",
        });
      }
    }
  )
);

exports.admin = (req, res, next) => {
  //it will go to ../middlewares/auth/index.js -> passport.user("signup")
  passport.authorize("admin", (err, user, info) => {
    //after go to ../middlewares/auth/index.js -> passport.user("signup")
    //it will bring the variable from done() function
    // like err = null, user = false, info = {message: "user cant be created"}
    //or err = null, user = userSignUp, info =  {message: "user cant be created"}

    // if error
    if (err) {
      return res.status(500).json({
        message: "Internal Server Error",
        error: err,
      });
    }

    //if user is false
    if (!user) {
      return res.status(403).json({
        message: info.message,
      });
    }
    //make req.user that will save the user value
    // and it will bring to controller
    req.user = user;

    //next to authController.getToken
    next();
  })(req, res, next);
};

passport.use(
  "admin",
  new JWTStrategy(
    {

      //to extract the value of token
      secretOrKey: process.env.JWT_SECRET, //jwt key
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), //get token from bearer
    },
    
    async (token, done) => {
      
      try {
        console.log(token);
        const userLogin = await user.findOne({ _id: token.id });
        //if user not admin
        if (userLogin.role.includes("admin")) {
          return done(null, token);
        }
       
        return done(null, false, {
          message: 'youre not authorized',
        })
      
      } catch (e) {
        //find user
        return done(null, false, {
          message: "You're Not Authorized",
        });
      }
    }
  )
);

exports.user = (req, res, next) => {
  //it will go to ../middlewares/auth/index.js -> passport.user("signup")
  passport.authorize("user", (err, user, info) => {
    //after go to ../middlewares/auth/index.js -> passport.user("signup")
    //it will bring the variable from done() function
    // like err = null, user = false, info = {message: "user cant be created"}
    //or err = null, user = userSignUp, info =  {message: "user cant be created"}

    // if error
    if (err) {
      return res.status(500).json({
        message: "Internal Server Error",
        error: err,
      });
    }

    //if user is false
    if (!user) {
      return res.status(403).json({
        message: info.message,
      });
    }
    //make req.user that will save the user value
    // and it will bring to controller
    req.user = user;

    //next to authController.getToken
    next();
  })(req, res, next);
};

passport.use(
  "user",
  new JWTStrategy(
    {

      //to extract the value of token
      secretOrKey: process.env.JWT_SECRET, //jwt key
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), //get token from bearer
    },
    
    async (token, done) => {
      
      try {
        console.log(token);
        const userLogin = await user.findOne({ _id: token.id });
        //if user not admin
        if (userLogin.role.includes("user")) {
          return done(null, token);
        }
       
        return done(null, false, {
          message: "You're Not Authorized",
        })
      
      } catch (e) {
        //find user
        return done(null, false, {
          message: "You're Not Authorized",
        });
      }
    }
  )
);