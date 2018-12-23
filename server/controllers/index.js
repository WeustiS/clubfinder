module.exports = {
  index: {
    get(req, res) {
      res.render("index", { messages: req.flash("error") });
    }
  }
};
