// env variables
const { config } = require("dotenv");
config();

const stripe = require("stripe")(process.env.STRIPE_SECRET);

module.exports = stripe;
