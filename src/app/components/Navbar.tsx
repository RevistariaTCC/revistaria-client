'use client'
import { AppBar, Box, Button, IconButton, Toolbar, Typography } from "@mui/material";
import { useState } from "react";
import MenuIcon from '@mui/icons-material/Menu';
import UserModal from "./UserModal";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { QueryClient, QueryClientProvider } from 'react-query'

import ptBR from 'date-fns/locale/pt-BR'
const queryClient = new QueryClient()

export default function NavBar(){

  const [showUserModal, setShowUserModal] = useState(false);

  return(
    <QueryClientProvider client={queryClient}>
      <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                News
              </Typography>
              <Button color="inherit" onClick={() => setShowUserModal(true)}>Login</Button>
            </Toolbar>
          </AppBar>
        </Box>
        <UserModal open={showUserModal} handleClose={() => setShowUserModal(false)}/>
      </LocalizationProvider>
    </QueryClientProvider>
    )
}