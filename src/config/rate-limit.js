const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 50,
  handler: (req, res) => {
    res.status(429).json({ error: "Too many requests" });
  },
});

module.exports = limiter;
