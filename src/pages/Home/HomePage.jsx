import React from "react";
import HeroSection from "../../components/heroSection/HeroSection";
import Category from "../../components/Category/Category";
import HomepageProducCard from "../../components/homePageProductCard/HomepageProducCard";
import Track from "../../components/track/Track";
import Testimonial from "../../components/Testimonial/Testimonial";
import myContext from "../../context/MyContext";
import { useContext } from "react";
import { Loader } from "lucide-react";

const HomePage = () => {
  const context = useContext(myContext);
  console.log(context);

  return (
    <div>
      <HeroSection />
      <Category />
      <HomepageProducCard />
      <Track />
      <Testimonial />

    </div>
  );
};

export default HomePage;
