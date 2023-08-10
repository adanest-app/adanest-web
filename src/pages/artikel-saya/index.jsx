import Container from "../../components/shared/container";
import Footer from "../../components/shared/footer";
import Header from "../../components/shared/header";
import Modal from "../../components/shared/modal";
import toastConf from "../../components/shared/toast/toast.conf";
import "./style.css";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useFetch } from "use-http";

function ArtikelSaya() {
  const me = JSON.parse(Cookies.get("me"));
  const [posts, setPosts] = useState([]);
  const { get, del } = useFetch(`${import.meta.env.VITE_API_URL}posts`, {
    cachePolicy: "no-cache",
    headers: {
      Authorization: `Bearer ${Cookies.get("access_token")}`,
    },
  });
  const [isOpen, setIsOpen] = useState(false);

  const handleDelete = () => {
    const id = toast.loading("Deleting...");
    del(isOpen)
      .then(() => {
        toast.update(id, {
          render: "Delete success",
          type: "success",
          isLoading: false,
          ...toastConf,
        });
        get(`search?sort=desc&sortField=createdAt&owner=${me.id}`)
          .then((res) => {
            setPosts(res || []);
          })
          .finally(() => setIsOpen(false));
      })
      .catch(() => {
        toast.update(id, {
          render: "Delete failed",
          type: "error",
          isLoading: false,
          ...toastConf,
        });
      });
  };

  const handleOpenModal = (ev) => {
    setIsOpen(ev?.target?.dataset?.postId);
  };

  useEffect(() => {
    document.title = "Adanest | @" + me.username;
    get(`search?sort=desc&sortField=createdAt&owner=${me.id}`).then((res) => {
      setPosts(res || []);
    });
  }, []);

  return (
    <>
      <Container>
        <Header.Secondary
          leftAddon={<Header.Brand />}
          rightAddon={
            <>
              <Header.NotificationIcon />
              <Header.UserProfileBtn />
            </>
          }
        />
        <div className="artikel-saya">
          {posts.map((post) => (
            <div className="artikel-item" key={post._id}>
              <div className="artikel-item__image">
                <img src={post.cover} alt="" />
              </div>
              <div className="artikel-item__content">
                <div className="artikel-item__content__title">
                  <Link to={`/artikel/${post._id}`}>{post.title}</Link>
                </div>
                <div className="artikel-item__content__desc">{post.content.slice(0, 200)}</div>
              </div>
              <div className="artikel-item__content__action">
                <Link to={`/buat-artikel?id=${post._id}`}>
                  <button className="btn btn-sm btn-filled btn-filled-yellow">Edit</button>
                </Link>
                <button onClick={handleOpenModal} data-post-id={post._id} className="btn btn-sm btn-filled btn-filled-red">
                  Hapus
                </button>
              </div>
            </div>
          ))}
        </div>
      </Container>
      <Footer.FooterContainer>
        <Footer.FooterChild />
      </Footer.FooterContainer>
      <Modal
        title={"Konfirmasi Hapus Artikel?"}
        isOpen={isOpen}
        toggleModal={handleOpenModal}
        actionBtn={
          <button className="btn btn-sm btn-filled btn-filled-red" onClick={handleDelete}>
            Hapus
          </button>
        }></Modal>
    </>
  );
}

export default ArtikelSaya;
