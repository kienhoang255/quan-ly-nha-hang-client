import React, { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import logo from "../../assets/images/logo.webp";

interface Props {
  image: any;
}

const CarouselComponent: React.FC<Props> = (image) => {
  const [data, setData] = useState<any>([]);
  useEffect(() => {
    Object.entries(image?.image).map(([e, value], key) => {
      if (e == "image1") {
        setData((prev: any) => [...prev, value]);
      } else if (e === "image2") {
        setData((prev: any) => [...prev, value]);
      } else if (e === "image3") {
        setData((prev: any) => [...prev, value]);
      } else if (e === "image4") {
        setData((prev: any) => [...prev, value]);
      }
    });
  }, [image]);
  return (
    <Carousel dynamicHeight infiniteLoop emulateTouch showThumbs={true}>
      {data[0] &&
        data?.map((e: any, key: number) => (
          <img
            key={key}
            src={e || logo}
            style={{
              maxHeight: "800px",
              maxWidth: "800px",
              objectFit: "cover",
            }}
          />
        ))}
    </Carousel>
  );
};

export default CarouselComponent;
