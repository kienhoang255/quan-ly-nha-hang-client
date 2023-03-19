import React, { useEffect, useState } from "react";
import { Box, Typography, Button, Skeleton } from "@mui/material";
import ArrowForward from "@mui/icons-material/ArrowForward";
import { Link } from "react-router-dom";
import LazyLoadImg from "../../components/LazyLoadImg/LazyLoadImg";

const Home = () => {
  const [screenSize, setScreenSize] = useState({
    width: 400,
    height: 300,
  });

  useEffect(() => {
    window.addEventListener("resize", () => {
      if (window.innerHeight < 300 || window.innerWidth < 400) {
        setScreenSize(() => ({
          height: window.innerHeight,
          width: window.innerWidth,
        }));
      }
    });
  }, [window.innerHeight, window.innerWidth]);

  const styles = {
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
    },

    swipeImgReview: {
      width: { xs: "100%", sm: "600px", md: "900px", lg: "1200px" },
      height: {
        xs: `calc(${screenSize.width}px / 1.618)`,
        sm: "calc(600px / 1.618)",
        md: "calc(900px / 1.618)",
        lg: "calc(1200px / 1.618)",
      },
      backgroundRepeat: "no-repeat",
      backgroundSize: "contain",
      backgroundPosition: "center",
    },
    swipeImgReviewSkeleton: {
      width: { xs: "100%", sm: "600px", md: "900px", lg: "1200px" },
      height: {
        xs: `calc(${screenSize.width}px / 1.618)`,
        sm: "calc(600px / 1.618)",
        md: "calc(900px / 1.618)",
        lg: "calc(1200px / 1.618)",
      },
    },

    imgEvent: {
      width: { xs: "100%", sm: "600px", md: "900px", lg: "1200px" },
      height: {
        xs: `calc(${screenSize.width}px / 1.618)`,
        sm: "calc((600px / 1.618) / 2)",
        md: "calc((900px / 1.618) / 2)",
        lg: "calc((1200px / 1.618) / 2)",
      },
      backgroundRepeat: "no-repeat",
      backgroundSize: "contain",
      backgroundPosition: "center",
    },

    descriptionContainer: {
      display: "grid",
      maxWidth: { sm: "600px", md: "900px", lg: "1200px" },
      gridTemplateColumns: { sm: "1fr", md: "35% auto" },
      gridAutoFlow: "dense",
      alignItems: "center",

      descriptionContent: {
        padding: { sm: "10px auto", md: "24px 40px 24px 0" },
        title: {
          fontWeight: "bold",
          textAlign: { sm: "center", md: "left" },
        },
      },

      descriptionImg: {
        width: { xs: "100%" },
        height: {
          xs: `calc(${screenSize.width}px / 1.618)`,
          sm: "420px",
          md: "480px",
          lg: "547px",
        },
        backgroundRepeat: "no-repeat",
        backgroundSize: "contain",
        backgroundPosition: "center",
      },
    },
  };

  const lazyImg = {
    main: `url("https://brand-pcms.ggg.systems/media/so/homecmsdata/banners/KK-banner-website-3.png")`,
    event: `url("https://cmsbrandwebsites.ggg.com.vn/wp-content/uploads/2022/11/bang-gia-kichi-hn.png")`,
    des: `url("https://cmsbrandwebsites.ggg.com.vn/wp-content/uploads/2022/07/kichi-home-all.png")`,
  };

  return (
    <Box sx={styles.container}>
      <LazyLoadImg img={lazyImg.main} sx={styles.swipeImgReview} />
      <LazyLoadImg img={lazyImg.event} sx={styles.imgEvent} />
      <Box sx={styles.descriptionContainer}>
        <Box sx={styles.descriptionContainer.descriptionContent}>
          <Typography
            variant="h5"
            gutterBottom
            sx={styles.descriptionContainer.descriptionContent.title}
          >
            Lẩu Băng chuyền
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Kichi-Kichi là chuỗi nhà hàng chuyên về Buffet lẩu hàng đầu Việt
            Nam. Các món ăn ngon và đa dạng được phục vụ với hình thức băng
            chuyền độc đáo, hiện đại, vốn là sự kết hợp của phong cách phục vụ
            Kaiten đến từ Nhật Bản với kiến trúc hiện đại. Chỉ với một giá cố
            định, khách hàng được thưởng thức không hạn chế gần 100 sản phẩm
            nhúng lẩu đặc sắc như bò Mỹ nhập khẩu, cá hồi nguyên con, rau sạch,
            nấm tươi theo mùa,…
          </Typography>
          <Button endIcon={<ArrowForward style={{ color: "#ff720d" }} />}>
            <Link to="/menu" style={{ color: "#ff720d" }}>
              Xem thực đơn
            </Link>
          </Button>
        </Box>
        <LazyLoadImg
          img={lazyImg.des}
          sx={styles.descriptionContainer.descriptionImg}
        />
      </Box>
    </Box>
  );
};

export default Home;
