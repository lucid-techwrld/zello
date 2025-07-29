import Search from "../components/Search";
import NearYou from "../components/NearYou";
import Recommend from "../components/Recommend";
import Properties from "./Properties";

const Home = () => {
  return (
    <div>
      <Search />
      <NearYou />
      <Recommend />
      <Properties />
    </div>
  );
};

export default Home;
