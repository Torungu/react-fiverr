import React from "react";
import Slider from "react-slick";
import HomeCard from "../Contents/HomeCard";
import "../../index.scss";

const SlickCarousel = () => {
  const settings = {
    dots: false,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    // autoplay: true,
    swipe: true,
    autoplaySpeed: 2000,
  };

  return (
    <div className="container mx-auto">
      <Slider {...settings}>
        <div>
          <HomeCard
            imgSrc={"/src/assets/img/architecture-design.png"}
            bgClr={"bg-pink-900"}
            textTitle={"Architecture & Interior Design"}
          />
        </div>
        <div>
          <HomeCard
            imgSrc={"/src/assets/img/data-science.png"}
            bgClr={"bg-orange-900"}
            textTitle={"Data Science & ML"}
          />
        </div>
        <div>
          <HomeCard
            imgSrc={"/src/assets/img/e-commerce.png"}
            bgClr={"bg-green-900"}
            textTitle={"E-Commerce Marketing"}
          />
        </div>
        <div>
          <HomeCard
            imgSrc={"/src/assets/img/logo-design.png"}
            bgClr={"bg-orange-300"}
            textTitle={"Logo Design"}
          />
        </div>
        <div>
          <HomeCard
            imgSrc={"/src/assets/img/seo.png"}
            bgClr={"bg-green-900"}
            textTitle={"SEO"}
          />
        </div>
        <div>
          <HomeCard
            imgSrc={"/src/assets/img/video-editing.png"}
            bgClr={"bg-pink-600"}
            textTitle={"Video Editing"}
          />
        </div>
        <div>
          <HomeCard
            imgSrc={"/src/assets/img/product-photography.png"}
            bgClr={"bg-green-600"}
            textTitle={"Product Photography"}
          />
        </div>

        <div>
          <HomeCard
            imgSrc={"/src/assets/img/social-media-marketing.png"}
            bgClr={"bg-yellow-700"}
            textTitle={"Social Media Marketing"}
          />
        </div>
        <div>
          <HomeCard
            imgSrc={"/src/assets/img/software-development.png"}
            bgClr={"bg-green-300"}
            textTitle={"Software Development"}
          />
        </div>

        <div>
          <HomeCard
            imgSrc={"/src/assets/img/voice-over.png"}
            bgClr={"bg-orange-600"}
            textTitle={"Voice Over"}
          />
        </div>
        <div>
          <HomeCard
            imgSrc={"/src/assets/img/website-development.png"}
            bgClr={"bg-green-600"}
            textTitle={"Website Development"}
          />
        </div>
      </Slider>
    </div>
  );
};

export default SlickCarousel;
