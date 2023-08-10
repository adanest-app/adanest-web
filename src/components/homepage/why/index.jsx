import "./style.css";
import bookPng from "./why-book.png";
import businessPng from "./why-business.png";

function Why() {
  return (
    <div id="why">
      <h3>Kenapa memilih kami?</h3>
      <p>Ada beberapa alasan mengapa Anda bisa memilih dan mengandalkan kami, dalam memperbaiki diri menjadi lebih baik</p>
      <div>
        <div>
          <div>
            <img src={bookPng} alt="book" />
          </div>
          <p>
            Misi kami yaitu 1) Dalam setiap konsultasi, kami akan mendengarkan dengan empati, menghormati privasi pengguna, dan memberikan saran yang berdasarkan bukti ilmiah terkini. 2) Kami
            berkomitmen untuk memberikan panduan yang mendalam dan terpercaya untuk menjaga keseimbangan fisik, mental, dan emosional pengguna. 3) Kami akan menyediakan UI/UX yang mudah dan
            menyenangkan untuk pengguna agar nyaman dalam menggunakan pelayanan kami.
          </p>
        </div>
        <div>
          <div>
            <img src={businessPng} alt="business" />
          </div>
          <p>
            Visi kami adalah menjadi Mitra yang terpercaya untuk kesehatan anda dalam menangani masalah PMO (Porn Masturbation Orgasm). Kami berkomitmen untuk memberikan solusi yang efektif dan
            individual sesuai dengan kebutuhan unik Anda. Dalam setiap konsultasi, kami mendengarkan dengan empati, menghormati privasi Anda, dan memberikan saran yang berdasarkan bukti ilmiah
            terkini.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Why;
