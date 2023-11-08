import Image from "next/image"
import { useState } from "react"

export default function CollectionDetail({params} : {params : {id: number}}) {

    const collections = [
        {id: 0 , collectionName: 'Naruto', category: ['Manga' , 'Shonnen', 'Ação', 'Comédia', 'Drama'], img: 'https://books.google.com.br/books/publisher/content?id=THsEEAAAQBAJ&hl=pt-BR&pg=PA1&img=1&zoom=3&bul=1&sig=ACfU3U3YI6v95ACL0S9G1QFQsdOTBeRnOA&w=1280' },
        {id: 1 , collectionName: 'Harry Potter', category: ['Fantasia' , 'Aventura'], img: 'https://m.media-amazon.com/images/I/518mqZ7A31L._SY445_SX342_.jpg' },
        {id: 2 , collectionName: 'Jujutsu Kaisen', category: ['Manga' , 'Shonen', 'Sobrenatural'], img: 'https://m.media-amazon.com/images/I/71PBZJaSmAL._SY466_.jpg' },
        {id: 3 , collectionName: 'Jogos Vorazes', category: ['Romance' , 'Ação', 'Drama', 'Ficção Científica'], img: 'https://m.media-amazon.com/images/I/41bJaeuf89L._SY445_SX342_.jpg' },
        {id: 4 , collectionName: 'As Crônicas de Gelo e Fogo', category: ['Fantasia' ,'Ação', 'Drama'], img: 'https://m.media-amazon.com/images/I/41UKpOWrZVL._SY445_SX342_.jpg' },
    ]

    const volume = collections[params.id]
  

    return (
        <div>
            <Image alt='' src={volume.img}></Image>
        </div>
    )
};
