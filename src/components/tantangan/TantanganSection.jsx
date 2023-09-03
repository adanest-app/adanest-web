import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import "react-calendar";
import Calendar from "react-calendar";
import { AiFillDislike } from "react-icons/ai";
import { FaCrown } from "react-icons/fa";
import { GiProgression } from "react-icons/gi";
import { LuCalendarClock } from "react-icons/lu";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useFetch } from "use-http";
import Modal from "../shared/modal";
import BelumDiambil from "./BelumDiambil";
import PilihLevel from "./PilihLevel";
import SudahDiambil from "./SudahDiambil";

function TantanganSection() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchParams] = useSearchParams();
  const [started, setStarted] = useState(false);
  const [won, setWon] = useState(0);
  const [lost, setLost] = useState(0);
  const [stat, setStat] = useState([]);
  const navigate = useNavigate();
  const { get, put } = useFetch(`${import.meta.env.VITE_API_URL}challenge`, {
    cachePolicy: "no-cache",
    headers: {
      Authorization: `Bearer ${Cookies.get("access_token")}`,
    },
  });

  useEffect(() => {
    get("isstarted").then((res) => {
      setStarted(res);
      get("?started=false").then((res) => {
        let won = 0;
        let lost = 0;
        const data = [];

        res.forEach((item) => {
          if (item.won) {
            won++;
          } else {
            lost++;
          }
          if (new Date(item.relapseAt) < new Date(item.startedAt)) {
            let startedAt = new Date(item.startedAt);
            let endedAt = new Date(item.endedAt);
            while (startedAt <= endedAt) {
              data.push({ date: startedAt.toISOString(), won: true, lost: false });
              startedAt.setDate(startedAt.getDate() + 1);
            }
          }

          if (item.relapseAt) {
            let startedAt = new Date(item.startedAt);
            let relapseAt = new Date(item.relapseAt);
            while (startedAt <= relapseAt) {
              data.push({ date: startedAt.toISOString(), won: false, lost: true });
              startedAt.setDate(startedAt.getDate() + 1);
            }
          }

          setStat(data);
          setLost(lost);
          setWon(won);
        });
      });
    });
  }, []);

  const tileClassName = ({ date, view }) => {
    if (stat && view === "month" && stat.length > 0) {
      const found = stat.find((item) => {
        const itemDate = new Date(item.date);
        return itemDate.getDate() == date.getDate() && itemDate.getMonth() == date.getMonth() && itemDate.getFullYear() == date.getFullYear();
      });
      if (found) {
        if (found.won) {
          return "won";
        } else if (found.lost) {
          return "lost";
        }
      }
    }
  };

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const handleRelapse = () => {
    put("stop").then(() => {
      window.location.reload();
    });
  };

  return (
    <div className="tantangan-section">
      <div className="tantangan-left-action">
        <div className="tantangan-win">
          <div>
            <FaCrown size={32} />
            <span>{won}</span>
          </div>
        </div>
        <div className="tantangan-lost">
          <div>
            <AiFillDislike size={32} />
            <span>{lost}</span>
          </div>
        </div>
        <Link to={"?action=progress"}>
          <button className={`btn-progress-tantangan ${searchParams.get("action") === "progress" && "active"}`}>
            <GiProgression size={28} />
            Progress
          </button>
        </Link>
        <Link to={"?action=create"}>
          <button className={`btn-buat-tantangan ${searchParams.get("action") === "create" && "active"}`}>
            <LuCalendarClock size={28} />
            Buat Tantangan
          </button>
        </Link>
        <button className="btn-relapse" disabled={!started} onClick={toggleModal}>
          Relapse
        </button>
        <button className={`btn-tantangan-kembali ${searchParams.get("action") ? "" : "hidden"}`} onClick={() => navigate("/tantangan")}>
          Kembali
        </button>
      </div>
      <div className="tantangan-right-result">
        {!started && !searchParams.get("action") && <BelumDiambil />}
        {searchParams.get("action") === "create" && <PilihLevel />}
        {searchParams.get("action") === "progress" && <Calendar tileClassName={tileClassName} />}
        {started && !searchParams.get("action") && <SudahDiambil />}
      </div>
      <Modal
        title={"Relapse"}
        isOpen={isOpen}
        actionBtn={
          <button className="btn btn-filled btn-filled-green" onClick={handleRelapse}>
            Y
          </button>
        }
        toggleModal={toggleModal}>
        <p>Hari-hari yang telah Anda lalui akan berakhir dan diulang dari awal. Apakah Anda yakin? </p>
      </Modal>
    </div>
  );
}

export default TantanganSection;
