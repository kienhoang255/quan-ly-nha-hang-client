import React, { useEffect, useRef, useState } from "react";
import { Box, Skeleton } from "@mui/material";

interface Props {
  img: string;
  sx: any;
}

const LazyLoadImg: React.FC<Props> = ({ img, sx }) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  const callbackFunction = (entries: any) => {
    const [entry] = entries;
    if (entry.isIntersecting) {
      setVisible(true);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(callbackFunction);
    if (ref.current) observer.observe(ref.current);

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [ref]);

  return (
    <>
      {visible ? (
        <Box style={{ backgroundImage: `${img}` }} sx={sx}></Box>
      ) : (
        <Skeleton ref={ref} sx={sx} />
      )}
    </>
  );
};

export default LazyLoadImg;
