import React from "react";
import Carousel from "react-images";

// const images = [
//   { source: "path/to/image-1.jpg" },
//   { source: "path/to/image-2.jpg" },
// ];

export default function ReactImages(props) {
  return <Carousel views={props.images} />;
}
