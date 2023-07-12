import Container from "../../components/shared/container";
import Header from "../../components/shared/header";
import { useState, useEffect } from "react";
import jsCookie from "js-cookie";
import useFetch from "use-http";
import SebuahArtikel from "../../components/artikel/sebuah-artikel";
import FormBuatArtikel from "../../components/artikel/form-buat-artikel";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import Footer from "../../components/shared/footer";
import toastConf from "../../components/shared/toast/toast.conf";

function BuatArtikel() {
  const [searchParams] = useSearchParams();
  const me = JSON.parse(jsCookie.get("me"));
  const [judul, setJudul] = useState("");
  const [content, setContent] = useState("");
  const [cover, setCover] = useState("");
  const [pratinjau, setPratinjau] = useState(false);
  const navigate = useNavigate();
  const { post, put, get } = useFetch(`${import.meta.env.VITE_API_URL}posts`, {
    headers: {
      Authorization: `Bearer ${jsCookie.get("access_token")}`,
    },
  });

  useEffect(() => {
    document.title = "Adanest | Buat Artikel";
    if (searchParams.get("id")) {
      get(`p/${searchParams.get("id")}`).then((res) => {
        setJudul(res?.title || "");
        setContent(res?.content || "");
        setCover(res?.cover || "");
      });
    }
  }, []);

  const onPublish = async () => {
    if (judul === "" || content === "" || cover === "") {
      toast.error("Please fill all the fields");
      return;
    }
    const id = toast.loading("Uploading...");
    (searchParams.get("id")
      ? put(`/${searchParams.get("id")}`, {
          title: judul,
          content,
          cover,
        })
      : post({
          title: judul,
          content,
          cover,
          type: "blog",
        })
    )
      .then(() => {
        toast.update(id, {
          render: "Upload success",
          type: "success",
          isLoading: false,
          ...toastConf,
        });

        navigate(searchParams.get("id") ? "/artikel/saya" : "/artikel");
        window.location.reload();
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

  return (
    <>
      <Container>
        <Header.Secondary
          leftAddon={<Header.Brand />}
          rightAddon={
            <>
              <Header.NotificationIcon />
              <Header.UserProfileBtn />
              <button
                onClick={() => {
                  setPratinjau(!pratinjau);
                }}
                className="btn btn-filled btn-filled-yellow btn-sm"
              >
                {pratinjau ? "Edit" : "Pratinjau"}
              </button>
            </>
          }
        />
        {pratinjau ? (
          <SebuahArtikel
            title={judul || "Judul Belum Ada"}
            content={content || "Konten Belum Ada"}
            owner={me}
            createdAt={new Date()}
            cover={cover}
          />
        ) : (
          <FormBuatArtikel
            judul={judul}
            setJudul={setJudul}
            content={content}
            setContent={setContent}
            onPublish={onPublish}
            cover={cover}
            setCover={setCover}
          />
        )}
      </Container>
      <Footer.FooterContainer>
        <Footer.FooterChild />
      </Footer.FooterContainer>
    </>
  );
}

export default BuatArtikel;
