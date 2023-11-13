import {
  CircularProgress,
  InputAdornment,
  Popover,
  TextField,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { listCollections } from "@/services/api/internal/collection";

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

const CollectionItem = ({ collection }: { collection: iCollection }) => {
  return (
    <div className="flex p-2 items-center justify-center gap-2 cursor-pointer hover:bg-slate-300">
      <img src={collection.image} alt="" width={50} className="rounded-md" />
      <Typography variant="h6" sx={{ p: 2 }}>
        {collection.name}
      </Typography>
    </div>
  );
};

const SearchInput = () => {
  const [anchorEl, setAnchorEl] = useState<
    HTMLInputElement | HTMLTextAreaElement | null | undefined
  >(null);

  const [searchTerm, setSearchTerm] = useState("");
  const { data, isLoading, error, refetch } = useQuery(
    listCollections(searchTerm)
  );

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
    <div>
      <TextField
        placeholder="Buscar"
        variant="standard"
        className="ml-8 relative"
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
          <div className="flex divide-y divide-slate-200">
            {data &&
              data.map((item: iCollection, index: number) => (
                <CollectionItem
                  key={`search-collection-${index}`}
                  collection={item}
                />
              ))}
          </div>
        </Popover>
      </ThemeProvider>
    </div>
  );
};

export default SearchInput;
