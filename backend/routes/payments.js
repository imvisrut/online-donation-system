const express = require("express");
const router = express.Router();
const stripe = require("./stripe");

// payment intent
router.post("/payments", async (req, res) => {
  // update balance in stripe account
  const customerId = req.body.customerId;
  const amount = req.body.amount;

  stripe.customers.createBalanceTransaction(customerId, {
    amount,
    currency: "usd",
  });

  res.sendStatus(200);
});

module.exports = router;
