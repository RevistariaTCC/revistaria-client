"use client";
import ScrollCards from "@/app/components/ScrollCards";
import { ArrowRightIcon } from "@mui/x-date-pickers";
import GradeOutlinedIcon from "@mui/icons-material/GradeOutlined";
import GradeIcon from "@mui/icons-material/Grade";
import { useState } from "react";
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

  const checkIsFavorite = (collectios: iCollections[], id: string) => {
    return collectios.some((collection) => collection.id == id);
  };

  if (user) {
    useQuery({
      ...getUserById(user.id, { Authorization: `Bearer ${token}` }),
      onSuccess: (data) => {
        setActiveFavorite(checkIsFavorite(data.collections, params.id));
      },
    });
  }

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
        <div className="grid lg:grid-cols-2 gap-4 bg-white">
          <div className="flex flex-col">
            <div className="flex p-2">
              <h1>{collection.name}</h1>
            </div>
            <div className="my-4 p-2 flex">
              <img width={360} src={collection.image} className="rounded"></img>
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

            <p>
              A vida era melhor antigamente. Pelo menos é o que dizem. Mas Greg
              Heffley, um garoto acostumado ao conforto do mundo moderno, não
              concorda muito com isso. E uma decisão polêmica começa a colocar
              seu paraíso tecnológico em curto-circuito: todos da cidade decidem
              dar um tempo dos aparelhos eletrônicos. Dentro e fora de casa,
              Greg terá que enfrentar o dia a dia à moda antiga. Será que ele
              vai conseguir sobreviver do mesmo jeitinho que se fazia nos "bons
              e velhos tempos"?
            </p>
            <h2 className="flex items-center">
              Volumes <ArrowRightIcon />
            </h2>
            <ScrollCards volume={collection.volumes}></ScrollCards>
          </div>
        </div>
      </Container>
    );
  }
}
