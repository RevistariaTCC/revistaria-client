"use client";
import * as React from "react";

import {
  AppBar,
  Badge,
  Box,
  Button,
  IconButton,
  InputAdornment,
  Link,
  Menu,
  MenuItem,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import FavoriteIcon from '@mui/icons-material/Favorite';
import UserModal from "./UserModal";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import AccountCircle from "@mui/icons-material/AccountCircle";
import SearchIcon from "@mui/icons-material/Search";
import ptBR from "date-fns/locale/pt-BR";
import { useAuth } from "@/hooks/auth";

export default function NavBar() {
  const [currentUser, setCurrentUser] = useState({})
  const [showUserModal, setShowUserModal] = useState({open: false, type: ''});
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    React.useState<null | HTMLElement>(null);

  const { user, signOut } = useAuth();

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const theme = createTheme({
    palette: {
      mode: "dark",
    },
  });


  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const openInterestsModal = () => {
    setShowUserModal({open: true, type: 'interests'})
    handleMenuClose()
  }

  const openProfileModal = () => {
    setShowUserModal({open: true, type: 'profile'})
    handleMenuClose()
  }

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={openInterestsModal}>Interesses</MenuItem>
      <MenuItem onClick={openProfileModal}>Minha conta</MenuItem>
      <MenuItem onClick={() => {signOut(); handleMenuClose()}}>Sair</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Minha conta</p>
      </MenuItem>
    </Menu>
  );

  useEffect(() => {
    setShowUserModal({open: false, type: ''});
    setCurrentUser(user)
  }, [user]);

  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
        <AppBar
          position="static"
          className="sticky top-0 z-20 w-full"
        >
          <Toolbar>
            <Link variant="h6" underline="none" href="/" color="inherit">Revistaria</Link>
            <TextField
              name="search"
              placeholder="Buscar"
              variant="standard"
              className="ml-8 relative"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
            <Box sx={{ flexGrow: 1 }} />
            {currentUser ? (
              <>
                <Box sx={{ display: { xs: "none", md: "flex" } }}>
                <IconButton
                    size="large"
                    aria-label="Favoritos"
                    color="inherit"
                  >
                    <Badge color="error">
                      <FavoriteIcon />
                    </Badge>
                  </IconButton>
                  <IconButton
                    size="large"
                    aria-label="show 17 new notifications"
                    color="inherit"
                  >
                    <Badge badgeContent={17} color="error">
                      <NotificationsIcon />
                    </Badge>
                  </IconButton>
                  <IconButton
                    size="large"
                    edge="end"
                    aria-label="account of current user"
                    aria-controls={menuId}
                    aria-haspopup="true"
                    onClick={handleProfileMenuOpen}
                    color="inherit"
                  >
                    <AccountCircle />
                  </IconButton>
                </Box>
                <Box sx={{ display: { xs: "flex", md: "none" } }}>
                  <IconButton
                    size="large"
                    aria-label="show more"
                    aria-controls={mobileMenuId}
                    aria-haspopup="true"
                    onClick={handleMobileMenuOpen}
                    color="inherit"
                  >
                    <MoreIcon />
                  </IconButton>
                  {renderMobileMenu}
                  {renderMenu}
                </Box>
              </>
            ) : (
              <Button color="inherit" onClick={() => setShowUserModal({open: true, type: 'signin'})}>
                Login
              </Button>
            )}
          </Toolbar>
        </AppBar>
        <UserModal
          handleOpen={showUserModal}
          handleClose={() => setShowUserModal({open: false, type: ''})}
          type="signin"
        />
      </LocalizationProvider>
    </ThemeProvider>
  );
}
