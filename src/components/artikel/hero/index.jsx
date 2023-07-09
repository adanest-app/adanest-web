import "./style.css";
import heroImg from "./hero.png";
import { Link } from "react-router-dom";
import { useFetch } from "use-http";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
function Hero() {
  const [text, setText] = useState();
  const [value] = useDebounce(text, 300);
  const [posts, setPosts] = useState([]);
  const { get } = useFetch(`${import.meta.env.VITE_API_URL}posts/search`, {
    headers: {
      Authorization: `Bearer ${Cookies.get("access_token")}`,
    },
  });

  useEffect(() => {
    if (value) {
      get(`?q=${value}`).then((res) => {
        setPosts(res);
      });
    }
  }, [value]);

  async function searchArtikel(ev) {
    setText(ev.target.value);
  }
  return (
    <div className="artikel-hero">
      <div>
        <h2>Temukan Inspirasimu disini!</h2>
        <h1>Cerita, Tips, dan Motivasi</h1>
        <div className="h1-line-step">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <p className="english-quote">
          “The more you read, the more things you know. The more things you
          learn, the more places you visit.”
        </p>
        <p className="indonesia-quote">
          “Semakin banyak yang kamu baca, lebih banyak hal yang kamu ketahui.
          lebih banyak hal yang kamu pelajari semakin banyak tempat yang kamu
          kunjungi.”
        </p>
        <div>
          <Link to={"/artikel/saya"}>
            <button className="btn btn-filled btn-filled-green">
              Artikel Saya
            </button>
          </Link>
          <div className="form-control form-control-outline">
            <input
              id="artikel-search"
              type="search"
              placeholder=" "
              onChange={searchArtikel}
            />
            <label htmlFor="artikel-search">Cari Artikel</label>
            <div className="search-artikel-result">
              {posts.map((post) => (
                <Link to={`/artikel/${post._id}`} key={post._id}>
                  <div className="search-artikel-item">
                    <img src={post.cover} alt="" width={40} height={40} />
                    <h4>{post.title}</h4>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div>
        <img src={heroImg} alt="" />
      </div>
    </div>
  );
}

export default Hero;
