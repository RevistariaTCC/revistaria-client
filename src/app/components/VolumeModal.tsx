"use client";
import { useAuth } from "@/hooks/auth";
import { Alert, AlertColor, Box, Button, LinearProgress, Link, Modal, Snackbar } from "@mui/material";
import UserModal from "./navbar/UserModal";
import { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { reserveVolume } from "@/services/api/internal/volume";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  borderRadius: "10px"
};

type Volume = {
  id: string;
  title: string;
  category: string[];
  image: string;
  status: "AVAILABLE" | "UNAVAILABLE";
  synopsis: string;
};


type VolumeModalProps = {
  openModal: boolean;
  handleClose: () => void;
  volume: Volume
};

interface AlertType {
  type: AlertColor | undefined;
  message: string;
}

export default function VolumeModal({openModal, handleClose, volume}: VolumeModalProps) {
  const { user, token } = useAuth();
  const [showUserModal, setShowUserModal] = useState({ open: false, type: "" });
  const [showAlert, setShowAlert] = useState(false);

  const [alert, setAlert] = useState<AlertType>({
    type: undefined,
    message: "",
  });

  const reserveMutation = useMutation(reserveVolume, {
    onSuccess: (data) => {
      handleClose();
      setAlert({ type: "success", message: "Reservado com sucesso!" });
      setShowAlert(true);
    },
  });

  const handleCloseAlert = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setShowAlert(false);
  };

  const handleReservation = () => {
    reserveMutation.mutate({id: volume.id, headers: {"Authorization": `Bearer ${token}`}})
  };

  useEffect(() => {
    setShowUserModal({ open: false, type: "" });
  }, [user]);

  return (
    <div>
      <Modal
        open={openModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="min-w-[300px] max-w-[400]">
          {reserveMutation.isLoading && <LinearProgress />}
          <h2>Sinopse</h2>
          <div className="h-60 pe-2 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-900 scrollbar-track-gray-500 scrollbar-thumb-rounded-md scrollbar-track-rounded-md whitespace-pre-line">
            {volume.synopsis}
          </div>
          <div>
            {user ? (
              <Button
                variant="outlined"
                className={`mt-8 ${volume.status ===  'UNAVAILABLE'? 'bg-gray-400 hover:bg-gray-500' : 'bg-yellow-400 hover:bg-yellow-500' } bg-yellow-400 hover:bg-yellow-500 border-none capitalize text-inherit`}
                title="Reservar volume"
                onClick={handleReservation}
                disabled={volume.status === 'UNAVAILABLE'}
              >
                <div className="flex text-lg">Reservar</div>
              </Button>
            ) : (
              <Link
                className="mt-8 flex items-center justify-center cursor-pointer border-none"
                title="Reservar volume"
                onClick={() => {
                  setShowUserModal({ open: true, type: "signin" });
                  handleClose();
                }}
              >
                <div className="flex text-lg">Faça Login para reservar</div>
              </Link>
            )}
          </div>
        </Box>
      </Modal>
      <UserModal
        handleOpen={showUserModal}
        handleClose={() => setShowUserModal({ open: false, type: "" })}
      />
      <Snackbar
        className="fixed"
        open={showAlert}
        autoHideDuration={6000}
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseAlert}
          severity={alert.type}
          sx={{ width: "100%" }}
        >
          {alert.message}
        </Alert>
      </Snackbar>
    </div>
  );
}
