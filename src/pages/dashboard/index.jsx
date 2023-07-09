import Container from "../../components/shared/container";
import Footer from "../../components/shared/footer";
import Header from "../../components/shared/header";
import Hero from "../../components/dashboard/hero";
import { useEffect } from "react";

function Dashboard() {
  useEffect(() => {
    document.title = "Adanest | Dashboard";
    document.body.style.backgroundColor = "var(--white)";
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
        {/* <Overview /> */}
      </Container>
      <Footer.FooterContainer>
        <Footer.FooterChild />
      </Footer.FooterContainer>
    </>
  );
}

export default Dashboard;
