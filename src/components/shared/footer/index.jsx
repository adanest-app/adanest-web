/* eslint-disable react/no-unknown-property */
/* eslint-disable react-refresh/only-export-components */
import { toast } from "react-toastify";
import Container from "../container";
import "./style.css";

function FooterContainer({ children }) {
  return (
    <div className="bg-footer">
      <Container>{children}</Container>;
    </div>
  );
}

function FooterChild() {
  const handleSubmit = (event) => {
    event.preventDefault();

    const myForm = event.target;
    const formData = new FormData(myForm);
    const id = toast.loading("Mengirim data...");
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(formData).toString(),
    })
      .then(() => {
        myForm.reset();
        toast.success("Email berhasil disimpan");
      })
      .catch(() => toast.error("Gagal menyimpan Email"))
      .finally(() => toast.dismiss(id));
  };
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
          <form name="subscribe" method="POST" data-netlify={true} onSubmit={handleSubmit}>
            <input type="hidden" name="form-name" value="subscribe" />
            <div className="form-control">
              <input type="email" id="email-subscribe" name="email" placeholder=" " />
              <label htmlFor="email">Enter your email</label>
            </div>
            <button className="btn btn-filled btn-filled-green">Subscribe</button>
          </form>
        </div>
      </div>
      <hr />
      <div>
        <p>@Copyright ADANEST. All Rights Reserved</p>
        {/* <div>
          <img src={twitterImg} alt="Twitter" />
          <img src={instagramImg} alt="Instagram" />
          <img src={facebookImg} alt="Facebook" />
        </div> */}
      </div>
    </footer>
  );
}

export default { FooterChild, FooterContainer };
