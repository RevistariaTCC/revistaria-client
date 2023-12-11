"use client";
import * as React from "react";
import {
  AppBar,
  Badge,
  Box,
  Button,
  Container,
  IconButton,
  Link,
  Menu,
  MenuItem,
  Toolbar,
} from "@mui/material";
import { useEffect, useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import LoginIcon from "@mui/icons-material/Login";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { useAuth } from "@/hooks/auth";

import LogoutIcon from "@mui/icons-material/Logout";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import InterestsIcon from "@mui/icons-material/Interests";
import { useRouter } from "next/navigation";
import SearchInput from "./navbar/SearchInput";
import FavoritesPopover from "./navbar/FavoritesPopover";
import NotificationPopover from "./navbar/NotificationsModal";
import UserModal from "./navbar/UserModal";
import { iUser } from "@/schemas/User";

export default function NavBar() {
  const [showUserModal, setShowUserModal] = useState({ open: false, type: "" });
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState<null | HTMLElement>(null);
  const { user, signOut } = useAuth();

  const [currentUser, setCurrentUser] = useState<iUser>({} as iUser)


  useEffect(() => {
    setShowUserModal({ open: false, type: "" });
    setCurrentUser(user)
  }, [user]);

  const router = useRouter();
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

  const openUserModal = (type: string) => {
    setShowUserModal({ open: true, type });
    handleMenuClose();
  };

  const navigate = (id: string) => {
    router.push(`/collection-detail/${id}`);
  };

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
      <MenuItem onClick={() => openUserModal("interests")}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <InterestsIcon />
        </IconButton>
        <p>Interesses</p>
      </MenuItem>
      <MenuItem onClick={() => openUserModal("profile")}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Conta</p>
      </MenuItem>
      <MenuItem onClick={() => openUserModal("reservations")}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AssignmentTurnedInIcon />
        </IconButton>
        <p>Reservas</p>
      </MenuItem>
      <MenuItem
        onClick={() => {
          signOut();
          handleMenuClose();
        }}
      >
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <LogoutIcon />
        </IconButton>
        <p>Sair</p>
      </MenuItem>
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
      <MenuItem
        onClick={() => {
          signOut();
          handleMenuClose();
        }}
      >
        Sair
      </MenuItem>
    </Menu>
  );

  return (
    <>
      <ThemeProvider theme={theme}>
        <AppBar position="static" className="sticky top-0 z-20 w-full">
          <Toolbar>
            <Container
              sx={{
                display: "flex",
                height: "100%",
                justifyContent: "justify-center",
                alignItems: "center",
              }}
            >
              <Link variant="h6" underline="none" href="/" color="inherit">
                <img src={'https://revistariabanners.s3.sa-east-1.amazonaws.com/hero.png'} className="w-32 flex " alt="Revistaria"/>
              </Link>
              <SearchInput />
              <Box sx={{ flexGrow: 1 }} />
              {currentUser && Object.keys(currentUser).length > 0 && (
                <>
                  <Box sx={{ display: { xs: "none", md: "flex" } }}>
                    <FavoritesPopover userID={currentUser.id} />
                    <NotificationPopover
                      openReservations={() => openUserModal("reservations")}
                      navigate={navigate}
                    />
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
              )}
              {!currentUser && (
                <Button
                  color="inherit"
                  onClick={() =>
                    setShowUserModal({ open: true, type: "signin" })
                  }
                  className="gap-2"
                >
                  <LoginIcon />
                  Login
                </Button>
              )}
            </Container>
          </Toolbar>
        </AppBar>
      </ThemeProvider>
      <UserModal
        handleOpen={showUserModal}
        handleClose={() => setShowUserModal({ open: false, type: "" })}
      />
    </>
  );
}
