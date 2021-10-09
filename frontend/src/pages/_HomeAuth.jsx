import { useEffect, useState } from "react";
import { Container, Card } from "react-bootstrap";
import axios from "axios";

const _HomeAuth = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const jwtToken = localStorage.getItem("jwtToken");

    async function setUserList() {
      const res = await axios.get("/api/users/", {
        headers: { authorization: `${jwtToken}` },
      });
      setUsers(res.data);
    }

    setUserList();
  }, []);
  return (
    <Container>
      {users.map((user) => {
        return (
          <Card key={user._id}>
            <Card.Title>
              <h1>{user.name}</h1>
            </Card.Title>
            <Card.Body>{user.about}</Card.Body>
          </Card>
        );
      })}
    </Container>
  );
};

export default _HomeAuth;
