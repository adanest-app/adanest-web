import { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useFetch } from "use-http";
import Container from "../../components/shared/container";
import newPasswordImg from "./new-password.png";
import "./style.css";

function NewPassword() {
  const [searchParams] = useSearchParams();
  const { put, response } = useFetch(`${import.meta.env.VITE_API_URL}auth/reset-password`, {
    cachePolicy: "no-cache",
  });
  const ref = useRef(null);
  const newRef = useRef(null);
  const navigate = useNavigate();
  const handleChangePassword = async () => {
    if (searchParams.get("token") === null) return toast.error("Token tidak ada");
    if (ref.current.value !== newRef.current.value) return toast.error("Password tidak sama");
    if (ref.current.value.length < 8) return toast.error("Password minimal 8 karakter");
    const id = toast.loading("Changing password");
    await put({
      password: ref.current.value,
      token: searchParams.get("token"),
    });
    toast.dismiss(id);
    if (response.ok) {
      toast.info("Password changed");
      navigate("/login");
    } else {
      toast.error("Password not changed");
    }
  };

  useEffect(() => {
    document.title = "New Password";
    document.body.style.backgroundColor = "var(--green--xs)";
  }, []);

  const [lihatPassword, setLihatPassword] = useState(false);

  const handleLihatPassword = () => {
    setLihatPassword(!lihatPassword);
  };

  return (
    <Container>
      <div id="new-password">
        <div className="new-password__form">
          <h1 className="new-password__title">Please enter a new password</h1>
          <div className="form-control">
            <input ref={ref} type={lihatPassword ? "text" : "password"} id="password" placeholder=" " />
            <label htmlFor="password">Password</label>
          </div>
          <div className="form-control">
            <input ref={newRef} type={lihatPassword ? "text" : "password"} id="confirm-password" placeholder=" " />
            <label htmlFor="confirm-password">Confirm Password</label>
          </div>
          <div className="lihat-password" onClick={handleLihatPassword}>
            <div>{lihatPassword && <span></span>}</div>
            <p>Lihat password</p>
          </div>
          <div>
            <button onClick={handleChangePassword} className="btn btn-filled btn-filled-yellow">
              Change Password
            </button>
          </div>
        </div>
        <div>
          <img src={newPasswordImg} alt="new-password" />
        </div>
      </div>
    </Container>
  );
}

export default NewPassword;
