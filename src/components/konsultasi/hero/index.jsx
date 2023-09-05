import konsultasiImg from "./konsultasi.png";
import "./style.css";

function Hero() {
  return (
    <div className="konsultasi-hero">
      <div className="deskripsi">
        <h3>KONSULTASI</h3>
        <h1>Solusi Terbaik untuk Pemulihan Anda</h1>
        <p>Di sini, Anda dapat langsung berkomunikasi dengan para konsultan profesional yang ahli di bidangnya, dengan harapan Anda dapat menemukan solusi terbaik untuk perjalanan pemulihan Anda</p>
        <p>#AmanDanRahasia</p>
        <a href="#pilih-konsultan">
          <button className="btn btn-sm btn-filled btn-filled-green">Konsultasi Sekarang</button>
        </a>
      </div>
      <div className="gambar">
        <img src={konsultasiImg} alt="" />
      </div>
    </div>
  );
}

export default Hero;
