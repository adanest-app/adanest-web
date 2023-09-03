import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useFetch } from "use-http";
import "./style.css";

export default function PilihKonsultan() {
  const [konsultan, setKonsultan] = useState([]);
  const { get } = useFetch(`${import.meta.env.VITE_API_URL}users?role=admin`, {
    cachePolicy: "no-cache",
    headers: {
      Authorization: `Bearer ${Cookies.get("access_token")}`,
    },
  });

  useEffect(() => {
    get().then((res) => {
      setKonsultan(res || []);
    });
  }, []);

  return (
    <div className="pilih-konsultan-section" id="pilih-konsultan">
      <h3>Rekomendasi</h3>
      <p>Berikut adalah beberapa rekomendasi konsultan dari kami, kami harap anda dapat mendapatkan solusi atas keluhan anda selama ini</p>
      <div className="pilih-konsultan">
        {konsultan.map((konsultan) => (
          <div className="konsultan-card" key={konsultan._id}>
            <div className="konsultan-card-left">
              <img src={konsultan.avatar} alt="" />
            </div>
            <div className="konsultan-card-right">
              <h3>
                {konsultan.firstName} {konsultan.lastName}
              </h3>
              <p>{konsultan.bio}</p>
              <Link to={`/konsultasi/${konsultan._id}`}>
                <button>Konsultasi Gratis</button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
