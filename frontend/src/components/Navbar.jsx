import { useEffect, useState } from "react";

const Nav = () => {
  // const [data, setData] = useState({ name: "", age: 0 });
  const [newData, setNewData] = useState([]);

  useEffect(() => {
    console.log("Navbar is mounted..");
    // fetch("http://localhost:5000")
    //   .then((response) => response.json())
    //   .then((data) => setData(data));

    fetch("https://api.github.com/users/imvisrut/repos")
      .then((response) => response.json())
      .then((data) => setNewData(data));
  }, []);

  return (
    <nav>
      <h1>Logo</h1>
      <p>About</p>
      <p>Contact</p>
      <div className="container">
        {newData.map((repo) => {
          return <li>{repo.name}</li>;
        })}
      </div>
    </nav>
  );
};

export default Nav;
