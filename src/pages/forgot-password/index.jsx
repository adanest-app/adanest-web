import "./style.css";
import Container from "../../components/shared/container";
import forgotPasswordImg from "./forgot-password.png";
import { useEffect, useRef } from "react";
import { toast } from "react-toastify";
import { useFetch } from "use-http";

function forgotPassword() {
  const { post, response } = useFetch(
    `${import.meta.env.VITE_API_URL}auth/forgot-password`,
    {
      cachePolicy: "no-cache",
    }
  );
  const ref = useRef(null);
  const sendEmail = async () => {
    const email = ref.current.value;
    if (!email) return toast.error("Email is required");
    const id = toast.loading("Sending email");
    await post({ email });
    toast.dismiss(id);
    if (response.ok) {
      toast.info("Mohon cek email anda");
    } else {
      toast.error("Terjadi kesalahan");
    }
  };
  useEffect(() => {
    document.title = "Forgot Password";
    document.body.style.backgroundColor = "var(--green--xs)";
  }, []);
  return (
    <Container>
      <div id="forgot-password">
        <div className="forgot-password__form">
          <h1 className="forgot-password__title">Forgot Password</h1>
          <p className="forgot-password__desc">Enter the email address</p>
          <div className="form-control">
            <input ref={ref} id="email" type="email" placeholder=" " />
            <label htmlFor="email">Enter Email Address</label>
          </div>
          <div>
            <button
              onClick={sendEmail}
              className="btn btn-filled btn-filled-gray"
            >
              Send Email
            </button>
          </div>
        </div>
        <div>
          <img src={forgotPasswordImg} alt="forgot-password" />
        </div>
      </div>
    </Container>
  );
}

export default forgotPassword;
