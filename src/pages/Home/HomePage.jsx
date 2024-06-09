import React from "react";
import HeroSection from "../../components/heroSection/HeroSection";
import Category from "../../components/Category/Category";
import HomepageProducCard from "../../components/homePageProductCard/HomepageProducCard";

const HomePage = () => {
  return (
    <div>
      <HeroSection />
      <Category />
      <HomepageProducCard />
    </div>
  );
};

export default HomePage;
