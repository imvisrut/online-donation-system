import { useEffect, useState } from "react";
import axios from "axios";

const Profile = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    const jwtToken = localStorage.getItem("jwtToken");
    async function getUser() {
      const res = await axios.get("/api/users/get-info", {
        headers: { authorization: `${jwtToken}` },
      });
      if (res.status === 200) {
        setEmail(res.data.user.email);
        setName(res.data.user.name);
      }
    }

    getUser();
  }, [email, name]);

  return (
    <div>
      <h1>Name : {name}</h1>
      <h1>Email : {email}</h1>
    </div>
  );
};

export default Profile;
