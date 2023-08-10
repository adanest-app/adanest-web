/* eslint-disable react-refresh/only-export-components */
import Container from "../container";
import facebookImg from "./facebook.png";
import instagramImg from "./instagram.png";
import "./style.css";
import twitterImg from "./twitter.png";

function FooterContainer({ children }) {
  return (
    <div className="bg-footer">
      <Container>{children}</Container>;
    </div>
  );
}

function FooterChild() {
  return (
    <footer>
      <div>
        <div>
          <h1>Adanest</h1>
          <p>Bersama-sama, kita akan membangun fondasi yang kuat untuk kehidupan yang lebih sehat, lebih bahagia, dan bebas dari ketergantungan yang merusak.</p>
        </div>
        <div>
          <h1>Get notified when we launch!</h1>
          <p>Stay up to date with the latest news, announcements, and articles.</p>
          <div>
            <div className="form-control">
              <input type="email" id="email" placeholder=" " />
              <label htmlFor="email">Enter your email</label>
            </div>
            <button type="submit" className="btn btn-filled btn-filled-green">
              Subscribe
            </button>
          </div>
        </div>
      </div>
      <hr />
      <div>
        <p>@Copyright ADANEST. All Rights Reserved</p>
        <div>
          <img src={twitterImg} alt="Twitter" />
          <img src={instagramImg} alt="Instagram" />
          <img src={facebookImg} alt="Facebook" />
        </div>
      </div>
    </footer>
  );
}

export default { FooterChild, FooterContainer };
