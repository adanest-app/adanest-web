import { useEffect } from "react";
import Hero from "../../components/konsultasi/hero";
import PilihKonsultan from "../../components/konsultasi/pilih-konsultan";
import Container from "../../components/shared/container";
import Footer from "../../components/shared/footer";
import Header from "../../components/shared/header";

function Konsultasi() {
  useEffect(() => {
    document.title = "Adanest | Konsultasi";
  }, []);
  return (
    <>
      <Container>
        <Header.Secondary
          leftAddon={<Header.Brand />}
          rightAddon={
            <>
              <Header.NotificationIcon />
              <Header.UserProfileBtn />
            </>
          }
        />
        <Hero />
        <PilihKonsultan />
      </Container>
      <Footer.FooterContainer>
        <Footer.FooterChild />
      </Footer.FooterContainer>
    </>
  );
}

export default Konsultasi;
