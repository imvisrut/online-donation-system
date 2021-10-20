import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import CheckoutForm from "../components/CheckoutForm";
import axios from "axios";

const AddBalance = () => {
  const [amount, setAmount] = useState(0);
  const [customerId, setCustomerId] = useState("");

  useEffect(() => {
    const jwtToken = localStorage.getItem("jwtToken");
    async function getUser() {
      const res = await axios.get("/api/users/get-info", {
        headers: { authorization: `${jwtToken}` },
      });
      setCustomerId(res.data.customerId);
    }
    getUser();
  }, []);

  return (
    <Container>
      <h1 className="my-5">Add Balance</h1>
      <div>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>

      <CheckoutForm amount={amount} customerId={customerId} />
    </Container>
  );
};

export default AddBalance;
