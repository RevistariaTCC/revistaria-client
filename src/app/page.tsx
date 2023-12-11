import Banner from "./components/Banner";
import { Container } from "@mui/material";
import UserCustomCarousel from "./components/index/UserCustomCarousel";
import NewCollectionsCarousel from "./components/index/NewCollectionsCarousel";
import ListCollections from "./components/index/ListCollections";
import ListVolumes from "./components/index/ListVolumes";

export default function Page() {
  return (
    <div>
      <div className="bg-white p-7 my-8">
        <Container maxWidth='xl'>
          <Banner />
        </Container>
      </div>
      <Container className="mt-16">
        <NewCollectionsCarousel />
      </Container>
        
      <div className="mt-16">
        <Container maxWidth='xl' className="bg-[#2e2e2e] text-white text-lg uppercase font-bold h-10 flex items-center px-[5%] rounded-t">
          Nosso Conteudo
        </Container>
        <Container maxWidth='xl' className="bg-white pt-2 pb-8 py-4 "> 
          <Container maxWidth='lg'>
            <UserCustomCarousel />
            <ListCollections />
            <ListVolumes />
          </Container>
        </Container>
      </div>    
    </div>
  );
}
