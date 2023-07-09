import "./style.css";
import dashboardImg from "./dashboard.png";
import jsCookie from "js-cookie";
import { useFetch } from "use-http";
import { useEffect, useState } from "react";
function Hero() {
  const uid = jsCookie.get("uid");
  const [user, setUser] = useState({});
  const { get, response } = useFetch(`${import.meta.env.VITE_API_URL}users`, {
    headers: {
      Authorization: `Bearer ${jsCookie.get("access_token")}`,
    },
  });
  async function getUser() {
    const data = await get(`/q?id=${uid}`);
    if (response.ok) {
      setUser(data);
      jsCookie.set("me", JSON.stringify(data));
    }
  }

  useEffect(() => {
    getUser();
  }, []);
  return (
    <div className="dashboard-hero">
      <div>
        <img src={dashboardImg} alt="dashboard" />
      </div>
      <div>
        <h2>Selamat Datang, kembali!</h2>
        <h1>{user.fullname}</h1>
        <h3>Temukan Dukungan dan Kesempatan Pemulihan di Halaman Profilmu</h3>
        <p>
          Hii, {user.firstName}! Kami senang melihatmu kembali. Bagaimana
          kabarmu? Semoga harimu selalu cerah dan penuh kebahagiaan di mana pun
          kamu berada.
        </p>
      </div>
    </div>
  );
}

export default Hero;
