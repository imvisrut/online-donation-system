import { useEffect, useState } from "react";
import axios from "axios";
import { Container, Card, Row, Col } from "react-bootstrap";

const Profile = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [about, setAbout] = useState("");

  useEffect(() => {
    const jwtToken = localStorage.getItem("jwtToken");
    async function getUser() {
      const res = await axios.get("/api/users/get-info", {
        headers: { authorization: `${jwtToken}` },
      });
      if (res.status === 200) {
        setEmail(res.data.user.email);
        setName(res.data.user.name);
        setAbout(res.data.user.about);
      }
    }

    getUser();
  }, [email, name]);

  return (
    <Container>
      <Card className="text-center profile" style={{ fontSize: "2rem" }}>
        <Row>
          <Col>Name</Col>
          <Col>{name}</Col>
        </Row>
        <Row>
          <Col>Email</Col>
          <Col>{email}</Col>
        </Row>
        <Row>
          <Col>About</Col>
          <Col>{about}</Col>
        </Row>
      </Card>
    </Container>
  );
};

export default Profile;
