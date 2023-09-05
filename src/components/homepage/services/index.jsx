import chatbotImg from "./chatbot.png";
import educationImg from "./education.png";
import gameImg from "./game.png";
import konsultanImg from "./konsultan.png";
import progressImg from "./progress.png";
import "./style.css";

function Services() {
  return (
    <div id="services">
      <h3>Layanan</h3>
      <p>Kami menyediakan beberapa layanan yang dapat Anda akses kapanpun dan dimanapun ketika Anda membutuhkannya</p>
      <div>
        <div>
          <div>
            <img src={konsultanImg} alt="Konsultan" />
          </div>
          <h4>Konsultan</h4>
          <p>Kami menyediakan kepada anda layanan untuk dapat menghubungi dokter secara online dan dapat mengatur jadwal pertemuan</p>
        </div>
        <div>
          <div>
            <img src={chatbotImg} alt="Chat" />
          </div>
          <h4>Chat Bot</h4>
          <p>Anda dapat mencari informasi terkait PMO dan dampak negatifnya</p>
        </div>
        <div>
          <div>
            <img src={gameImg} alt="Game" />
          </div>
          <h4>Game</h4>
          <p>Menyediakan permainan dan tugas harian agar Anda tidak jenuh</p>
        </div>
        <div>
          <div>
            <img src={educationImg} alt="Education" />
          </div>
          <h4>Education</h4>
          <p>Kami akan menyediakan vidio edukasi dan artikel sebagai bahan pembelajaran</p>
        </div>
        <div>
          <div>
            <img src={progressImg} alt="Progress" />
          </div>
          <h4>Progress</h4>
          <p>Sejauh apa progresmu selama ini ayo kita lihat</p>
        </div>
      </div>
    </div>
  );
}

export default Services;
