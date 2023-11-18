"use client";
import {
  Alert,
  AlertColor,
  Box,
  Modal,
  Snackbar,
  Tab,
  Tabs,
} from "@mui/material";
import SignIn from "./userModal/SignIn";
import { useState } from "react";
import SignUp from "./userModal/SignUp";
import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material/Fade";
import InterestsComponent from "./userModal/Interests";
import ProfileComponent from "./userModal/Profile";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import ptBR from "date-fns/locale/pt-BR";
import ReservationsComponent from "./userModal/Reservations";

interface UserModalProps {
  handleOpen: { open: boolean; type: string };
  handleClose(): void;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

interface AlertType {
  type: AlertColor | undefined;
  message: string;
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const SignInContent = () => {
  function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
      </div>
    );
  }

  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={value} onChange={handleChange}>
          <Tab label="Entrar" {...a11yProps(0)} />
          <Tab label="Cadastrar" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <SignIn />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <SignUp />
      </CustomTabPanel>
    </>
  );
};

const Content = ({
  type,
  handleClose,
  onSuccess,
}: {
  type: string;
  handleClose(): void;
  onSuccess?(event: object): void;
}) => {
  switch (type) {
    case "signin":
      return <SignInContent />;
    case "interests":
      return (
        <InterestsComponent closeModal={handleClose} onSucess={onSuccess} />
      );
    case "profile":
      return <ProfileComponent closeModal={handleClose} onSucess={onSuccess} />;
    case "reservations":
        return <ReservationsComponent />
    default:
      return <div></div>;
  }
};

export default function UserModal({ handleClose, handleOpen }: UserModalProps) {
  const { open, type } = handleOpen;

  const [openAlert, setOpenAlert] = useState(false);
  const [alert, setAlert] = useState<AlertType>({
    type: undefined,
    message: "",
  });

  const onSucess = (event: AlertType) => {
    setOpenAlert(true);
    setAlert(event);
  };

  const handleCloseAlert = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenAlert(false);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box
            sx={{
              position: "absolute" as "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 720,
              bgcolor: "background.paper",
              border: "2px solid #000",
              boxShadow: 24,
              p: 4,
            }}
          >
            <Content
              type={type}
              handleClose={handleClose}
              onSuccess={onSucess}
            />
          </Box>
        </Fade>
      </Modal>

      <Snackbar
        className="fixed"
        open={openAlert}
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
    </LocalizationProvider>
  );
}
