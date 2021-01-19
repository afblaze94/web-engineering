import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

// const images = [
//   { source: "path/to/image-1.jpg" },
//   { source: "path/to/image-2.jpg" },
// ];

export default function ReactCarousel(props) {
  const images = props.images;
  return (
    <Carousel showArrows={true}>
      {images &&
        images.map((image, index) => (
          <div key={index}>
            <img src={image} alt="product" />
          </div>
        ))}
    </Carousel>
  );
}
