import { useEffect } from 'react'
import About from '../../components/homepage/about'
import Contact from '../../components/homepage/contact'
import Hero from '../../components/homepage/hero'
import Services from '../../components/homepage/services'
import Team from '../../components/homepage/team'
import Why from '../../components/homepage/why'
import Container from '../../components/shared/container'
import Footer from '../../components/shared/footer'
import Header from '../../components/shared/header'
import './style.css'

function Homepage() {
  useEffect(() => {
    document.title = 'Adanest | Homepage'
  }, [])
  return (
    <div id="homepage">
      <div className="hero-bg-yellow">
        <Container>
          <Header.Primary leftAddon={<Header.Brand v={1} />} rightAddon={<Header.AuthButton />} />
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
    </div>
  )
}
export default Homepage
