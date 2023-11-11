module.exports = (err, req, res, next) => {
  return res.status(500).send("Something went wrong!!!!");
};
