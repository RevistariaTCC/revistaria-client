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
import { getUserNotifications, readAllNotifications, readNotification } from "@/services/api/internal/notification";
import { useAuth } from "@/hooks/auth";
import { useMutation, useQuery } from "react-query";
import { format } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import { headers } from "next/dist/client/components/headers";

interface iNotification {
  id: string;
  createdAt: Date;
  title: string;
  text: string;
  status: "UNREAD" | "READ";
  type: "NEW_RESERVATION" | "NEW_VOLUME" | "NEW_INTEREST";
  data?: string
}

const NOTIFICATION_ICONS = {
  NEW_RESERVATION: <AssignmentTurnedInIcon />,
  NEW_VOLUME: <LibraryAddIcon />,
  NEW_INTEREST: <LibraryAddIcon />,
};

interface NotificationPopoverProps {
  openReservations(): void
  navigate(param: string): void
}

interface NotificationItemProps {
  notification: iNotification;
  onClick(): void
}

const NotificationItem = ({notification, onClick}: NotificationItemProps) => {
  
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

const NotificationPopover = ({openReservations, navigate}: NotificationPopoverProps) => {
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
  const { data, isLoading, refetch } = useQuery<iNotification[]>(
    getUserNotifications({ Authorization: `Bearer ${token}` })
  );

  const unreadTotal = () => {
    return data
      ? data.filter((notification) => notification.status === "UNREAD").length
      : 0;
  };
  const readNotificationMutation = useMutation(readNotification, {
    onSuccess: (data) => {
      refetch()
    }
  });

  const readAllNotificationMutation = useMutation(readAllNotifications, {
    onSuccess: (data) => {
      refetch()
    }
  })

  const actions = {
    NEW_RESERVATION: openReservations,
    NEW_INTEREST: navigate,
    NEW_VOLUME: navigate
  }

  const handleClickNotification = (id: string, type: "NEW_VOLUME" | "NEW_RESERVATION" | "NEW_INTEREST", data = "") => {
    handleClose();
    readNotificationMutation.mutate({id: id, headers: {"Authorization": `Bearer ${token}`}})
    actions[type](data);
  }

  const handleReadAllNotification = () => {
    readAllNotificationMutation.mutate({"Authorization": `Bearer ${token}`})
  }

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
          <Link variant="caption" className="cursor-pointer" onClick={handleReadAllNotification}>marcar todas como lidas</Link>
        </div>

        <div className="flex w-96 max-h-96 overflow-y-auto">
          <List dense={true} className="w-full divide-y divide-slate-200">
            {data &&
              data.map((notification, index) => (
                <NotificationItem
                  notification={notification}
                  key={`notification-${index}`}
                  onClick={() => handleClickNotification(notification.id, notification.type, notification.data)}
                />
              ))}
          </List>
        </div>
      </Popover>
    </ThemeProvider>
  );
};

export default NotificationPopover;
