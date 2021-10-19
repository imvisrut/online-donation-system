import React, { useState, useEffect } from "react";
import { fetchFromAPI } from "./helper";
import { Container } from "react-bootstrap";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";

const AddBalance = () => {
  const stripe = useStripe();
  const elements = useElements();

  const [amount, setAmount] = useState(0);
  const [paymentIntent, setPaymentIntent] = useState();
  const [customer, setCustomer] = useState({});

  const createPaymentIntent = async (event) => {
    const validAmount = Math.min(Math.max(amount, 50), 9999999);
    setAmount(validAmount);

    // make API request
    const pi = await fetchFromAPI("api/stripe/payments/", {
      body: {
        amount: validAmount,
        description: "For donation",
        customerId: customer.id,
      },
    });
    console.log(pi);
    setPaymentIntent(pi);
  };

  useEffect(() => {
    const jwtToken = localStorage.getItem("jwtToken");
    async function getUser() {
      const res = await axios.get("/api/users/get-info", {
        headers: { authorization: `${jwtToken}` },
      });
      if (res.status === 200) {
        setCustomer(res.data.customer);
      }
    }
    getUser();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const cardElement = elements.getElement(CardElement);

    // confirm card payment
    const { paymentIntent: updatedPaymentIntent, error } =
      await stripe.confirmCardPayment(paymentIntent.client_secret, {
        payment_method: {
          card: cardElement,
          billing_details: { name: "Customer" },
        },
      });

    if (error) {
      console.log("hello");
      console.log(error);
      error.payment_intent && setPaymentIntent(error.payment_intent);
    } else {
      setPaymentIntent(updatedPaymentIntent);
    }
  };

  return (
    <Container>
      <h1 className="my-5">Add Balance</h1>
      <div className="mb-5">
        <input
          type="number"
          value={amount}
          disabled={paymentIntent}
          onChange={(e) => setAmount(e.target.value)}
        />
        <button
          disabled={amount < 0}
          onClick={createPaymentIntent}
          hidden={paymentIntent}
          className="btn btn-primary"
        >
          Ready to Pay ${amount}
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <div
          id="card-element"
          className="form-control"
          style={{ height: "2.4em", paddingTop: ".7em" }}
        >
          <CardElement />
        </div>
        <button type="submit" className="btn btn-success my-3">
          Pay
        </button>
      </form>
    </Container>
  );
};

export default AddBalance;
