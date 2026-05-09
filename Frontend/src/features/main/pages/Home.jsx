import HeroMeta from "../components/hero/HeroMeta";
import HeroText from "../components/hero/HeroText";

const Home = () => {
  return (
    <div className="bg-black h-screen">
      <HeroText />
      <HeroMeta />
    </div>
  );
};

export default Home;
