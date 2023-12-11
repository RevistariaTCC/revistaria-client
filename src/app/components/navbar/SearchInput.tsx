import {
  Avatar,
  Box,
  CircularProgress,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Popover,
  TextField,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { searchCollections } from "@/services/api/internal/collection";
import { useRouter } from "next/navigation";
import DeleteIcon from "@mui/icons-material/Delete";

interface iCollection {
  id: string;
  name: string;
  image: string;
}

const theme = createTheme({
  palette: {
    mode: "light",
  },
});

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

const SearchInput = () => {
  const router = useRouter();

  const handleClickColections = (id: string) => {
    router.push(`/collection-detail/${id}`);
    setAnchorEl(null);
    setSearchTerm("");
  };

  const [anchorEl, setAnchorEl] = useState<
    HTMLInputElement | HTMLTextAreaElement | null | undefined
  >(null);

  const [searchTerm, setSearchTerm] = useState("");
  const { data, isLoading, refetch } = useQuery(searchCollections(searchTerm));

  const handleSearch = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | undefined
  ) => {
    setSearchTerm(event?.target.value ?? "");
    if (searchTerm.length > 2) {
      setAnchorEl(event?.target);
      refetch();
    } else {
      setAnchorEl(null);
    }
  };

  const handleFocus = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | undefined
  ) => {
    if (searchTerm.length > 2) {
      setAnchorEl(event?.target);
      refetch();
    } else {
      setAnchorEl(null);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);

  return (
    <>
      <TextField
        placeholder="Buscar"
        variant="standard"
        sx={{marginLeft: 4}}
        className="relative"
        value={searchTerm}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        onChange={handleSearch}
        onFocus={handleFocus}
        autoComplete="off"
      />
      <ThemeProvider theme={theme}>
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
          {isLoading && <CircularProgress />}
          {data && data.length == 0 && (
              <Box sx={{ flexGrow: 1 }} className="pt-2 px-4">
                <Typography>
                  Não encontramos nenhuma coleção com esse nome!
                </Typography>
              </Box>
            )}
          <div className="flex divide-y divide-slate-200 w-96">
            <List dense={true} className="w-full">
              {data &&
                data.map((item: iCollection, index: number) => (
                  <CollectionItem
                    key={`search-collection-${index}`}
                    collection={item}
                    onClick={() => handleClickColections(item.id)}
                  />
                ))}
            </List>
          </div>
        </Popover>
      </ThemeProvider>
    </>
  );
};

export default SearchInput;
