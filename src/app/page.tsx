'use client'
import Carrousel from './components/Carrousel'
import Banner from './components/Banner'
import { Box, Card, CardActionArea, CardContent, CardHeader, CardMedia, Chip, Typography } from '@mui/material'
import Grid2 from '@mui/material/Unstable_Grid2/Grid2'
import { useRouter } from 'next/navigation'

export default function Page() {

  const collections = [
    {id: 0 , collectionName: 'Naruto', category: ['Manga' , 'Shonnen', 'Ação', 'Comédia', 'Drama'], img: 'https://books.google.com.br/books/publisher/content?id=THsEEAAAQBAJ&hl=pt-BR&pg=PA1&img=1&zoom=3&bul=1&sig=ACfU3U3YI6v95ACL0S9G1QFQsdOTBeRnOA&w=1280' },
    {id: 1 , collectionName: 'Harry Potter', category: ['Fantasia' , 'Aventura'], img: 'https://m.media-amazon.com/images/I/518mqZ7A31L._SY445_SX342_.jpg' },
    {id: 2 , collectionName: 'Jujutsu Kaisen', category: ['Manga' , 'Shonen', 'Sobrenatural'], img: 'https://m.media-amazon.com/images/I/71PBZJaSmAL._SY466_.jpg' },
    {id: 3 , collectionName: 'Jogos Vorazes', category: ['Romance' , 'Ação', 'Drama', 'Ficção Científica'], img: 'https://m.media-amazon.com/images/I/41bJaeuf89L._SY445_SX342_.jpg' },
    {id: 4 , collectionName: 'As Crônicas de Gelo e Fogo', category: ['Fantasia' ,'Ação', 'Drama'], img: 'https://m.media-amazon.com/images/I/41UKpOWrZVL._SY445_SX342_.jpg' },
  ]

  const router = useRouter();

  const handleClickColections = (id: number) => {
    router.push(`/collection-detail/${id}`);
  };
 
  return (
    <div className="">
      <Banner/>
      <div className='mt-8 flex justify-center'>
        <div className='flex flex-wrap gap-3 cell:justify-center md:justify-normal'>
          {collections.map((collection, index) => (
            <Card key={collection.id} className='w-[205px] p-2 flex flex-col justify-center hover:shadow-md hover:shadow-blue-300 hover:-translate-y-2 transition ease-in-out duration-200 cursor-pointer'>
              <CardActionArea onClick={() => handleClickColections(collection.id)} className='p-0 m-0 h-full'>
                <CardContent sx={{maxWidth: '100%', padding:'0'}}>
                  <CardMedia
                    component='img'
                    image={collection.img}
                    height={310}
                    className='my-1 max-w-full rounded-xl'
                  /> 
                <div className='h-12 flex justify-center items-center text-lg text-center'>
                  {collection.collectionName} 
                </div> 
                  <Box sx={{ flexGrow: 1}} className='h-20 flex justify-center items-center '>
                    <Grid2 container spacing={0.5} sx={{justifyContent: 'center'}}>
                      {collection.category.slice(0,3).map((element, index) => (
                        <Grid2 key={index}>
                          <Chip label={element}></Chip>
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
  
      <div className="mt-4">
          <div className="">
            <div className="h-8"></div>
            <Carrousel title='Em destaque'></Carrousel>
            <div className="h-8"></div>
            <Carrousel title='Sugestões'></Carrousel>
            <div className="h-8"></div>
            <Carrousel title='Favoritos'></Carrousel>
          </div>
      </div>
    </div>
  )
}