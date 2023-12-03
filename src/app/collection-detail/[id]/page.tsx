"use client";
import ScrollCards from "@/app/components/ScrollCards";
import { ArrowRightIcon } from "@mui/x-date-pickers";
import GradeOutlinedIcon from "@mui/icons-material/GradeOutlined";
import GradeIcon from "@mui/icons-material/Grade";
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { showCollection } from "@/services/api/internal/collection";
import {
  boundCollection,
  getUserById,
  unboundCollection,
} from "@/services/api/internal/user";
import { useAuth } from "@/hooks/auth";
import { CircularProgress, Container } from "@mui/material";
import IconButton from "@mui/material/IconButton";

interface iCollections {
  id: string;
}

export default function CollectionDetail({
  params,
}: {
  params: { id: string };
}) {
  const { user, token } = useAuth();

  const { isLoading, data } = useQuery({
    ...showCollection(params.id),
  });

  const checkIsFavorite = (collections: iCollections[], id: string) => {
    if (!collections) return false;
    return collections.some((collection) => collection.id == id);
  };

  const {refetch} = useQuery({
    ...getUserById(user?.id, { Authorization: `Bearer ${token}` }),
    onSuccess: (data) => {
      setActiveFavorite(checkIsFavorite(data.collections, params.id));
    },
    enabled: false,
  })

  useEffect(() => {
    if (user) refetch()

  }, [user]);

  const addFavoriteMutation = useMutation(boundCollection, {
    onSuccess: (data) => {
      setActiveFavorite(checkIsFavorite(data.collections, params.id));
    },
  });

  const removeFavoriteMutation = useMutation(unboundCollection, {
    onSuccess: (data) => {
      setActiveFavorite(checkIsFavorite(data.collections, params.id));
    },
  });

  const handleFavoriteCollection = () => {
    if (!activeFavorite) {
      addFavoriteMutation.mutate({
        id: params.id,
        headers: { Authorization: `Bearer ${token}` },
      });
    } else {
      removeFavoriteMutation.mutate({
        id: params.id,
        headers: { Authorization: `Bearer ${token}` },
      });
    }
  };

  const [activeFavorite, setActiveFavorite] = useState(false);

  if (isLoading)
    return (
      <Container className="flex items-center justify-center h-full w-full">
        <CircularProgress />
      </Container>
    );

  const collection = data;

  if (data) {
    return (
      <Container>
        <div className="grid cell:grid-cols-1 md:grid-cols-2 gap-4 bg-white">
          <div className="flex flex-col">
            <div className="flex p-2">
              <h1>{collection.name}</h1>
            </div>
            
              <div className="my-4 p-2 flex cell:justify-center md:justify-start">
                <img src={collection.image} className="rounded cell:w-[280px] md:w-[320px] lg:w-[400px]"></img>
              </div>
        
            {user && (
              <div className="flex items-center">
                <IconButton
                  className="flex items-center justify-center outline-none w-10"
                  title="Favoritar coleção"
                  onClick={handleFavoriteCollection}
                >
                  {activeFavorite ? <GradeIcon /> : <GradeOutlinedIcon />}
                </IconButton>
                <span className="text-xs ms-2">
                  Adicione à coleção de favoritos
                </span>
              </div>
            )}
          </div>
          <div className="flex flex-col justify-between">
            <h2>Descrição</h2>

            <p>{collection.description}</p>
            <h2 className="flex items-center">
              Volumes <ArrowRightIcon />
            </h2>
            <div className="mx-2">
              <ScrollCards volumes={collection.volumes}></ScrollCards>
            </div>
          </div>
        </div>
      </Container>
    );
  }
}
