import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useFetch } from "use-http";
import levels from "./levels";
export default function PilihLevel() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [level, setLevel] = useState(0);
  const [started, setStarted] = useState(false);
  const { get, put } = useFetch(`${import.meta.env.VITE_API_URL}challenge`, {
    cachePolicy: "no-cache",
    headers: {
      Authorization: `Bearer ${Cookies.get("access_token")}`,
    },
  });

  useEffect(() => {
    get("isstarted").then((res) => {
      setStarted(res);
    });
  }, []);

  const addToDesc = (e) => {
    const idx = parseInt(e.currentTarget.dataset.index);
    setLevel(idx + 1);
    setTitle(levels[idx].title);
    setDesc(levels[idx].desc);
  };
  const navigate = useNavigate();
  const handleConfirm = () => {
    const date = new Date();
    date.setDate(date.getDate() + 7 * level);
    if (started) return toast("Anda sudah mengambil tantangan");
    if (level < 1) return toast("Pilih level untuk melanjutkan");

    put("start", { endedAt: date }).then(() => {
      navigate("/tantangan");
      window.location.reload();
    });
  };

  return (
    <div className="tantangan-buat">
      <div className="tantangan-buat-header">
        <div className={(started && "active")?.toString()}>Anda sudah memiliki jadwal</div>
        <div className={(!started && "active")?.toString()}>Anda belum memiliki jadwal</div>
      </div>
      <h3 className="tantangan-judul-level">Buat Jadwal</h3>
      <div className="tantangan-levels">
        {levels.map((level, i) => (
          <div className="tantangan-level" key={i} data-index={i} onClick={addToDesc}>
            <div>Level</div>
            <div>{i + 1}</div>
            <div></div>
          </div>
        ))}
      </div>
      <div className="tantangan-level-desc">
        {title ? (
          <>
            <h3>{title}</h3>
            <p>{desc}</p>
          </>
        ) : (
          <p>Pilih level untuk melanjutkan</p>
        )}
      </div>
      <button className="btn-tantangan-konfirmasi" onClick={handleConfirm} disabled={!level}>
        Konfirmasi
      </button>
    </div>
  );
}
