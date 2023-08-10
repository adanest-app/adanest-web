import konsultasiImg from "./konsultasi.png";
import "./style.css";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <div className="konsultasi-hero">
      <div className="deskripsi">
        <h3>KONSULTASI</h3>
        <h1>Solusi Terbaik untuk Pemulihan Anda</h1>
        <p>Di sini, Anda dapat langsung berkomunikasi dengan para dokter profesional yang ahli di bidangnya, dengan harapan Anda dapat menemukan solusi terbaik untuk perjalanan pemulihan Anda</p>
        <Link to={"/konsultasi/client"}>
          <button className="btn btn-sm btn-filled btn-filled-green">Konsultasi Sekarang</button>
        </Link>
      </div>
      <div className="gambar">
        <img src={konsultasiImg} alt="" />
      </div>
    </div>
  );
}

export default Hero;
