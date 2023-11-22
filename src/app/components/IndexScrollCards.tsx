import React, { useState } from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  IconButton,
} from "@mui/material";
import VolumeModal from "./VolumeModal";
import Slider, { Settings } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

type CarrouselProps = {
  volumes: Volume[];
};

type Volume = {
  id: string;
  title: string;
  category: string[];
  image: string;
  status: "AVAILABLE" | "UNAVAILABLE";
  synopsis: string;
};

export default function IndexScrollCards(props: CarrouselProps) {
  const [showModal, setShowModal] = useState(false);

  const cards = props.volumes;
  const [activeVolume, setActiveVolume] = useState<Volume>({} as Volume);

  const DISPONIBILITY = {
    AVAILABLE: { text: "Disponivel", class: "bg-green-400" },
    UNAVAILABLE: { text: "Indisponivel", class: "bg-gray-300" },
  };

  const handleClick = (volume: Volume) => {
    setShowModal(true);
    setActiveVolume(volume);
  };

  const config = {
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
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  const NextArrowTemplate = (props: any) => {
    const {onClick,className, style } = props
    return (
      <IconButton onClick={onClick} className={className} style={style}>
        <ArrowForwardIosIcon color="action"/>
      </IconButton>
    );
  };

  const PrevArrowTemplate = (props: any) => {
    const {onClick, className, style } = props
    return (
      <IconButton onClick={onClick} className={className} style={style}>
        <ArrowBackIosIcon color="action"/>
      </IconButton>
    );
  };

  return (
    <>
      <Slider
        {...config}
        adaptiveHeight
        variableWidth
        nextArrow={<NextArrowTemplate />}
        prevArrow={<PrevArrowTemplate />}
      >
        {cards && cards.slice(0,8).map((volume) => (
          <Card
            key={volume.id}
            className="p-2 max-w-60 hover:-translate-y-2 transition ease-in-out duration-200 cursor-pointer"
          >
            <CardActionArea
              onClick={() => handleClick(volume)}
              className="p-0 m-0 h-full"
            >
              <CardContent sx={{ maxWidth: "100%", padding: "0" }}>
                <CardMedia
                  component="img"
                  image={volume.image}
                  height={200}
                  className="my-1 max-w-full rounded"
                />
                <div
                  className={`flex justify-center items-center rounded h-S8 ${
                    DISPONIBILITY[volume.status].class
                  }`}
                >
                  <h4>{DISPONIBILITY[volume.status].text}</h4>
                </div>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </Slider>

      <VolumeModal
        openModal={showModal}
        volume={activeVolume}
        handleClose={() => setShowModal(false)}
      />
    </>
  );
}
