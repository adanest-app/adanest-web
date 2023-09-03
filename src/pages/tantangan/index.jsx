import Container from "../../components/shared/container";
import Footer from "../../components/shared/footer";
import Header from "../../components/shared/header";
import TantanganSection from "../../components/tantangan/TantanganSection";
import "./style.css";

export default function Tantangan() {
  return (
    <div className="bg-green">
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
        <TantanganSection />
      </Container>
      <Footer.FooterContainer>
        <Footer.FooterChild />
      </Footer.FooterContainer>
    </div>
  );
}
