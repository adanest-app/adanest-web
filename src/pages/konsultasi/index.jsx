import Container from "../../components/shared/container";
import Footer from "../../components/shared/footer";
import Header from "../../components/shared/header";
import Hero from "../../components/konsultasi/hero";
import { useEffect } from "react";

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
      </Container>
      <Footer.FooterContainer>
        <Footer.FooterChild />
      </Footer.FooterContainer>
    </>
  );
}

export default Konsultasi;
