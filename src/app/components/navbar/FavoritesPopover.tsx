import {
  Avatar,
  Badge,
  Box,
  CircularProgress,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Popover,
  Typography,
} from "@mui/material";
import { Delete, Favorite } from "@mui/icons-material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState } from "react";
import { useAuth } from "@/hooks/auth";
import { useMutation, useQuery } from "react-query";
import { getUserById, unboundCollection } from "@/services/api/internal/user";
import { useRouter } from "next/navigation";

interface iCollection {
  id: string;
  name: string;
  image: string;
}

interface iUser {
  collections: iCollection[];
}

interface FavoritesPopoverProps {
  userID: string;
}

const CollectionItem = ({
  collection,
  onClick,
  secondAction,
}: {
  collection: iCollection;
  onClick(): void;
  secondAction(): void;
}) => {
  return (
    <ListItem
      secondaryAction={
        <IconButton edge="end" aria-label="delete" onClick={secondAction}>
          <Delete />
        </IconButton>
      }
    >
      <ListItemButton onClick={onClick}>
        <ListItemAvatar>
          <Avatar>
            <img
              src={collection.image}
              alt=""
              width={50}
              className="rounded-md"
            />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={collection.name} />
      </ListItemButton>
    </ListItem>
  );
};

const FavoritesPopover = ({ userID }: FavoritesPopoverProps) => {
  const theme = createTheme({
    palette: {
      mode: "light",
    },
  });
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const router = useRouter();
  const { token } = useAuth();
  const [data, setData] = useState<iUser>();
  const { refetch } = useQuery({
    ...getUserById(userID, { Authorization: `Bearer ${token}` }),
    onSuccess: (data) => {
      setData(data);
    },
    enabled: false,
  });

  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);

  const handleClickColections = (id: string) => {
    router.push(`/collection-detail/${id}`);
    setAnchorEl(null);
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event?.currentTarget);
    refetch();
  };

  const removeFavoriteMutation = useMutation(unboundCollection, {
    onSuccess: (data) => {
      setData(data);
    },
  });

  const handleUnlinkCollection = (id: string) => {
    removeFavoriteMutation.mutate({
      id,
      headers: { Authorization: `Bearer ${token}` },
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <IconButton
        size="large"
        aria-label="Favoritos"
        color="inherit"
        onClick={handleClick}
      >
        <Badge color="error">
          <Favorite />
        </Badge>
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
        {data && data.collections.length == 0 && (
          <Box sx={{ flexGrow: 1 }} className="pt-2 px-4">
            <Typography>Sua lista de favoritos ainda está vazia!</Typography>
          </Box>
        )}
        <div className="flex divide-y divide-slate-200 w-96">
          <List dense={true} className="w-full">
            {data &&
              data.collections.map((item: iCollection, index: number) => (
                <CollectionItem
                  key={`search-collection-${index}`}
                  collection={item}
                  onClick={() => handleClickColections(item.id)}
                  secondAction={() => handleUnlinkCollection(item.id)}
                />
              ))}
          </List>
        </div>
      </Popover>
    </ThemeProvider>
  );
};

export default FavoritesPopover;
