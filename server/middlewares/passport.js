module.exports = {
  session: {
    secret: process.env.AUTH0_API_KEY,
    cookie: {},
    resave: false,
    saveUninitialized: true
  }
};
