import {
  Badge,
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Chip,
} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { useEffect, useRef, useState } from "react";

interface CollectionCardProps {
  collection: iCollection;
  onClick(id: string): void;
}

interface iCollection {
  id: string;
  image: string;
  categories: iCategories[];
}

interface iCategories {
  name: string;
}

const CollectionCard = ({ collection, onClick }: CollectionCardProps) => {
  
  const [position, setPosition] = useState(0);
  const badgeRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    setPosition(
      badgeRef.current ? badgeRef.current.getBoundingClientRect().width / 2 : 0
    );
  }, [badgeRef]);

  const badgeStyle = {
    "& .MuiBadge-badge": {
      right: `${position}px`,
      backgroundColor: '#E0C2FF',
      color: '#47008F',
      top: 5
    },
  };

  return (
      <Card
        key={collection.id}
        className="min-w-[180px] max-w-[205px] p-2 flex flex-col justify-center hover:shadow-md hover:shadow-blue-300 hover:-translate-y-2 transition ease-in-out duration-200 cursor-pointer"
      >
        <CardActionArea
          onClick={() => onClick(collection.id)}
          className="p-0 m-0 h-full"
        >
          <CardContent sx={{ maxWidth: "100%", padding: "0" }}>
            <Badge
              sx={badgeStyle}
              color="secondary"
              badgeContent="Novidade"
              ref={badgeRef}
            >
              <CardMedia
                component="img"
                image={collection.image}
                height={310}
                className="my-1 max-w-full rounded-xl"
              />
            </Badge>

            <Box
              sx={{ flexGrow: 1 }}
              className="h-20 flex justify-center items-center"
            >
              <Grid2 container spacing={0.5} sx={{ justifyContent: "center" }}>
                {collection.categories &&
                  collection.categories.slice(0, 3).map((category, index) => (
                    <Grid2 key={index}>
                      <Chip label={category.name}></Chip>
                    </Grid2>
                  ))}
              </Grid2>
            </Box>
          </CardContent>
        </CardActionArea>
      </Card>
  );
};

export default CollectionCard;
