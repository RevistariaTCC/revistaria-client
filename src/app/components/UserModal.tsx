"use client";
import { Box, Modal, Tab, Tabs } from "@mui/material";
import SignIn from "./userModal/SignIn";
import { useState } from "react";
import SignUp from "./userModal/SignUp";
import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material/Fade";

interface UserModalProps {
  open: boolean;
  handleClose(): void;
}

export default function UserModal({ open, handleClose }: UserModalProps) {
  interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
  }

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

  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
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
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
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
        </Box>
      </Fade>
    </Modal>
  );
}
