'use client'
import { IconButton } from "@mui/material";
import { ReactNode } from "react";
import Slider from "react-slick";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

type SliderComponentProps = {
  children: ReactNode;
  slideProps?: object
};

const SliderComponent = ({ children, slideProps }: SliderComponentProps) => {
  let config = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  config = slideProps ? {...config, ...slideProps} : config

  const NextArrowTemplate = (props: any) => {
    const { onClick, className, style } = props;
    return (
      <IconButton onClick={onClick} className={className} style={style}>
        <ArrowForwardIosIcon color="action" />
      </IconButton>
    );
  };

  const PrevArrowTemplate = (props: any) => {
    const { onClick, className, style } = props;
    return (
      <IconButton onClick={onClick} className={className} style={style}>
        <ArrowBackIosIcon color="action" />
      </IconButton>
    );
  };

  return (
    <Slider
      {...config}
      adaptiveHeight
      variableWidth
      nextArrow={<NextArrowTemplate />}
      prevArrow={<PrevArrowTemplate />}
    >
      {children}
    </Slider>
  );
};

export default SliderComponent;
