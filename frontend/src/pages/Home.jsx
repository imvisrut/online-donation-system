import _Home from "./_Home.jsx";
import _HomeAuth from "./_HomeAuth.jsx";

const Home = ({ isLoggedIn }) => {
  return (
    <div>
      {!isLoggedIn && <_Home />}
      {isLoggedIn && <_HomeAuth />}
    </div>
  );
};

export default Home;
