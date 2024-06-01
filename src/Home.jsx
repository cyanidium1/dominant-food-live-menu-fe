import Header from "./Header";
import Orders from "./Orders";
import Fire from "./Fire";

const Home = ({ orders }) => {
  return (
    <>
      <Header />
      <Orders orders={orders} />
      <Fire />
    </>
  );
};

export default Home;
