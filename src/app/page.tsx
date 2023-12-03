import Banner from "./components/Banner";
import { Container } from "@mui/material";
import UserCustomCarousel from "./components/index/UserCustomCarousel";
import NewCollectionsCaroulsel from "./components/index/NewCollectionsCarousel";
import ListCollections from "./components/index/ListCollections";
import ListVolumes from "./components/index/ListVolumes";

export default function Page() {
  return (
    <div>
      <div className="p-7 bg-white my-9">
        <Container maxWidth='xl'>
          <Banner />
        </Container>
      </div>
      <div className="mt-16">
        <Container maxWidth='lg'>
          <NewCollectionsCaroulsel />
        </Container>
      </div>
      <div className=" mt-16">
        <Container maxWidth='xl' className="bg-[#1e1e1e] text-white font-bold h-10 flex items-center rounded-t">
          Nosso conteudo
        </Container>
        <Container maxWidth='xl' className='bg-white px-[3%] pb-8 pt-1'>
          <UserCustomCarousel />
          <ListCollections />
          <ListVolumes />
        </Container>
      </div>
    </div>
  );
}
