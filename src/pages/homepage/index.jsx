import "./style.css";
import Header from "../../components/shared/header";
import Container from "../../components/shared/container";
import Hero from "../../components/homepage/hero";
import About from "../../components/homepage/about";
import Why from "../../components/homepage/why";
import Services from "../../components/homepage/services";
import Team from "../../components/homepage/team";
import Contact from "../../components/homepage/contact";
import Footer from "../../components/shared/footer";
import { useEffect } from "react";

function Homepage() {
  useEffect(() => {
    document.title = "Adanest | Homepage";
  }, []);
  return (
    <>
      <div className="hero-bg-yellow">
        <Container>
          <Header.Primary
            leftAddon={<Header.Brand v={1} />}
            rightAddon={<Header.AuthButton />}
          />
          <Hero />
        </Container>
      </div>
      <Container>
        <About />
        <Why />
        <Services />
        <Team />
        <Contact />
      </Container>
      <Footer.FooterContainer>
        <Footer.FooterChild />
      </Footer.FooterContainer>
    </>
  );
}
export default Homepage;
