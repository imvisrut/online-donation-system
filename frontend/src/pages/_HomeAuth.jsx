import { useEffect, useState } from "react";
import { Container, Card } from "react-bootstrap";
import axios from "axios";

const _HomeAuth = () => {
  const [users, setUsers] = useState([]);
  const [amount, setAmount] = useState(0);
  const [currentUserId, setCurrentUserId] = useState("");

  useEffect(() => {
    const jwtToken = localStorage.getItem("jwtToken");

    async function setUserList() {
      const res = await axios.get("/api/users/", {
        headers: { authorization: `${jwtToken}` },
      });
      setUsers(res.data);
    }

    async function setCurrentUserDetail() {
      const res = await axios.get("/api/users/get-info", {
        headers: { authorization: `${jwtToken}` },
      });
      setCurrentUserId(res.data.user.stripeId);
    }

    setCurrentUserDetail();
    setUserList();
  }, []);

  const handleSubmit = () => {
    // history push another route after money transfer
  };

  return (
    <Container>
      {users.map((user) => {
        return (
          <Card key={user._id}>
            <Card.Title>
              <h1>{user.name}</h1>
            </Card.Title>
            <Card.Body>
              <p>
                About : <b>{user.about}</b>
              </p>
              <iframe name="votar" style={{ display: "none" }}></iframe>
              <form
                method="POST"
                action="/api/stripe/transfer-money"
                target="votar"
                onSubmit={handleSubmit}
              >
                <input
                  type="number"
                  name="amount"
                  placeholder="amount"
                  onChange={(e) => setAmount(e.target.value)}
                  value={amount}
                />
                <input
                  type="hidden"
                  name="receiver_id"
                  value={user.customerId}
                />
                <input type="hidden" name="sender_id" value={currentUserId} />
                <button
                  type="submit"
                  className="btn btn-success"
                  disabled={amount <= 0}
                >
                  Donate
                </button>
              </form>
            </Card.Body>
          </Card>
        );
      })}
    </Container>
  );
};

export default _HomeAuth;
