'use client'
import ScrollCards from "@/app/components/ScrollCards"
import { ArrowRightIcon } from "@mui/x-date-pickers"
import { Favorite, Star, StarBorder } from "@mui/icons-material"
import { useState } from "react"

export default function CollectionDetail({params} : {params : {id: number}}) {

    const [activeFavorite, setActiveFavorite] = useState(false)

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
        <div className="m-[0_8px_0_8px] h-full bg-slate-600"> 
            <div className="p-8 grid lg:grid-cols-2 gap-4 bg-white">
                <div>
                    <div className="mb-5">
                        <h1>{volume.collectionName}</h1>
                        <div className="flex items-center">
                            <button className="flex items-center w-10 h-10 justify-center p-1 rounded-full outline-none border-none" title="Favoritar coleção" onClick={()=> setActiveFavorite((prev) => !prev)}>
                                {activeFavorite? (
                                    <Star className="fill-yellow-500 w-9"/>
                                ) : (
                                    <Star className="fill-gray-500 hover:fill-yellow-500"/>
                                )}
                            </button> 
                            <span className="text-xs ms-2">Adicione à coleção de favoritos</span>
                        </div>
                    </div>
                    <div className="my-4">
                        <div className="flex justify-center">
                            <img width="250px" src={volume.img}></img>
                        </div>
                    </div>
                    <h2>Descrição</h2>
                    <p>A vida era melhor antigamente. Pelo menos é o que dizem. Mas Greg Heffley, um garoto acostumado ao conforto do mundo moderno, não concorda muito com isso. E uma decisão polêmica começa a colocar seu paraíso tecnológico em curto-circuito: todos da cidade decidem dar um tempo dos aparelhos eletrônicos. Dentro e fora de casa, Greg terá que enfrentar o dia a dia à moda antiga. Será que ele vai conseguir sobreviver do mesmo jeitinho que se fazia nos "bons e velhos tempos"?</p>
                </div>
                <div className="">
                    <h2 className="flex items-center">Volumes <ArrowRightIcon/></h2>
                    <ScrollCards volume={volumes}></ScrollCards>
                </div>
            </div>
        </div>
    )
};
