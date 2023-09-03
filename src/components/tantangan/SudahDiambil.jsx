import Cookies from "js-cookie";
import { Circle, Line } from "rc-progress";
import { useEffect, useState } from "react";
import { useFetch } from "use-http";
import levels from "./levels";

export default function SudahDiambil() {
  const [tantangan, setTantangan] = useState({});
  const [minutes, setMinutes] = useState(0);
  const [hours, setHours] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [days, setDays] = useState(0);
  const [week, setWeek] = useState(0);
  const [percent, setPercent] = useState(0);
  const { get, put } = useFetch(`${import.meta.env.VITE_API_URL}challenge`, {
    cachePolicy: "no-cache",
    headers: {
      Authorization: `Bearer ${Cookies.get("access_token")}`,
    },
  });

  useEffect(() => {
    get("?started=true").then((res) => {
      res && setTantangan(res?.[0]);
    });
  }, []);
  useEffect(() => {
    const id = setInterval(() => {
      const now = new Date();
      now.setTime(now.getTime() + now.getTimezoneOffset() * 60 * 1000 + 10 * 60 * 60 * 1000);
      const diff = Math.round((new Date(tantangan?.endedAt) - now) / 1000);
      if (diff < 0) {
        put("stop").then(() => {
          window.location.reload();
        });
        return clearInterval(id);
      }
      setSeconds(parseInt(diff % 60));
      setMinutes(parseInt((diff / 60) % 60));
      setHours(parseInt((diff / (60 * 60)) % 24));
      setDays(parseInt(diff / (60 * 60 * 24)));
      setWeek(parseInt(diff / (60 * 60 * 24 * 7)));
      const totalTime = +new Date(tantangan?.endedAt) - +new Date(tantangan?.startedAt);
      const timeLeft = Math.round(new Date(tantangan?.endedAt) - now);
      const percent = Math.round((timeLeft / totalTime) * 100);
      setPercent(percent);
    }, 1000);

    return () => clearInterval(id);
  }, [tantangan]);

  return (
    <div className="tantangan-diambil">
      <div className="tantangan-diambil-header">
        <p>“If you make a promise, you will feel bad if you do not keep it”</p>
        <span>Level {week + 1}</span>
        <hr />
      </div>
      <div className="tantangan-diambil-body">
        <div className="tantangan-diambil-body-clock">
          <Circle className="circle-progress" percent={100 - percent} strokeWidth={8} strokeColor="#121927" trailWidth={8} trailColor={"#F5F9FF"} />
          <div className="center-digital-clock">
            <div>
              <span>DAY</span>
              <span>{days}</span>
            </div>
            <div>
              <span>
                {hours.toString().length < 2 && 0}
                {hours}
              </span>
              <span>:</span>
              <span>
                {minutes.toString().length < 2 && 0}
                {minutes}
              </span>
            </div>
            <div>
              <span>
                {seconds.toString().length < 2 && 0}
                {seconds}
              </span>
            </div>
          </div>
        </div>
        <div className="tantangan-diambil-body-desc">
          <div>“{levels[week].days_desc[6 - (days % 7)]}”</div>
          <div>
            <Line percent={100 - percent} strokeWidth={8} strokeColor="#121927" trailWidth={8} trailColor={"#F5F9FF"} />
          </div>
          <div>
            <span>{days}</span>
            <span>Hari Tersisa</span>
          </div>
          <div>
            <span>{week}</span>
            <span>Minggu Tersisa</span>
          </div>
        </div>
      </div>
    </div>
  );
}
