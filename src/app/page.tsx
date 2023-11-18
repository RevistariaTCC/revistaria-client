'use client'
import Banner from './components/Banner'
import { Box, Card, CardActionArea, CardContent, CardHeader, CardMedia, Chip, Container, Typography } from '@mui/material'
import Grid2 from '@mui/material/Unstable_Grid2/Grid2'
import { useRouter } from 'next/navigation'
import { useQuery } from 'react-query'
import { listCollections } from '@/services/api/internal/collection'
import { ArrowRightIcon } from '@mui/x-date-pickers'
import IndexScrollCards from './components/IndexScrollCards'

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
          {data && data.slice(0,4).map((element: iCollection) => (
            <Card key={element.id} className='w-[205px] p-2 flex flex-col justify-center hover:shadow-md hover:shadow-blue-300 hover:-translate-y-2 transition ease-in-out duration-200 cursor-pointer'>
              <CardActionArea onClick={()=>handleClickColections(element.id)} className='p-0 m-0 h-full'>
                <CardContent sx={{maxWidth: '100%', padding:'0'}}>
                  <CardMedia
                    component='img'
                    image={element.image}
                    height={310}
                    className='my-1 max-w-full rounded-xl'
                  /> 
                 
                  <Box sx={{ flexGrow: 1}} className='h-20 flex justify-center items-center'>
                    <Grid2 container spacing={0.5} sx={{justifyContent: 'center'}}>
                      {element.categories && element.categories.slice(0,3).map((category, index) => (
                        <Grid2 key={index}>
                          <Chip label={category.name}></Chip>
                        </Grid2>
                      ))}
                    </Grid2>
                  </Box>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
        </div>
      </div>
      <Container className='mt-16'>
        <h2 className="flex items-center">
          Novidades <ArrowRightIcon />
        </h2>
        <IndexScrollCards volumes={volumeList}></IndexScrollCards>
      </Container>
      <Container className='mt-16'>
        <h2 className="flex items-center">
          Novidades <ArrowRightIcon />
        </h2>
        <IndexScrollCards volumes={volumeList}></IndexScrollCards>
      </Container>
      <Container className='mt-16'>
        <h2 className="flex items-center">
          Novidades <ArrowRightIcon />
        </h2>
        <IndexScrollCards volumes={volumeList}></IndexScrollCards>
      </Container>
    </Container>
  )
}