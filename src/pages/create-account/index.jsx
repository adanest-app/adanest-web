import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useFetch } from "use-http";
import Container from "../../components/shared/container";
import createAccooutImg from "./create-account.png";
import "./style.css";

function CreateAccont() {
  const { response, post } = useFetch(`${import.meta.env.VITE_API_URL}users`, {
    interceptors: {
      response: async ({ response }) => {
        if (response.ok) {
          toast.success("Berhasil membuat akun!");
          return response;
        } else if (response.status === 401) {
          toast.error("Ada data yang tidak benar");
        } else {
          toast.error("Terjadi kesalahan");
        }
        return Promise.reject(response);
      },
    },
    cachePolicy: "no-cache",
  });

  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  async function onSubmit(data) {
    const id = toast.loading("Loading...");
    await post(data);
    toast.dismiss(id);
    if (response.ok) navigate("/login");
  }

  useEffect(() => {
    document.title = "Create Account";
    document.body.style.backgroundColor = "var(--green--xs)";
  }, []);

  const [lihatPassword, setLihatPassword] = useState(false);

  const handleLihatPassword = () => {
    setLihatPassword(!lihatPassword);
  };

  return (
    <Container>
      <div id="create-account">
        <div>
          <div className="create-account__header">
            <h3 className="create-account__sub">START FOR FREE</h3>
            <h1 className="create-account__title">Create new account.</h1>
          </div>
          <img src={createAccooutImg} alt="" />
        </div>
        <form className="create-account-form" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <div className="form-control form-control-sm">
              <input type="text" id="first-name" placeholder=" " {...register("firstName", { required: true })} autoComplete="false" />
              <label htmlFor="first-name">First Name</label>
            </div>
            <div className="form-control form-control-sm">
              <input type="text" id="last-name" placeholder=" " {...register("lastName")} autoComplete="false" />
              <label htmlFor="last-name">Last name</label>
            </div>
          </div>
          <div>
            <div className="form-control">
              <input type="text" id="username" placeholder=" " {...register("username", { required: true })} autoComplete="false" />
              <label htmlFor="username">Username</label>
            </div>
          </div>
          <div>
            <div className="form-control">
              <input type="email" id="email" placeholder=" " {...register("email", { required: true })} autoComplete="false" />
              <label htmlFor="email">Email</label>
            </div>
          </div>
          <div>
            <div className="form-control">
              <input type={lihatPassword ? "text" : "password"} id="password" placeholder=" " {...register("password", { required: true })} autoComplete="false" />
              <label htmlFor="password">Password</label>
            </div>
          </div>
          <div className="lihat-password" onClick={handleLihatPassword}>
            <div>{lihatPassword && <span></span>}</div>
            <p>Lihat password</p>
          </div>
          <button className="btn btn-sm btn-filled btn-filled-yellow" type="submit">
            Create Account
          </button>
          <p>
            Sudah memilki akun? <Link to={"/login"}>Masuk</Link>
          </p>
        </form>
      </div>
    </Container>
  );
}

export default CreateAccont;
