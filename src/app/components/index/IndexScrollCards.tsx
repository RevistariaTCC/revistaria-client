import React, { useState } from "react";
import { Card, CardActionArea, CardContent, CardMedia } from "@mui/material";
import VolumeModal from "../VolumeModal";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SliderComponent from "../SliderComponent";

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
  }
  const availableVolumns = cards && cards.filter((volume) => volume.status === "AVAILABLE");

  return (
    <div>
      <SliderComponent
        slideProps={{ slidesToShow: 5, slidesToScroll: 1, infinite: true }}
      >
        {cards &&
          availableVolumns.slice(0, 12).sort(() => 0.6 - Math.random()).map((volume) => (
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
                    className="my-1 w-full rounded"
                  />
                  <div
                    className={`flex justify-center items-center rounded h-8 mt-2 ${
                      DISPONIBILITY[volume.status].class
                    }`}
                  >
                    <h4>{DISPONIBILITY[volume.status].text}</h4>
                  </div>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
      </SliderComponent>

      <VolumeModal
        openModal={showModal}
        volume={activeVolume}
        handleClose={() => setShowModal(false)}
      />
    </div>
  );
}
