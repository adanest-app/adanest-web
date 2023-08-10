import Modal from "../../shared/modal";
import "./style.css";
import Cookies from "js-cookie";
import { useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { useFetch } from "use-http";

function ModalBuatPost({ isOpen, toggleModal, setPosts }) {
  const [searchParams] = useSearchParams();
  const ref = useRef(null);
  const { get, post } = useFetch(`${import.meta.env.VITE_API_URL}posts`, {
    cachePolicy: "no-cache",
    headers: {
      Authorization: `Bearer ${Cookies.get("access_token")}`,
    },
  });
  const handleKirim = () => {
    if (!ref.current.value) return;
    post({
      title: "Forum",
      cover: "https://picsum.photos/1",
      content: ref.current.value,
      type: "forum",
    }).then(() => {
      toggleModal();
      get(`search?sort=desc&sortField=createdAt&type=forum`).then((res) => {
        if (searchParams.get("id")) setPosts(res.filter((post) => post._id === searchParams.get("id")) || []);
      });
    });
  };
  return (
    <Modal
      isOpen={isOpen}
      toggleModal={toggleModal}
      title={"Buat Postingan"}
      actionBtn={
        <button onClick={handleKirim} className="btn btn-sm btn-filled btn-filled-green">
          Kirim
        </button>
      }>
      <div className="form-buat-post">
        <div className="form-control form-control-outline">
          <textarea placeholder=" " id="input-postingan" ref={ref} />
          <label htmlFor="input-postingan">Tulis Postingan</label>
        </div>
      </div>
    </Modal>
  );
}

export default ModalBuatPost;
