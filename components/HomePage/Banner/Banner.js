import React from 'react';
import { Container, Button, Grid, SvgIcon } from '@material-ui/core';
import styles from './Banner.module.css';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const MenuIcon = () =>  (
  <SvgIcon viewBox="0 0 64 64">
    <path data-name="layer2" fill="none" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M18.4 22.9L5.5 9.9m3.4-3.5l13 13m16.5 23.5L55.6 60a2.4 2.4 0 0 0 3.4-3.4L42.5 40m-8.7-8.7l-3.6-3.6c2-3 2.1-6.6-.7-9.3L12.4 3 2 13.3l15.5 17.2c2.7 2.7 6.3 2.7 9.3.7l3.6 3.6"></path>
    <path data-name="layer1" d="M28.2 37L8.3 56.9a2.4 2.4 0 0 0 0 3.5 2.4 2.4 0 0 0 3.5 0l19.8-20" fill="none" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3"></path>
    <path data-name="layer1" d="M28.2 37L58.4 6.7a12.2 12.2 0 0 1 0 17.3L41.1 41.3a6.1 6.1 0 0 1-8.7 0z" fill="none" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3"></path>
  </SvgIcon>
)

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
    cssEase: "linear"
  };

  const playSlider = (slider) => {
    slider?.slickPlay();
  }

  return (
    <Container>
      <Grid container>
        <Grid item lg={12}>
          <Slider ref={slider => playSlider(slider)} {...settings} dotsClass="BannerDot" >
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
            </div>
            <div className={styles.Banner}>
              <img src="/images/banner.jpg" />
            </div>
          </Slider>
        </Grid>
      </Grid>
    </Container>
  )
}

export default Banner