"use client";
import { useQuery } from "react-query";
import CategoriesLoading from "./CategoriesLoading";
import { useFormContext } from "react-hook-form";
import {
  Box,
  Button,
  Chip,
  Container,
  CssBaseline,
  TextField,
  Typography,
} from "@mui/material";
import { listCategories } from "@/services/api/internal/category";
import { useCallback, useState } from "react";

interface ISecondStep {
  previous(): void;
  handleSubmit(): void;
}

interface iCategory {
  id: string;
  name: string;
}

export default function SecondStep({ previous, handleSubmit }: ISecondStep) {
  const { setValue } = useFormContext();

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [filter, setFilter] = useState("");

  const { isLoading, isError, data, error } =
    useQuery<iCategory[]>(listCategories);

    const handleClickCategory = (id: string) => {
      const indexOfId = selectedCategories.indexOf(id);
      indexOfId === -1 || indexOfId === undefined
        ? selectedCategories.push(id)
        : selectedCategories.splice(indexOfId, 1);
      setSelectedCategories([...selectedCategories]);
    };
  
    const handleIncludeInterests = () => {
      setValue("interests", selectedCategories);
      handleSubmit();
    };

  const renderFilteredData = useCallback(() => {
    if (filter.length < 3 || !data ) return null;

    return data
      ?.filter((category) => category.name.includes(filter))
      .map((category) => (
        <Chip
          key={`category-chip-${category.id}`}
          label={category.name}
          variant={
            selectedCategories.includes(category.id) ? "filled" : "outlined"
          }
          onClick={() => handleClickCategory(category.id)}
        />
      ));
  }, [filter]);

  if (isError) return "An error has occurred: ";

  if (!data) return "An error has occurred: ";

  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Escolha seus interesses
        </Typography>
        <TextField
          id="standard-basic"
          label="Search category"
          variant="standard"
          size="small"
          fullWidth
          value={filter}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setFilter(event.target.value);
          }}
        />
      </Box>

      <div className="flex col max-h-96 flex-wrap w-100 overflow-y-auto gap-2 mt-4">
        {isLoading ? (
          <CategoriesLoading />
        ) : (
          renderFilteredData() ??
          data.map((category) => (
            <Chip
              key={`category-chip-${category.id}`}
              label={category.name}
              variant={
                selectedCategories.includes(category.id) ? "filled" : "outlined"
              }
              onClick={() => handleClickCategory(category.id)}
            />
          ))
        )}
      </div>

      <div className="flex justify-between gap-6 mt-4 items-center">
        <Button variant="outlined" onClick={previous}>
          Voltar
        </Button>
        <div className="flex gap-2">
          <Button variant="text" onClick={handleSubmit}>
            Pular e concluir
          </Button>
          <Button
            variant="outlined"
            disabled={selectedCategories.length === 0}
            onClick={handleIncludeInterests}
          >
            Concluir
          </Button>
        </div>
      </div>
    </Container>
  );
}
