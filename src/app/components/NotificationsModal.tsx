import {
  Avatar,
  Badge,
  Box,
  CircularProgress,
  IconButton,
  Link,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Popover,
  Typography,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";

import { useState } from "react";
import { getUserNotifications } from "@/services/api/internal/notification";
import { useAuth } from "@/hooks/auth";
import { useQuery } from "react-query";
import { format } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";

interface iNotification {
  id: string;
  createdAt: Date;
  title: string;
  text: string;
  status: "UNREAD" | "READ";
  type: "NEW_RESERVATION" | "NEW_VOLUME" | "NEW_INTEREST";
}

const NOTIFICATION_ICONS = {
  NEW_RESERVATION: <AssignmentTurnedInIcon />,
  NEW_VOLUME: <LibraryAddIcon />,
  NEW_INTEREST: <LibraryAddIcon />,
};

const NotificationItem = ({
  notification,
  onClick,
}: {
  notification: iNotification;
  onClick(): void;
}) => {
  return (
    <ListItem>
      <ListItemButton onClick={onClick} className={`rounded ${notification.status === "UNREAD" ? "bg-violet-50" : ""}`}>
        <ListItemAvatar>
          <Avatar>{NOTIFICATION_ICONS[notification.type]}</Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={notification.title}
          secondary={
            <>
              {notification.text}
              <Typography
                sx={{ display: "inline" }}
                variant="caption"
                color="text.primary"
                className="flex justify-end"
              >
                {format(
                  new Date(notification.createdAt),
                  "dd 'de' MMMM 'de' yyyy",
                  {
                    locale: ptBR,
                  }
                )}
              </Typography>
            </>
          }
        />
      </ListItemButton>
    </ListItem>
  );
};

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
  const { token } = useAuth();
  const { data, isLoading } = useQuery<iNotification[]>(
    getUserNotifications({ Authorization: `Bearer ${token}` })
  );

  const unreadTotal = () => {
    return data
      ? data.filter((notification) => notification.status === "UNREAD").length
      : 0;
  };

  return (
    <ThemeProvider theme={theme}>
      <IconButton
        size="large"
        aria-label="show 17 new notifications"
        color="inherit"
        onClick={handleClick}
      >
        {data && (
          <Badge badgeContent={unreadTotal()} color="error">
            <NotificationsIcon />
          </Badge>
        )}
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
        {isLoading && <CircularProgress />}
        {data && data.length == 0 && (
          <Box className="flex items-center justify-center pt-4">
            <Typography>Nenhuma notificação encontrada!</Typography>
          </Box>
        )}
        <div className="flex justify-between px-3 items-center pt-2">
          <Typography variant="h5">Notificações</Typography>
          <Link variant="caption" className="cursor-pointer">marcar todas como lidas</Link>
        </div>

        <div className="flex w-96 max-h-96 overflow-y-auto">
          <List dense={true} className="w-full divide-y divide-slate-200">
            {data &&
              data.map((notification, index) => (
                <NotificationItem
                  notification={notification}
                  key={`notification-${index}`}
                  onClick={() => console.log("oi")}
                />
              ))}
          </List>
        </div>
      </Popover>
    </ThemeProvider>
  );
};

export default NotificationPopover;
