'use client'
import Carrousel from "@/app/components/Carrousel"
import { starIcon } from "../../../../public/icons/Icons"
import { ArrowForward } from "@mui/icons-material"
import { ArrowRightIcon } from "@mui/x-date-pickers"

export default function CollectionDetail({params} : {params : {id: number}}) {

    const collections = [
        {id: 0 , collectionName: 'Naruto', category: ['Manga' , 'Shonnen', 'Ação', 'Comédia', 'Drama'], img: 'https://books.google.com.br/books/publisher/content?id=THsEEAAAQBAJ&hl=pt-BR&pg=PA1&img=1&zoom=3&bul=1&sig=ACfU3U3YI6v95ACL0S9G1QFQsdOTBeRnOA&w=1280' },
        {id: 1 , collectionName: 'Harry Potter', category: ['Fantasia' , 'Aventura'], img: 'https://m.media-amazon.com/images/I/518mqZ7A31L._SY445_SX342_.jpg' },
        {id: 2 , collectionName: 'Jujutsu Kaisen', category: ['Manga' , 'Shonen', 'Sobrenatural'], img: 'https://m.media-amazon.com/images/I/71PBZJaSmAL._SY466_.jpg' },
        {id: 3 , collectionName: 'Jogos Vorazes', category: ['Romance' , 'Ação', 'Drama', 'Ficção Científica'], img: 'https://m.media-amazon.com/images/I/41bJaeuf89L._SY445_SX342_.jpg' },
        {id: 4 , collectionName: 'As Crônicas de Gelo e Fogo', category: ['Fantasia' ,'Ação', 'Drama'], img: 'https://m.media-amazon.com/images/I/41UKpOWrZVL._SY445_SX342_.jpg' },
    ]

    const volumes = [
        {id: 0 , volumeName: 'Harry Potter 1', category: ['Fantasia' , 'Aventura'], img: 'https://m.media-amazon.com/images/I/518mqZ7A31L._SY445_SX342_.jpg' },
        {id: 1 , volumeName: 'Harry Potter 2', category: ['Fantasia' , 'Aventura'], img: 'https://m.media-amazon.com/images/I/518mqZ7A31L._SY445_SX342_.jpg' },
        {id: 2 , volumeName: 'Harry Potter 3', category: ['Fantasia' , 'Aventura'], img: 'https://m.media-amazon.com/images/I/518mqZ7A31L._SY445_SX342_.jpg' },
        {id: 3 , volumeName: 'Harry Potter 4', category: ['Fantasia' , 'Aventura'], img: 'https://m.media-amazon.com/images/I/518mqZ7A31L._SY445_SX342_.jpg' },
        {id: 4 , volumeName: 'Harry Potter 5', category: ['Fantasia' , 'Aventura'], img: 'https://m.media-amazon.com/images/I/518mqZ7A31L._SY445_SX342_.jpg' },
    ]
        
    const volume = collections[params.id]
  
    return (
        <div className="m-8 h-full"> 
            <div className="mx-44 p-8 grid grid-cols-2 justify-center flex-col">
                <div>
                    <div className="my-4">
                        <div className="flex justify-center">
                            <img width="250px" src={volume.img}></img>
                        </div>
                    </div>
                    <h2>Descrição</h2>
                    <p>A vida era melhor antigamente. Pelo menos é o que dizem. Mas Greg Heffley, um garoto acostumado ao conforto do mundo moderno, não concorda muito com isso. E uma decisão polêmica começa a colocar seu paraíso tecnológico em curto-circuito: todos da cidade decidem dar um tempo dos aparelhos eletrônicos. Dentro e fora de casa, Greg terá que enfrentar o dia a dia à moda antiga. Será que ele vai conseguir sobreviver do mesmo jeitinho que se fazia nos "bons e velhos tempos"?</p>
                </div>
                <div>
                    <div className="mb-5">
                        <h1 className="ms-14">{volume.collectionName}</h1>
                    </div>
                    <div>
                        <button className="ms-14 mt-8 flex items-center justify-center w-40 bg-yellow-400 hover:bg-yellow-500 rounded-lg outline-none border-none" title="Favoritar coleção">
                            <div className="flex text-lg w-10 h-10">
                                {starIcon}
                            </div>
                        </button>
                        <p className="ms-14">Adicione essa coleção a sua lista de favoritos para ficar atento sobre as novidades</p>
                    </div>
                    <div className="mt-40">
                        <h2 className="ms-14 flex items-center">Volumes <ArrowRightIcon/></h2>
                        <div className="flex gap-1 justify-center">
                            <Carrousel volume={volumes}></Carrousel>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};
