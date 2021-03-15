import React from "react";
import { Container, Button, Grid } from "@material-ui/core";
import styles from "./Banner.module.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { MenuIcon } from "../../Icons/Icons";

const Banner = () => {
  const settings = {
    dots: true,
    fade: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 500,
    autoplaySpeed: 5000,
    cssEase: "linear",
  };

  const playSlider = (slider) => {
    slider?.slickPlay();
  };

  return (
    <Container>
      <Grid container>
        <Grid item lg={12}>
          <Slider
            ref={(slider) => playSlider(slider)}
            {...settings}
            dotsClass="BannerDot"
          >
            <div className={styles.Banner}>
              <img src="/images/banner.jpg" />
              <div className={styles.ContentBanner}>
                <img src="/images/salad.png" className={styles.SubImage} />
                <h1 className={styles.Heading}>
                  Fresh & <br></br>
                  tasty salads
                </h1>
                <p className={styles.Subtitle}>
                  Relax please, we've got you <br></br>
                  covered every day of the week
                </p>
                <Button
                  variant="contained"
                  color="secondary"
                  className={styles.Button}
                  endIcon={<MenuIcon />}
                >
                  Discover menu
                </Button>
              </div>
            </div>
            <div className={styles.Banner}>
              <img src="/images/banner.jpg" />
              <div className={styles.ContentBanner}>
                <img src="/images/vietnam.png" className={styles.SubImage} />
                <h1 className={styles.Heading}>
                  Traditional & <br></br>
                  Vietnam Food
                </h1>
                <p className={styles.Subtitle}>
                  Relax please, we've got you <br></br>
                  covered every day of the week
                </p>
                <Button
                  variant="contained"
                  color="secondary"
                  className={styles.Button}
                  endIcon={<MenuIcon />}
                >
                  Try it out
                </Button>
              </div>
            </div>
            <div className={styles.Banner}>
              <img src="/images/banner.jpg" />
            </div>
          </Slider>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Banner;
