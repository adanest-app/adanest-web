import jsCookie from "js-cookie";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useFetch } from "use-http";
import Container from "../../components/shared/container";
import loginImg from "./login.png";
import "./style.css";

function Login() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const { post, response } = useFetch(`${import.meta.env.VITE_API_URL}auth/login`, {
    interceptors: {
      response: async ({ response }) => {
        if (response.ok) {
          toast.success("Berhasil Login");
          return response;
        } else if (response.status === 401) {
          toast.error("Username atau password salah");
        } else {
          toast.error("Terjadi kesalahan");
        }
        return Promise.reject(response);
      },
    },
    cachePolicy: "no-cache",
  });

  async function onSubmit(data) {
    const id = toast.loading("Loading...");
    const res = await post(data);
    toast.dismiss(id);
    if (response.ok) {
      jsCookie.set("access_token", res.access_token, {
        expires: 30,
      });
      jsCookie.set("uid", res.user.id);
      jsCookie.set("username", res.user.username);
      navigate("/dashboard");
    }
  }

  useEffect(() => {
    document.title = "Login";
    document.body.style.backgroundColor = "var(--green--xs)";
  }, []);

  const [lihatPassword, setLihatPassword] = useState(false);

  const handleLihatPassword = () => {
    setLihatPassword(!lihatPassword);
  };

  return (
    <Container>
      <div id="login">
        <div>
          <img className="login-image" src={loginImg} alt="login" />
        </div>
        <form className="login-form" onSubmit={handleSubmit(onSubmit)} autoComplete="off">
          <div className="login-form__header">
            <h1 className="login-form__title">Login</h1>
            <Link to="/create-account">
              <h3 className="login-form__signup">Create Account</h3>
            </Link>
          </div>
          <div className="form-control">
            <input type="text" id="identifier" placeholder=" " autoComplete="false" {...register("identifier", { required: true })} />
            <label htmlFor="identifier">Enter your email or username</label>
          </div>
          <div className="form-control">
            <input type={lihatPassword ? "text" : "password"} id="password" placeholder=" " {...register("password", { required: true })} />
            <label htmlFor="password">Enter your Password</label>
          </div>
          <div className="lihat-password" onClick={handleLihatPassword}>
            <div>{lihatPassword && <span></span>}</div>
            <p>Lihat password</p>
          </div>
          <div className="login-form__footer">
            <button type="submit" className="btn btn-filled btn-sm btn-filled-yellow">
              Login
            </button>
            <Link to="/forgot-password">
              <h3 className="login-form__forgotpassword">Forgot your password?</h3>
            </Link>
          </div>
        </form>
      </div>
    </Container>
  );
}

export default Login;
