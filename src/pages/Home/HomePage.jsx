import React from "react";
import HeroSection from "../../components/heroSection/HeroSection";
import Category from "../../components/Category/Category";
import HomepageProducCard from "../../components/homePageProductCard/HomepageProducCard";
import Track from "../../components/track/Track";
import Testimonial from "../../components/Testimonial/Testimonial";

const HomePage = () => {
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
