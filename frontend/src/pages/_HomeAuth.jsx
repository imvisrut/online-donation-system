import { useEffect, useState } from "react";
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
    <div>
      <h1>Peoples</h1>
      {users.map((user) => {
        return <p key={user._id}>{user.name}</p>;
      })}
    </div>
  );
};

export default _HomeAuth;
