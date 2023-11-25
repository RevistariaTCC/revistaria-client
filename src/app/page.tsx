import Banner from "./components/Banner";
import { Container } from "@mui/material";
import UserCustomCarousel from "./components/index/UserCustomCarousel";
import NewCollectionsCaroulsel from "./components/index/NewCollectionsCarousel";
import ListCollections from "./components/index/ListCollections";
import ListVolumes from "./components/index/ListVolumes";

export default function Page() {
  return (
    <Container>
      <Banner />
      <NewCollectionsCaroulsel />
      <UserCustomCarousel />
      <ListCollections />
      <ListVolumes />
    </Container>
  );
}
