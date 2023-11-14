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
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useState } from "react";
import { useAuth } from "@/hooks/auth";
import { useQuery } from "react-query";
import { getUserById } from "@/services/api/internal/user";
import { useRouter } from "next/navigation";

interface iCollection {
  id: string;
  name: string;
  image: string;
}

interface iUser {
  collections: iCollection[]
}

const CollectionItem = ({
  collection,
  onClick,
}: {
  collection: iCollection;
  onClick(): void;
}) => {
  return (
    <ListItem

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

const FavoritesPopover = () => {
  const [anchorEl, setAnchorEl] = useState<
    HTMLInputElement | HTMLTextAreaElement | null | undefined
  >(null);
  const router = useRouter();
  const { user, token } = useAuth();
  const [data, setData] = useState<iUser>()
  if(user) {
     useQuery({
      ...getUserById(user.id, { Authorization: `Bearer ${token}` }),
      onSuccess: (data) => {},
    });
  }


  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);

  const handleClickColections = (id: string) => {
    router.push(`/collection-detail/${id}`);
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton
        size="large"
        aria-label="Favoritos"
        color="inherit"
      >
        <Badge color="error">
          <FavoriteIcon />
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
        disableAutoFocus={true}
        disableEnforceFocus={true}
        className="mt-2 p-2"
      >
        <div className="flex divide-y divide-slate-200 w-96">
          {data && data.collections.length == 0 && (
            <Box sx={{ flexGrow: 1 }} className="p-10">
              <Typography>Sua lista de favoritos ainda está vazia!</Typography>
            </Box>
          )}
          <List dense={true} className="w-full">
            {data &&
              data.collections.map((item: iCollection, index: number) => (
                <CollectionItem
                  key={`search-collection-${index}`}
                  collection={item}
                  onClick={() => handleClickColections(item.id)}
                />
              ))}
          </List>
        </div>
      </Popover>
    </>
  );
};

export default FavoritesPopover;
