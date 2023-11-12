import {
  Alert,
  Box,
  Button,
  Chip,
  Container,
  CssBaseline,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import CategoriesLoading from "../signUp/CategoriesLoading";
import { useCallback, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { listCategories } from "@/services/api/internal/category";
import { getUserById, updateInterests } from "@/services/api/internal/user";
import { useAuth } from "@/hooks/auth";

interface iCategory {
  id: string;
  name: string;
}

interface iInterestsComponent {
  closeModal(): void;
  onSucess?(event: object): void;
}

const InterestsComponent = ({ closeModal, onSucess }: iInterestsComponent) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [filter, setFilter] = useState("");
  const { user, token } = useAuth();
  const { isLoading, isError, data } = useQuery<iCategory[]>(listCategories);
  const [sucess, setSuccess] = useState(false);
  useQuery({
    ...getUserById(user.id, { Authorization: `Bearer ${token}` }),
    onSuccess: (data) => {
      const { interests } = data;
      setSelectedCategories(interests.map((item: { id: string }) => item.id));
    },
  });

  const updateInterestsMutation = useMutation(updateInterests, {
    onSuccess: (data) => {
      triggerSuccess();
      closeModal();
    },
  });

  const triggerSuccess = () => {
    onSucess &&
      onSucess({
        type: "success",
        message: "Interesses atualizados com sucesso!",
      });
  };

  const renderFilteredData = useCallback(() => {
    if (filter.length < 3 || !data) return null;

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

  const handleUpdateInterests = () => {
    updateInterestsMutation.mutate({
      data: selectedCategories,
      headers: { Authorization: `Bearer ${token}` },
    });
  };

  const handleClickCategory = (id: string) => {
    const indexOfId = selectedCategories.indexOf(id);
    indexOfId === -1 || indexOfId === undefined
      ? selectedCategories.push(id)
      : selectedCategories.splice(indexOfId, 1);
    setSelectedCategories([...selectedCategories]);
  };

  if (isError) return "An error has occurred: ";

  if (!data) return "An error has occurred: ";

  return (
    <>
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
            label="Buscar interesses"
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
                  selectedCategories.includes(category.id)
                    ? "filled"
                    : "outlined"
                }
                onClick={() => handleClickCategory(category.id)}
              />
            ))
          )}
        </div>

        <div className="flex justify-between gap-6 mt-4 items-center">
          <Button variant="outlined" onClick={closeModal}>
            Cancelar
          </Button>
          <Button variant="outlined" onClick={handleUpdateInterests}>
            Atualizar
          </Button>
        </div>
      </Container>
    </>
  );
};

export default InterestsComponent;
