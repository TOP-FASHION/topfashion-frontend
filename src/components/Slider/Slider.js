import React, { useState, useEffect } from "react";
import Swiper from "react-id-swiper";
import generateData from "./data";
import SlideItem from "./slideItem";
import { Pagination, Navigation, Autoplay } from "swiper/dist/js/swiper.esm";
import "./Slider.scss";

const ManipulatingSwiper = () => {
  // Swiper instance
  const [swiper, updateSwiper] = useState(null);
  // Slides current index
  const [currentIndex, updateCurrentIndex] = useState(0);
  // Params definition
  const params = {
    modules: [Pagination, Navigation, Autoplay], // Add nescessary modules here
    loop: true,
    pagination: {
      el: ".swiper-pagination",
      type: "bullets",
      clickable: true
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev"
    },
    spaceBetween: 30,
    autoplay: true,
    getSwiper: updateSwiper // Get swiper instance callback
  };

  // Manipulate swiper from outside
  const goNext = () => {
    if (swiper !== null) {
      swiper.slideNext();
    }
  };

  const goPrev = () => {
    if (swiper !== null) {
      swiper.slidePrev();
    }
  };

  const renderItem = ({ idx, color, content }) => (
    <SlideItem color={color} content={content} key={`slide_${idx}`} />
  );

  // Add eventlisteners for swiper after initializing
  useEffect(
    () => {
      if (swiper !== null) {
        swiper.on("slideChange", () => updateCurrentIndex(swiper.realIndex));
        swiper.on("slideChangeTransitionStart", () =>
          updateCurrentIndex(swiper.realIndex)
        );
      }
    },
    [swiper]
  );

  return (
    <div>
      <Swiper {...params}>{generateData().map(renderItem)}</Swiper>
    </div>
  );
};

export default ManipulatingSwiper;
