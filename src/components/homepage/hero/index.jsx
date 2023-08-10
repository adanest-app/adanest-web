import { Link } from "react-router-dom";
import homePng from "./home.png";
import "./style.css";

function Hero() {
  return (
    <div id="hero">
      <div>
        <h3>#AyoHidupSehat</h3>
        <h2>Lupakan Kecanduan PMO dengan Adanest</h2>
        <p>Bersama-sama, kita akan membangun fondasi yang kuat untuk kehidupan yang lebih sehat, lebih bahagia, dan bebas dari ketergantungan yang merusak.</p>
        <Link to="/create-account">
          <button className="btn btn-filled btn-filled-green">Daftar Sekarang</button>
        </Link>
      </div>
      <div>
        <img src={homePng} alt="home" />
      </div>
    </div>
  );
}

export default Hero;
