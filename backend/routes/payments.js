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

// transfer money from one customer to another

router.post("/transfer-money", (req, res) => {
  const amount = req.body.amount - req.body.amount * 0.05;
  const receiverId = req.body.receiver_id;
  const senderId = req.body.sender_id;
  const currency = "usd";
  // console.log(
  //   `amount : ${amount}, receiverId : ${receiverId}, senderId : ${senderId}, currency : ${currency}`
  // );

  // update balance in stripe account

  // add money into receiverId
  stripe.customers.createBalanceTransaction(receiverId, {
    amount: amount * 100,
    currency,
  });

  // cut money from senderId
  stripe.customers.createBalanceTransaction(senderId, {
    amount: -100 * amount,
    currency,
  });
});

module.exports = router;
