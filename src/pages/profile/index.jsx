import Container from "../../components/shared/container";
import Footer from "../../components/shared/footer";
import Header from "../../components/shared/header";
import ProfileModal from "../../components/profile/modal";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import ProfileSettings from "../../components/profile/settings";
import { useFetch } from "use-http";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

function Profile() {
  const [me, setMe] = useState(JSON.parse(Cookies.get("me")));
  const [isOpen, setIsOpen] = useState(false);
  const [editFor, setEditFor] = useState("profile__public");
  const { register, handleSubmit, reset } = useForm();
  const { put, response, get } = useFetch(
    `${import.meta.env.VITE_API_URL}users`,
    {
      cachePolicy: "no-cache",
      headers: {
        Authorization: `Bearer ${Cookies.get("access_token")}`,
      },
    }
  );
  const toggleModal = (ev) => {
    reset();
    setIsOpen(!isOpen);
    setEditFor(ev.target.dataset.for);
  };

  const onSubmit = async (data) => {
    data = Object.fromEntries(Object.entries(data).filter(([, v]) => v !== ""));
    await put(data);
    if (response.ok) {
      const me = await get(`/q?id=${Cookies.get("uid")}`);
      if (response.ok) {
        Cookies.set("username", me.username);
        Cookies.set("me", JSON.stringify(me));
        setMe(me);
      }
      toast.success("Berhasil mengubah data");
      setIsOpen(false);
    } else {
      toast.error("Gagal mengubah data");
    }
  };
  useEffect(() => {
    document.title = "Adanest | Profile";
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
        <ProfileSettings me={me} toggleModal={toggleModal} />
        <ProfileModal
          editFor={editFor}
          isOpen={isOpen}
          onSubmit={onSubmit}
          toggleModal={toggleModal}
          handleSubmit={handleSubmit}
          register={register}
        />
      </Container>
      <Footer.FooterContainer>
        <Footer.FooterChild />
      </Footer.FooterContainer>
    </>
  );
}

export default Profile;
