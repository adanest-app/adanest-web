import { useRef } from "react";
import useAutosizeTextArea from "../../../hooks/useAutosizeTextArea";
import "./style.css";
import { MdImage } from "react-icons/md";
import { useFetch } from "use-http";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import toastConf from "../../shared/toast/toast.conf";
import { Link } from "react-router-dom";

function FormBuatArtikel({
  judul,
  setJudul,
  content,
  setContent,
  onPublish,
  setCover,
  cover,
}) {
  const ref = useRef(null);
  const { post } = useFetch(
    `${import.meta.env.VITE_API_URL}posts/upload/cover`,
    {
      cachePolicy: "no-cache",
      headers: {
        Authorization: `Bearer ${Cookies.get("access_token")}`,
      },
    }
  );
  const handleUpload = async (ev) => {
    const formData = new FormData();
    formData.append("file", ev.target.files[0]);
    const id = toast.loading("Uploading...");
    post(formData)
      .then((res) => {
        toast.update(id, {
          render: "Upload success",
          type: "success",
          isLoading: false,
          ...toastConf,
        });
        setCover(res);
      })
      .catch(() => {
        toast.update(id, {
          render: "Upload failed",
          type: "error",
          isLoading: false,
          ...toastConf,
        });
      });
  };
  useAutosizeTextArea(ref.current, content);
  return (
    <div id="form-buat-artikel">
      <div>
        <div className="form-control form-control-outline">
          <input
            type="text"
            id="judul-artikel"
            placeholder=" "
            value={judul}
            onChange={(ev) => setJudul(ev.target.value)}
          />
          <label htmlFor="judul-artikel">Judul Artikel</label>
        </div>
        <label className="cover-artikel">
          {cover ? (
            <img src={cover} alt="" />
          ) : (
            <>
              <MdImage size={32} />
              <p>Upload Cover</p>
            </>
          )}
          <input
            hidden
            type="file"
            id="cover-artikel-upload"
            accept="image/*"
            onChange={handleUpload}
          />
        </label>
        <div>
          <button
            className="btn btn-filled btn-filled-green"
            onClick={onPublish}
          >
            Publish
          </button>
        </div>
        <p>
          Berikut tata cara penulisan artikel menggunakan markdown. Untuk lebih
          lengkapnya, silahkan kunjungi{" "}
          <Link
            to="https://www.markdownguide.org/basic-syntax/"
            target="_blank"
          >
            Markdown Guide
          </Link>
        </p>
      </div>
      <div className="form-control form-control-outline">
        <textarea
          id="content"
          placeholder=" "
          value={content}
          ref={ref}
          onChange={(ev) => setContent(ev.currentTarget.value)}
        ></textarea>
        <label htmlFor="content">Konten Artikel</label>
      </div>
    </div>
  );
}

export default FormBuatArtikel;
