import { Link } from "react-router-dom";
import Author from "../author";
import "./style.css";
import { useState, useEffect } from "react";
import { useFetch } from "use-http";

function Terbaru() {
  const [posts, setPosts] = useState([]);
  const { get } = useFetch(`${import.meta.env.VITE_API_URL}posts/search`, {});

  useEffect(() => {
    get("?sort=desc&sortField=createdAt").then((res) => {
      setPosts(res);
    });
  }, []);
  return (
    <div className="artikel-terbaru">
      <h1>
        Artikel <span>Terbaru</span>
      </h1>
      <div className="artikel-group">
        {posts?.map((post) => (
          <Link to={`/artikel/${[post._id]}`} key={post._id}>
            <div className="artikel-card">
              <img src={post.cover} alt="" />
              <div>
                <h3>{post.title}</h3>
                <Author {...post.owner} createdAt={post.createdAt} />
                <p>{post.content.slice(0, 150)}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Terbaru;
