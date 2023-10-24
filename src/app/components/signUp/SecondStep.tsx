"use client";
import { useQuery } from "react-query";
import CategoriesLoading from "./CategoriesLoading";
import { useFormContext } from "react-hook-form";
import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Chip,
  Container,
  CssBaseline,
  Grid,
  Typography,
} from "@mui/material";
import InterestsIcon from "@mui/icons-material/Interests";

interface ISecondStep {
  previous(): void;
  handleSubmit(): void;
}

interface iCategory {
  id: string;
  name: string;
}

export default function SecondStep({ previous, handleSubmit }: ISecondStep) {
  const {
    control,
    formState: { isValid },
  } = useFormContext();

  const BASE_URL = process.env.NEXT_PUBLIC_APPLICATION_URL;

  const { isLoading, error, data } = useQuery<iCategory[]>({
    queryKey: ["categories"],
    staleTime: Infinity,
    queryFn: () => fetch(`${BASE_URL}/categories`).then((res) => res.json()),
  });

  //TODO: Create a Skeleton, Separe the component in parts
  if (isLoading) return <CategoriesLoading />;

  if (error) return "An error has occurred: ";

  const handleClickCategory = (id: string) => {
    console.log("CLICKOU", id);
  };

  if (!data) return "An error has occurred: ";

  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <InterestsIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Choose your interests
        </Typography>
      </Box>

      <div className="flex col max-h-96 flex-wrap w-100 overflow-y-auto gap-2 mt-4">
        {data.map((category) => (
          <Chip
            key={`category-chip-${category.id}`}
            label={category.name}
            variant="outlined"
            onClick={() => handleClickCategory(category.id)}
          />
        ))}
      </div>
      <div className="flex justify-end gap-6 mt-4">
        <Button variant="text">Skip and finish</Button>
        <Button variant="outlined" disabled>
          Finish
        </Button>
      </div>
    </Container>
  );
}
