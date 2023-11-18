import { Badge, IconButton, List, Popover, Typography } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { useState } from "react";
import { getUserNotifications } from "@/services/api/internal/notification";
import { useAuth } from "@/hooks/auth";
import { useQuery } from "react-query";

interface iNotification {
  id: string,
  createdAt: Date,
  title: string,
  "text": string,
  "status": "UNREAD" | "READ",
  "type": "NEW_RESERVATION" | "NEW_VOLUME" | "NEW_INTEREST"}

const NotificationPopover = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event?.currentTarget);
  };

  const open = Boolean(anchorEl);
  const theme = createTheme({
    palette: {
      mode: "light",
    },
  });
  const {token} = useAuth();
  const {data, isLoading} = useQuery<iNotification[]>(getUserNotifications({"Authorization": `Bearer ${token}`}))

  const unreadTotal = () => {

    return data ? data.filter(notification => notification.status === "UNREAD").length : 0
  }

  return (
    <ThemeProvider theme={theme}>
    
    <IconButton
      size="large"
      aria-label="show 17 new notifications"
      color="inherit"
      onClick={handleClick}
    >
      {data && <Badge badgeContent={unreadTotal()} color="error">
        <NotificationsIcon />
      </Badge> }
    </IconButton>
    
    <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{ vertical: 30, horizontal: "center" }}
        disableAutoFocus={true}
        disableEnforceFocus={true}
        className="mt-4"
      >
        <div className="flex items-center justify-center pt-4">
          <Typography>Nenhuma notificação encontrada!</Typography>
        </div>
        {/* {data && data.collections.length == 0 && (
          <Box sx={{ flexGrow: 1 }} className="pt-2 px-4">
            <Typography>Sua lista de favoritos ainda está vazia!</Typography>
          </Box>
        )} */}
        <div className="flex divide-y divide-slate-200 w-96">
          <List dense={true} className="w-full">
          </List>
        </div>
      </Popover>
    </ThemeProvider>

  );
};

export default NotificationPopover;
