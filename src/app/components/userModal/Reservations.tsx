import { useAuth } from "@/hooks/auth";
import { getReservations } from "@/services/api/internal/user";
import { Box, CircularProgress, Container, CssBaseline, TextField, Typography } from "@mui/material";
import { useCallback, useState } from "react";
import { useQuery } from "react-query";

interface ReservationsComponentProps {
  closeModal(): void;
}

interface iReservation {
  claimed: boolean;
  createdAt: Date;
  claimedDate: Date | null;
  volume: VolumeType
}

type VolumeType = {
  image: string,
  title: string;
  collection: CollectionType
}

type CollectionType = {
  name: string
}


const ReservationListItem = (reservation: iReservation) => {
  return (<div>

  </div>)
}

const ReservationsComponent = ({ closeModal }: ReservationsComponentProps) => {
  const [filter, setFilter] = useState("");
  const { token } = useAuth();

  const {data, isLoading, isError} = useQuery<iReservation[]>(getReservations({headers: {'Authorization': `Bearer ${token}`}}))

  // const renderFilteredData = useCallback(() => {
  //   if (filter.length < 3 || !data) return null;

  //   return data
  //     ?.filter((category) => category.name.includes(filter))
  //     .map((category) => (
  //       <Chip
  //         key={`category-chip-${category.id}`}
  //         label={category.name}
  //         variant={
  //           selectedCategories.includes(category.id) ? "filled" : "outlined"
  //         }
  //         onClick={() => handleClickCategory(category.id)}
  //       />
  //     ));
  // }, [filter]);

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
            Suas reservas
          </Typography>
          <TextField
            id="standard-basic"
            label="Buscar reservas"
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
            <CircularProgress />
          ) : (
            // renderFilteredData() ??
            data.map((reservation, index) => (
              <ReservationListItem
                key={`reservation-container-${index}`}
              />
            ))
          )}
        </div>
      </Container>
    </>
  );
};

export default ReservationsComponent;
