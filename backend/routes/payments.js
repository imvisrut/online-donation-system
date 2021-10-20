const express = require("express");
const router = express.Router();
const stripe = require("./stripe");

// create payment intent with specific amount
async function createPaymentIntent(amount, description, customerId) {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      description,
      customer: customerId,
      currency: "USD",
    });

    // update balance in stripe account
    stripe.customers.createBalanceTransaction(customerId, {
      amount,
      currency: "usd",
    });

    return paymentIntent;
  } catch (err) {
    console.log(err);
    return { err: "Transaction Error" };
  }
}

function runAsync(callback) {
  return (req, res, next) => {
    callback(req, res, next).catch(next);
  };
}

// payment intent
router.post(
  "/payments",
  runAsync(async ({ body }, res) => {
    res.send(
      await createPaymentIntent(
        body.amount * 100,
        body.description,
        body.customerId
      )
    );
  })
);

module.exports = router;
