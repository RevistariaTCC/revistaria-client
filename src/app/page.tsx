'use client'
import Banner from './components/Banner'
import { Badge, Box, Card, CardActionArea, CardContent, CardHeader, CardMedia, Chip, Container, Typography } from '@mui/material'
import Grid2 from '@mui/material/Unstable_Grid2/Grid2'
import { useRouter } from 'next/navigation'
import { useQuery } from 'react-query'
import { listCollections } from '@/services/api/internal/collection'
import { ArrowRightIcon } from '@mui/x-date-pickers'
import IndexScrollCards from './components/IndexScrollCards'
import CollectionCard from './components/CollectionCard'

interface iCollection {
  name: string;
  id: string;
  image: string;
  categories: iCategory[];
  volumes: iVolumes[];
}

interface iVolumes {
  id: number;
  title: string;
  category: string[];
  image: string;
  status: "AVAILABLE" | "UNAVAILABLE";
}

interface iCategory {
  id: string;
  name: string;
}

export default function Page() {

  const router = useRouter()

  const { data, isLoading, error, refetch } = useQuery({
      ...listCollections(),
      onSuccess: (data) => {
        console.log(data)
      }
    } 
  );

  const handleClickColections = (id:string) => {
    router.push(`/collection-detail/${id}`)
  }

  const volumeList = data && data.map((element: iCollection) => element.volumes).reduce((listaVolumes: iVolumes[], livro: iVolumes[]) => {
    listaVolumes.push(...livro);
    return listaVolumes;
  }, []);

  return (
    <Container>
      <Banner/>
      <div className='mt-8 flex justify-center'>
        <div className='flex flex-wrap gap-3 cell:justify-center md:justify-normal'>
          {data && data.slice(0,4).map((collection: iCollection) => (
            <CollectionCard collection={collection} onClick={(id) => handleClickColections(id)} key={`new-collection-${collection.id}`}/>
          ))}
        </div>
      </div>
      <Container className='mt-16'>
        <h2 className="flex items-center">
          Sugestões <ArrowRightIcon />
        </h2>
        <IndexScrollCards volumes={volumeList}></IndexScrollCards>
      </Container>
      <Container className='mt-16'>
        <h2 className="flex items-center">
          Favoritos <ArrowRightIcon />
        </h2>
        <IndexScrollCards volumes={volumeList}></IndexScrollCards>
      </Container>
      <Container className='mt-16'>
        <h2 className="flex items-center">
          Tudo <ArrowRightIcon />
        </h2>
        <IndexScrollCards volumes={volumeList}></IndexScrollCards>
      </Container>
    </Container>
  )
}