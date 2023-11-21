import { useAuth } from "@/hooks/auth";
import { getReservations } from "@/services/api/internal/user";
import {
  Box,
  CircularProgress,
  Container,
  CssBaseline,
  TextField,
  Typography,
} from "@mui/material";
import { useCallback, useState } from "react";
import { useQuery } from "react-query";
import { format } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import VerifiedIcon from "@mui/icons-material/Verified";

interface ReservationListItemProps {
  reservation: ReservationType;
}

interface ReservationType {
  claimed: boolean;
  createdAt: Date;
  claimedDate: Date | null;
  volume: VolumeType;
}

type VolumeType = {
  image: string;
  title: string;
  collection: CollectionType;
};

type CollectionType = {
  name: string;
};

const ReservationListItem = ({ reservation }: ReservationListItemProps) => {
  return (
    <div className="flex gap-2 w-full">
      <img src={reservation.volume.image} alt="" width={80} />
      <div className="flex justify-between w-full content-baseline">
        <div className="flex flex-col">
          <Typography variant="caption">
            {reservation.volume.collection.name}
          </Typography>
          <Typography variant="h6">{reservation.volume.title}</Typography>
          <Typography variant="caption" className="flex flex-grow items-center">
            {format(new Date(reservation.createdAt), "dd 'de' MMMM 'de' yyyy", {
              locale: ptBR,
            })}
          </Typography>
        </div>
        {reservation.claimed && (
          <div className="flex flex-col items-end pt-5">
            <VerifiedIcon sx={{ width: 32, height: 32 }} />
            {reservation.claimedDate && (
              <Typography
                variant="caption"
                className="flex flex-grow items-center"
              >
                {format(
                  new Date(reservation.claimedDate),
                  "'Resgatado em' dd 'de' MMMM 'de' yyyy",
                  {
                    locale: ptBR,
                  }
                )}
              </Typography>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const ReservationsComponent = () => {
  const [filter, setFilter] = useState("");
  const { token } = useAuth();

  const { data, isLoading, isError } = useQuery<ReservationType[]>(
    getReservations({ headers: { Authorization: `Bearer ${token}` } })
  );

  const renderFilteredData = useCallback(() => {
    if (filter.length < 3 || !data) return null;

    const reservations = data
      ?.filter((reservation) =>
        reservation.volume.title
          .toLocaleLowerCase()
          .includes(filter.toLocaleLowerCase())
      )
      .map((reservation, index) => (
        <ReservationListItem
          key={`reservation-container-${index}`}
          reservation={reservation}
        />
      ));

    return reservations.length > 0
      ? reservations
      : "Nenhuma reserva com esse nome encontrada!";
  }, [filter]);

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
            renderFilteredData() ??
            data.map((reservation, index) => (
              <ReservationListItem
                key={`reservation-container-${index}`}
                reservation={reservation}
              />
            ))
          )}
        </div>
      </Container>
    </>
  );
};

export default ReservationsComponent;
