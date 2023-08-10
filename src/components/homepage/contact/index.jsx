import { toast } from "react-toastify";
import "./style.css";

function Contact() {
  const handleSubmit = (event) => {
    event.preventDefault();

    const myForm = event.target;
    const formData = new FormData(myForm);
    toast.loading("Mengirim data...");
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(formData).toString(),
    })
      .then(() => {
        myForm.reset();
        toast.success("Pesan berhasil dikirim");
      })
      .catch(() => toast.error("Gagal mengirim pesan"));
  };
  return (
    <div id="contact">
      <h3>Hubungi kami</h3>
      <p>Jika Anda ada saran dan kritik, Jangan ragu dan malu untuk menghubungi kami</p>
      <form name="contact" method="POST" data-netlify={true} onSubmit={handleSubmit}>
        <input type="hidden" name="form-name" value="contact" />
        <div className="form-control form-control-outline">
          <input type="email" id="contact-email" name="email" placeholder=" " />
          <label htmlFor="contact-email">Email</label>
        </div>
        <div className="form-control form-control-outline">
          <input type="text" id="contact-name" name="name" placeholder=" " />
          <label htmlFor="contact-name">Name</label>
        </div>
        <div className="form-control form-control-outline">
          <textarea id="contact-msg" name="msg" placeholder=" " />
          <label htmlFor="contact-msg">Message</label>
        </div>
        <div>
          <button className="btn btn-filled btn-filled-green">Send</button>
        </div>
      </form>
    </div>
  );
}

export default Contact;
