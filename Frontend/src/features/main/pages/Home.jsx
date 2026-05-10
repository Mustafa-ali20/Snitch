import HeroMeta from "../components/hero/HeroMeta";
import HeroText from "../components/hero/HeroText";

const Home = () => {
  return (
    <div className="bg-black h-screen pt-20 md:pt-25 lg:pt-30">
      <HeroText />
      <HeroMeta />
    </div>
  );
};

export default Home;
