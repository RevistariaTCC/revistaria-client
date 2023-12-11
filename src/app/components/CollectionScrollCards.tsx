import { Card, CardActionArea, CardContent, CardMedia } from "@mui/material";
import SliderComponent from "./SliderComponent";

interface CollectionScrollCardsProps {
  items: CollectionType[]
  onClick(id: string): void;
}

type CollectionType = {
  collectionGroupId: string;
  createdAt: Date;
  description: string;
  id: string;
  image: string;
  name: string;
  updatedAt: Date;
};

const CollectionScrollCards = ({items, onClick}: CollectionScrollCardsProps) => {


  return (
    <SliderComponent slideProps={{infinite: false, slidesToShow: 5}}>
      {
        items.map((collection) => (
          <Card
            key={collection.id}
            className="p-2 max-w-60 hover:-translate-y-2 transition ease-in-out duration-200 cursor-pointer"
          >
            <CardActionArea
              onClick={() => onClick(collection.id)}
              className="p-0 m-0 h-full"
            >
              <CardContent sx={{ maxWidth: "100%", padding: "0" }}>
                <CardMedia
                  component="img"
                  image={collection.image}
                  height={200}
                  className="my-1 max-w-full rounded"
                />
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
    </SliderComponent>
  );
};

export default CollectionScrollCards;
