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

// add money to customer account
router.post("/add-money", (req, res) => {
  const amount = req.body.amount - req.body.amount * 0.05;
  const customerId = req.body.customer;
  const currency = req.body.currency;

  // update balance in stripe account
  stripe.customers.createBalanceTransaction(customerId, {
    amount,
    currency,
  });

  res.sendStatus(200);
});

module.exports = router;
