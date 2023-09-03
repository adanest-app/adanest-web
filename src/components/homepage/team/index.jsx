import budi from "./budi.jpg";
import irwin from "./irwin.jpeg";
import "./style.css";
import wan from "./wan.jpg";
function Team() {
  return (
    <div id="team">
      <h3>Tim Adanest</h3>
      <p>Dalam mengembangkan website ini kami membuat tim yang terdiri dari 3 orang dan saling membantu satu sama lain untuk mencapai kesuksesan</p>
      <div>
        <div>
          <img src={irwin} alt="robot" />
          <h4>A.Irwin Putra Pangesti</h4>
        </div>
        <div>
          <img src={wan} alt="robot" />
          <h4>Jordi Irawan</h4>
        </div>
        <div>
          <img src={budi} alt="robot" />
          <h4>Budi Aulyansyah Ahmad Trisna</h4>
        </div>
      </div>
    </div>
  );
}

export default Team;
